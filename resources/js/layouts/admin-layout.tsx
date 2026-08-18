import type { ReactNode } from "react";
import AdminSidebar from "@/components/admin/sidebar";
import HeaderLayout from "@/layouts/header-layout";

interface Props {
    children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
    return (
        <div className="flex h-screen flex-col overflow-hidden bg-muted/30">
            {/* Fixed Header */}
            <header className="shrink-0">
                <HeaderLayout />
            </header>

            {/* Sidebar + Content */}
            <div className="flex min-h-0 flex-1">
                {/* Fixed Sidebar */}
                <aside className="shrink-0">
                    <AdminSidebar />
                </aside>

                {/* Scrollable Content */}
                <main className="min-w-0 flex-1 overflow-y-auto p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}