import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface OrderItem {
    id: number;
    product_name: string;
    price: string;
    quantity: number;
    subtotal: string;
}

interface User {
    name: string;
    email: string;
}

interface Order {
    id: number;
    order_number: string;
    customer_name: string;
    customer_phone: string;
    fulfillment_method: string;
    subtotal: string;
    total: string;
    status: string;
    payment_status: string;
    created_at: string;
    user: User;
    items: OrderItem[];
}

interface Props {
    order: Order;
}

export default function OrderShow({
    order,
}: Props) {
    return (
        <div className="container mx-auto max-w-5xl px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    {order.order_number}
                </h1>

                <p className="text-muted-foreground">
                    {order.created_at}
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">

                <Card>
                    <CardHeader>
                        <CardTitle>
                            Customer
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-2">
                        <p>
                            <strong>Name:</strong>{" "}
                            {order.customer_name}
                        </p>

                        <p>
                            <strong>Phone:</strong>{" "}
                            {order.customer_phone}
                        </p>

                        <p>
                            <strong>Email:</strong>{" "}
                            {order.user.email}
                        </p>

                        <p>
                            <strong>Fulfillment:</strong>{" "}
                            {order.fulfillment_method}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>
                            Payment
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-2">
                        <p>
                            <strong>Payment:</strong>{" "}
                            {order.payment_status}
                        </p>

                        <p>
                            <strong>Order:</strong>{" "}
                            {order.status}
                        </p>

                        <p>
                            <strong>Total:</strong>{" "}
                            Rp{" "}
                            {Number(
                                order.total
                            ).toLocaleString("id-ID")}
                        </p>
                    </CardContent>
                </Card>

            </div>

            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>
                        Items
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="space-y-4">
                        {order.items.map((item) => (
                            <div
                                key={item.id}
                                className="flex justify-between border-b pb-4"
                            >
                                <div>
                                    <p className="font-medium">
                                        {item.product_name}
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        Rp{" "}
                                        {Number(
                                            item.price
                                        ).toLocaleString(
                                            "id-ID"
                                        )}{" "}
                                        ×{" "}
                                        {item.quantity}
                                    </p>
                                </div>

                                <p className="font-medium">
                                    Rp{" "}
                                    {Number(
                                        item.subtotal
                                    ).toLocaleString(
                                        "id-ID"
                                    )}
                                </p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}