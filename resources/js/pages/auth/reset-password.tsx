import { useForm } from "@inertiajs/react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ResetPasswordProps {
    email: string;
    token: string;
    passwordRules: string;
}

export default function ResetPassword({
    email,
    token,
    passwordRules,
}: ResetPasswordProps) {
    const { data, setData, post, processing, errors } = useForm({
        token,
        email,
        password: "",
        password_confirmation: "",
    });

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        post("/reset-password");
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Reset your password</CardTitle>

                <CardDescription>
                    Enter your new password below.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">
                                Email
                            </Label>

                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                autoComplete="email"
                                required
                            />

                            {errors.email && (
                                <p className="text-sm text-destructive">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">
                                New password
                            </Label>

                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                autoComplete="new-password"
                                required
                            />

                            <p className="text-muted-foreground text-xs">
                                {passwordRules}
                            </p>

                            {errors.password && (
                                <p className="text-sm text-destructive">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">
                                Confirm new password
                            </Label>

                            <Input
                                id="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value,
                                    )
                                }
                                autoComplete="new-password"
                                required
                            />

                            {errors.password_confirmation && (
                                <p className="text-sm text-destructive">
                                    {errors.password_confirmation}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={processing}
                        >
                            {processing
                                ? "Resetting..."
                                : "Reset password"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
