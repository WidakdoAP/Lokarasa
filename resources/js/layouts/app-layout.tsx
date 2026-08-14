import FooterLayout from '@/layouts/footer-layout';
import HeaderLayout from '@/layouts/header-layout';

interface Props {
    children: React.ReactNode;
}

export default function AppLayout({ children }: Props) {
    return (
        <div className="flex min-h-screen flex-col">
            <HeaderLayout />

            <main className="mx-auto w-full flex-1 px-4 py-6">
                {children}
            </main>

            <FooterLayout />
        </div>
    );
}