import { Link, usePage } from "@inertiajs/react";
import { ShoppingCart, PanelsTopLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface AuthUser {
    id: number;
    name: string;
    email: string;
    role: "admin" | "user";
}

type PageProps = {
    auth: {
        user: AuthUser | null;
    };
};

export default function Menu() {
    const { auth } = usePage<PageProps>().props;

    const user = auth.user;

    if (!user) {
        return null;
    }

    return (
        <div className="flex h-8 items-center gap-2">
            <Separator orientation="vertical" />

            {user.role === "admin" ? (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            asChild
                            variant="ghost"
                            size="icon"
                        >
                            <Link href="/admin">
                                <PanelsTopLeft className="h-6 w-6" />
                            </Link>
                        </Button>
                    </TooltipTrigger>

                    <TooltipContent>
                        <p>Admin Dashboard</p>
                    </TooltipContent>
                </Tooltip>
            ) : (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            asChild
                            variant="ghost"
                            size="icon"
                        >
                            <Link href="/cart">
                                <ShoppingCart className="h-6 w-6" />
                            </Link>
                        </Button>
                    </TooltipTrigger>

                    <TooltipContent>
                        <p>Cart</p>
                    </TooltipContent>
                </Tooltip>
            )}

            <Separator orientation="vertical" />
        </div>
    );
}