import { Link, usePage } from "@inertiajs/react";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Store,
} from "lucide-react";

const menus = [
    {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
        exact: true,
    },
    {
        title: "Products",
        href: "/admin/products",
        icon: Package,
        exact: false,
    },
    {
        title: "Orders",
        href: "/admin/orders",
        icon: ShoppingCart,
        exact: false,
    },
];

export default function AdminSidebar() {
    const { url } = usePage();

    return (
        <aside className="flex h-full w-64 shrink-0 flex-col border-r bg-white">
            <div className="flex h-16 items-center gap-2 border-b px-6">
                <Store className="h-6 w-6 text-orange-500" />

                <h1 className="text-lg font-bold">
                    Lokarasa Admin
                </h1>
            </div>

            <nav className="flex-1 space-y-1 p-4">
                {menus.map((menu) => {
                    const Icon = menu.icon;

                    const active = menu.exact
                        ? url === menu.href
                        : url.startsWith(menu.href);

                    return (
                        <Link
                            key={menu.title}
                            href={menu.href}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition ${
                                active
                                    ? "bg-orange-500 text-white"
                                    : "hover:bg-muted"
                            }`}
                        >
                            <Icon className="h-5 w-5" />

                            {menu.title}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}