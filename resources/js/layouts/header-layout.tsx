import { usePage } from '@inertiajs/react';

import Logo from '@/components/header/logo';
import Menu from '@/components/header/menu';
import SearchBar from '@/components/header/search-bar';
import UserAvatar from '@/components/header/user-avatar';

import { Button } from '@/components/ui/button';

export default function HeaderLayout() {
    const { auth } = usePage().props;

    return (
        <header className="border-b bg-background">
            <div className="mx-auto max-w-7xl px-4 py-3">
                {/* Mobile Layout */}
                <div className="flex items-center justify-between md:hidden">
                    <Logo />
                    <div className="flex items-center gap-2">
                        <Menu role="user" />
                        {auth.user ? (
                          <UserAvatar />
                        ) : (
                            <div className="flex gap-2">
                                <Button asChild>
                                    <a href="/login">Login</a>
                                </Button>

                                <Button asChild variant="outline">
                                    <a href="/register">Register</a>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="mt-3 md:hidden">
                    <SearchBar />
                </div>

                {/* Desktop Layout */}
                <div className="hidden items-center gap-6 md:flex">
                    <Logo />
                    <div className="flex-1">
                        <SearchBar />
                    </div>
                    <Menu role="user" />
                    {auth.user ? (
                      <UserAvatar />
                    ) : (
                        <div className="flex gap-2">
                            <Button asChild>
                                <a href="/login">Login</a>
                            </Button>

                            <Button asChild variant="outline">
                                <a href="/register">Register</a>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
