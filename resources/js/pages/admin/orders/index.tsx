import { Link } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface User {
    id: number;
    name: string;
    email: string;
}

interface Order {
    id: number;
    order_number: string;
    customer_name: string;
    customer_phone: string;
    total: string;
    status: string;
    payment_status: string;
    fulfillment_method: string;
    created_at: string;
    user: User;
}

interface Props {
    orders: {
        data: Order[];
    };

    filters: {
        payment_status: string;
    };
}

export default function OrdersIndex({
    orders,
}: Props) {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <h1 className="text-3xl font-bold">
                    Orders
                </h1>

                <p className="text-muted-foreground">
                    View customer orders and payment status.
                </p>
            </div>

            <div className="space-y-4">
                {orders.data.map((order) => (
                    <Link
                        key={order.id}
                        href={`/admin/orders/${order.id}`}
                        className="block"
                    >
                        <Card className="transition hover:shadow-md">
                            <CardHeader>
                                <div className="flex justify-between">
                                    <CardTitle>
                                        {order.order_number}
                                    </CardTitle>

                                    <span>
                                        {order.payment_status}
                                    </span>
                                </div>
                            </CardHeader>

                            <CardContent>
                                <div className="grid gap-2 md:grid-cols-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Customer
                                        </p>

                                        <p>
                                            {order.customer_name}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Phone
                                        </p>

                                        <p>
                                            {order.customer_phone}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Fulfillment
                                        </p>

                                        <p>
                                            {order.fulfillment_method}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Total
                                        </p>

                                        <p className="font-bold">
                                            Rp{" "}
                                            {Number(
                                                order.total
                                            ).toLocaleString(
                                                "id-ID"
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}