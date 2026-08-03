import Header from '@/components/header/Header';

interface Props {
    children: React.ReactNode;
}

export default function HeaderLayout({ children }: Props) {
    return (
        <div className="min-h-screen">
            <Header />
            <main className="max-w-7x mx-auto px-4 py-6">{children}</main>
        </div>
    );
}
