import { Link, usePage, router } from '@inertiajs/react';
import {
    User,
    CircleUser,
    LogOut,
    SunMoon,
} from 'lucide-react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppearance } from '@/hooks/use-appearance';

export default function UserAvatar() {
    const { appearance, updateAppearance } = useAppearance();
    const { auth } = usePage().props;
    const user = auth.user;

    const toggleTheme = (event: React.MouseEvent) => {
        const nextTheme = appearance === 'dark' ? 'light' : 'dark';
        const x = event.clientX;
        const y = event.clientY;

        document.documentElement.style.setProperty('--theme-x', `${x}px`);
        document.documentElement.style.setProperty('--theme-y', `${y}px`);

        if(!document.startViewTransition) {
            updateAppearance(nextTheme);

            return;
        }

        document.startViewTransition(() => {
            updateAppearance(nextTheme);
        });
    };

    function logout() {
        router.post('/logout')
    }

    if (!user) {
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="border cursor-pointer">
                    <AvatarImage
                        src={user?.avatar}
                        alt={user?.name ?? 'User'} />
                    <AvatarFallback>
                        <User size="icon" />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuGroup>
                    {user && (
                        <>
                            <DropdownMenuItem onClick={toggleTheme}>
                                <SunMoon />
                                {appearance === 'dark' ? 'Dark Theme' : 'Light Theme'}
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link
                                    onClick={() => {
                                        if (!user.email_verified_at) {
                                            toast.warning('Please verify your email before accessing this page.');
                                            
                                            return;
                                        }
                                    }}
                                    href="/profile"
                                >
                                    <CircleUser />
                                    Account
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className='text-destructive-foreground bg-destructive' onClick={logout}>
                                <LogOut />
                                Logout
                            </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
