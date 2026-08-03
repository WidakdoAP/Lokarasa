import Logo from './Logo';
import Menu from './Menu';
import SearchBar from './SearchBar';
import UserAvatar from './UserAvatar';

export default function Header() {
    return (
        <header className="border-b bg-background">
            <div className="mx-auto max-w-7xl px-4 py-3">
                {/* Mobile Layout */}
                <div className="flex items-center justify-between md:hidden">
                    <Logo />
                    <div className="flex items-center">
                        <Menu role="user" />
                        <UserAvatar />
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
                    <UserAvatar />
                </div>
            </div>
        </header>
    );
}
