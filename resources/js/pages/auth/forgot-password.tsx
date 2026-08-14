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

interface ForgotPasswordProps {
    status?: string;
}

export default function ForgotPassword({
    status,
}: ForgotPasswordProps) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        post("/forgot-password");
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Forgot your password?</CardTitle>

                <CardDescription>
                    Enter your email address and we'll send you a
                    password reset link.
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
                                placeholder="email@example.com"
                                required
                            />

                            {errors.email && (
                                <p className="text-sm text-destructive">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={processing}
                        >
                            {processing
                                ? "Sending..."
                                : "Send reset link"}
                        </Button>

                        {status && (
                            <p className="text-sm text-green-600">
                                {status}
                            </p>
                        )}
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}