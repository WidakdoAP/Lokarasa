export type User = {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    avatar?: string;
    role: string;
    created_at: string;
    updated_at: string;
};

export type Auth = {
    user: User;
};
