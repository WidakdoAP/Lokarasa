<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MidtransController extends Controller
{
    public function notification(
        Request $request
    ): JsonResponse {
        $notification = $request->all();

        $orderId =
            $notification['order_id'] ?? null;

        $statusCode =
            $notification['status_code'] ?? null;

        $grossAmount =
            $notification['gross_amount'] ?? null;

        $signatureKey =
            $notification['signature_key'] ?? null;

        $transactionStatus =
            $notification['transaction_status'] ?? null;

        $fraudStatus =
            $notification['fraud_status'] ?? null;

        if (
            !$orderId ||
            !$statusCode ||
            !$grossAmount ||
            !$signatureKey
        ) {
            return response()->json([
                'message' => 'Invalid notification.',
            ], 400);
        }

        /*
         * Verify Midtrans signature.
         *
         * SHA512(
         *     order_id +
         *     status_code +
         *     gross_amount +
         *     server_key
         * )
         */
        $expectedSignature = hash(
            'sha512',
            $orderId .
            $statusCode .
            $grossAmount .
            config('midtrans.server_key')
        );

        if (
            !hash_equals(
                $expectedSignature,
                $signatureKey
            )
        ) {
            Log::warning(
                'Invalid Midtrans signature.',
                $notification
            );

            return response()->json([
                'message' => 'Invalid signature.',
            ], 403);
        }

        $order = Order::query()
            ->where(
                'order_number',
                $orderId
            )
            ->first();

        if (!$order) {
            Log::warning(
                'Midtrans order not found.',
                [
                    'order_id' => $orderId,
                ]
            );

            return response()->json([
                'message' => 'Order not found.',
            ], 404);
        }

        /*
         * Make sure the amount reported by Midtrans
         * matches our order.
         */
        if (
            (float) $grossAmount !==
            (float) $order->total
        ) {
            Log::warning(
                'Midtrans amount mismatch.',
                [
                    'order_id' => $orderId,
                    'midtrans_amount' => $grossAmount,
                    'order_total' => $order->total,
                ]
            );

            return response()->json([
                'message' => 'Amount mismatch.',
            ], 422);
        }

        /*
         * Successful payment.
         */
        if (
            $transactionStatus === 'settlement' ||
            (
                $transactionStatus === 'capture' &&
                $fraudStatus === 'accept'
            )
        ) {
            $order->update([
                'payment_status' => 'paid',
                'status' => 'processing',
            ]);

            return response()->json([
                'message' => 'Payment successful.',
            ]);
        }

        /*
         * Payment is still waiting.
         */
        if ($transactionStatus === 'pending') {
            $order->update([
                'payment_status' => 'pending',
            ]);

            return response()->json([
                'message' => 'Payment pending.',
            ]);
        }

        /*
         * Payment expired.
         */
        if ($transactionStatus === 'expire') {
            $order->update([
                'payment_status' => 'expired',
                'status' => 'cancelled',
            ]);

            return response()->json([
                'message' => 'Payment expired.',
            ]);
        }

        /*
         * Payment was denied/cancelled.
         */
        if (
            $transactionStatus === 'deny' ||
            $transactionStatus === 'cancel'
        ) {
            $order->update([
                'payment_status' => 'failed',
                'status' => 'cancelled',
            ]);

            return response()->json([
                'message' => 'Payment failed.',
            ]);
        }

        return response()->json([
            'message' => 'Notification received.',
        ]);
    }
}