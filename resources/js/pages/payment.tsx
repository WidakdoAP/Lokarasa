import { router } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OrderItem {
    id: number;
    product_id: number;
    product_name: string;
    price: string;
    quantity: number;
    subtotal: string;
}

interface Order {
    id: number;
    order_number: string;
    total: string;
    payment_status: string;
    items: OrderItem[];
}

interface Props {
    order: Order;
    midtransClientKey: string;
}

declare global {
    interface Window {
        snap: {
            pay: (
                token: string,
                options?: {
                    onSuccess?: (result: unknown) => void;
                    onPending?: (result: unknown) => void;
                    onError?: (result: unknown) => void;
                    onClose?: () => void;
                }
            ) => void;
        };
    }
}

export default function Payment({
    order,
    midtransClientKey,
}: Props) {
    const [loading, setLoading] = useState(true);
    const [paying, setPaying] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const script = document.createElement("script");

        script.src =
            import.meta.env.VITE_MIDTRANS_IS_PRODUCTION === "true"
                ? "https://app.midtrans.com/snap/snap.js"
                : "https://app.sandbox.midtrans.com/snap/snap.js";

        script.setAttribute(
            "data-client-key",
            midtransClientKey
        );

        script.async = true;

        script.onload = () => {
            setLoading(false);
        };

        script.onerror = () => {
            setError(
                "Failed to load Midtrans payment system."
            );

            setLoading(false);
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [midtransClientKey]);

    const openPayment = async () => {
        try {
            setPaying(true);
            setError(null);

            const response = await axios.post(
                `/checkout/${order.id}/payment`
            );

            const snapToken =
                response.data.snap_token;

            window.snap.pay(snapToken, {
                onSuccess: () => {
                    router.visit(
                        `/orders/${order.id}`
                    );
                },

                onPending: () => {
                    router.visit(
                        `/orders/${order.id}`
                    );
                },

                onError: () => {
                    setError(
                        "Payment failed. Please try again."
                    );

                    setPaying(false);
                },

                onClose: () => {
                    setPaying(false);
                },
            });
        } catch (error) {
            console.error(error);

            setError(
                "Unable to create payment."
            );

            setPaying(false);
        }
    };

    return (
        <div className="container mx-auto max-w-3xl px-4 py-10">
            <Card>
                <CardHeader>
                    <CardTitle>
                        Complete Your Payment
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Order number
                        </p>

                        <p className="font-semibold">
                            {order.order_number}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Total
                        </p>

                        <p className="text-2xl font-bold">
                            Rp{" "}
                            {Number(
                                order.total
                            ).toLocaleString("id-ID")}
                        </p>
                    </div>

                    <div className="space-y-2">
                        {order.items.map((item) => (
                            <div
                                key={item.id}
                                className="flex justify-between"
                            >
                                <span>
                                    {item.product_name} ×{" "}
                                    {item.quantity}
                                </span>

                                <span>
                                    Rp{" "}
                                    {Number(
                                        item.subtotal
                                    ).toLocaleString(
                                        "id-ID"
                                    )}
                                </span>
                            </div>
                        ))}
                    </div>

                    {error && (
                        <div className="rounded-lg border p-4 text-sm">
                            {error}
                        </div>
                    )}

                    {loading ? (
                        <p>
                            Loading payment system...
                        </p>
                    ) : (
                        <Button
                            className="w-full"
                            size="lg"
                            disabled={paying}
                            onClick={openPayment}
                        >
                            {paying
                                ? "Opening payment..."
                                : "Pay Now"}
                        </Button>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}