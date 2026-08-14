import { router } from "@inertiajs/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProductImage {
    id: number;
    image: string;
}

interface Product {
    id: number;
    name: string;
    price: string;
    images: ProductImage[];
}

interface CartItem {
    id: number;
    quantity: number;
    product: Product;
}

interface Props {
    cartItems: CartItem[];
    subtotal: number;
}

export default function Checkout({
    cartItems,
    subtotal,
}: Props) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const [fulfillment, setFulfillment] =
        useState<"pickup" | "self_delivery">("pickup");

    const [processing, setProcessing] = useState(false);

    const createOrder = () => {
        setProcessing(true);

        router.post(
            "/checkout",
            {
                customer_name: name,
                customer_phone: phone,
                fulfillment_method: fulfillment,
            },
            {
                onFinish: () => {
                    setProcessing(false);
                },
            }
        );
    };

    return (
        <div className="container mx-auto max-w-6xl px-4 py-8">
            <h1 className="mb-8 text-3xl font-bold">
                Checkout
            </h1>

            <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
                <div className="space-y-6">

                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Contact Information
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <div>
                                <Label>
                                    Name
                                </Label>

                                <Input
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                    placeholder="Your name"
                                />
                            </div>

                            <div>
                                <Label>
                                    Phone
                                </Label>

                                <Input
                                    value={phone}
                                    onChange={(e) =>
                                        setPhone(e.target.value)
                                    }
                                    placeholder="08xxxxxxxxxx"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Fulfillment
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <label className="flex cursor-pointer gap-3 rounded-lg border p-4">
                                <input
                                    type="radio"
                                    name="fulfillment"
                                    checked={
                                        fulfillment === "pickup"
                                    }
                                    onChange={() =>
                                        setFulfillment("pickup")
                                    }
                                />

                                <div>
                                    <p className="font-medium">
                                        Pick up myself
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        I will come and collect my order.
                                    </p>
                                </div>
                            </label>

                            <label className="flex cursor-pointer gap-3 rounded-lg border p-4">
                                <input
                                    type="radio"
                                    name="fulfillment"
                                    checked={
                                        fulfillment === "self_delivery"
                                    }
                                    onChange={() =>
                                        setFulfillment(
                                            "self_delivery"
                                        )
                                    }
                                />

                                <div>
                                    <p className="font-medium">
                                        Arrange delivery myself
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        I will arrange my own courier.
                                    </p>
                                </div>
                            </label>
                        </CardContent>
                    </Card>

                </div>

                <Card className="h-fit">
                    <CardHeader>
                        <CardTitle>
                            Order Summary
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex justify-between gap-4"
                            >
                                <div>
                                    <p className="font-medium">
                                        {item.product.name}
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        × {item.quantity}
                                    </p>
                                </div>

                                <span>
                                    Rp{" "}
                                    {(
                                        Number(
                                            item.product.price
                                        ) *
                                        item.quantity
                                    ).toLocaleString("id-ID")}
                                </span>
                            </div>
                        ))}

                        <div className="border-t pt-4">
                            <div className="flex justify-between text-lg font-bold">
                                <span>
                                    Total
                                </span>

                                <span>
                                    Rp{" "}
                                    {Number(
                                        subtotal
                                    ).toLocaleString("id-ID")}
                                </span>
                            </div>
                        </div>

                        <Button
                            className="w-full"
                            size="lg"
                            disabled={processing}
                            onClick={createOrder}
                        >
                            {processing
                                ? "Processing..."
                                : "Continue to Payment"}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}