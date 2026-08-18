import {
    Package,
    ShoppingBag,
    Users,
    Wallet,
    Clock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Stats {
    products: number;
    orders: number;
    users: number;
    revenue: number;
    pending: number;
}

interface Order {
    id: number;
    order_number: string;
    customer_name: string;
    total: string;
    payment_status: string;
}

interface Props {
    stats: Stats;
    recentOrders: Order[];
}

export default function Dashboard({
    stats,
    recentOrders,
}: Props) {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">
                    Dashboard
                </h1>
                <p className="text-muted-foreground">
                    Welcome back, Admin.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">

                <StatCard
                    title="Products"
                    value={stats.products}
                    icon={<Package />}
                />

                <StatCard
                    title="Orders"
                    value={stats.orders}
                    icon={<ShoppingBag />}
                />

                <StatCard
                    title="Users"
                    value={stats.users}
                    icon={<Users />}
                />

                <StatCard
                    title="Pending"
                    value={stats.pending}
                    icon={<Clock />}
                />

                <StatCard
                    title="Revenue"
                    value={`Rp ${stats.revenue.toLocaleString(
                        "id-ID"
                    )}`}
                    icon={<Wallet />}
                />

            </div>

            <Card>
                <CardContent className="pt-6">
                    <h2 className="mb-4 text-xl font-semibold">
                        Recent Orders
                    </h2>

                    <table className="w-full">
                        <thead className="text-muted-foreground">
                            <tr className="border-b text-left">
                                <th className="pb-2">
                                    Order
                                </th>
                                <th>
                                    Customer
                                </th>
                                <th>
                                    Payment
                                </th>
                                <th className="text-right">
                                    Total
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {recentOrders.map(
                                (order) => (
                                    <tr
                                        key={order.id}
                                        className="border-b"
                                    >
                                        <td className="py-3 font-medium">
                                            {
                                                order.order_number
                                            }
                                        </td>

                                        <td>
                                            {
                                                order.customer_name
                                            }
                                        </td>

                                        <td>
                                            <span className="rounded bg-green-100 px-2 py-1 text-xs capitalize text-green-700">
                                                {
                                                    order.payment_status
                                                }
                                            </span>
                                        </td>

                                        <td className="text-right font-medium">
                                            Rp{" "}
                                            {Number(
                                                order.total
                                            ).toLocaleString(
                                                "id-ID"
                                            )}
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </div>
    );
}

function StatCard({
    title,
    value,
    icon,
}: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
}) {
    return (
        <Card>
            <CardContent className="flex items-center justify-between pt-6">
                <div>
                    <p className="text-sm text-muted-foreground">
                        {title}
                    </p>

                    <h2 className="mt-1 text-2xl font-bold">
                        {value}
                    </h2>
                </div>

                <div className="rounded-full bg-orange-100 p-3 text-orange-500">
                    {icon}
                </div>
            </CardContent>
        </Card>
    );
}