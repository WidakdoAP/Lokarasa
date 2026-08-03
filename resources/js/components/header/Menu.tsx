import { Link } from '@inertiajs/react';
import { ShoppingCart, PanelsTopLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';

type Role = 'admin' | 'user';
interface MenuProps {
    role: Role;
}

export default function Menu({ role }: MenuProps) {
    return (
        <div className="flex h-8 items-center gap-2">
            <Separator orientation="vertical" />
            {role === 'admin' ? (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button asChild variant="ghost" size="icon">
                            <Link href="/market">
                                {' '}
                                {/* /admin */}
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
                        <Button asChild variant="ghost" size="icon">
                            <Link href="/market">
                                {' '}
                                {/* /cart */}
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
