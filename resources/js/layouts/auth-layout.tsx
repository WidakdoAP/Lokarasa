import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function AuthLayout({ children }: Props) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
            <div className="w-full max-w-md">
                {children}
            </div>
        </div>
    );
}