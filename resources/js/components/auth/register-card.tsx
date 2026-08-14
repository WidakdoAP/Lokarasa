import { useForm } from "@inertiajs/react";
import { Link } from "@inertiajs/react";

import { FaGoogle } from "react-icons/fa";

import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function RegisterCard() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        post("/register", {
            onFinish: () => {
                reset("password", "password_confirmation");
            },
        });
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-2xl">Create an account</CardTitle>
                <CardDescription>
                    Enter your email below to create an account
                </CardDescription>
                <CardAction>
                    <Link href="/login" className="hover:underline">Login</Link>
                </CardAction>
            </CardHeader>
            <CardContent className="space-y-6">
                <Button
                    type="button"
                    variant="outline"
                    className="w-full gap-2"
                    asChild
                >
                    <a href="/auth/google">
                        <FaGoogle className="size-4" />
                        Google
                    </a>
                </Button>
                <div>
                    <div className="flex items-center gap-4">
                        <Separator className="flex-1" />
                        <span className="text-muted-foreground text-xs uppercase">
                            Or Continue With
                        </span>
                        <Separator className="flex-1" />
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name"> Name </Label>
                            <Input
                                id="name"
                                type="text"
                                value={data.name}
                                placeholder="John Doe"
                                onChange={(e) => setData("name", e.target.value)}
                                autoComplete="name"
                                required
                            />
                            {errors.name && (<p className="text-sm text-destructive"> {errors.name} </p>)}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                placeholder="email@example.com"
                                onChange={(e) => setData("email", e.target.value)}
                                autoComplete="email"
                                required
                            />
                            {errors.email && (<p className="text-sm text-destructive"> {errors.email} </p>)}
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                              <Label htmlFor="password">Password</Label>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                placeholder="e.g. 12345678"
                                onChange={(e) => setData("password", e.target.value)}
                                autoComplete="new-password"
                                required
                            />
                            {errors.password && (<p className="text-sm text-destructive"> {errors.password} </p>)}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation"> Confirm password </Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData("password_confirmation", e.target.value,)}
                                placeholder="e.g. 12345678"
                                autoComplete="new-password"
                                required
                            />
                            {errors.password_confirmation && (<p className="text-sm text-destructive"> {errors.password_confirmation} </p>)}
                        </div>
                    </div>
                    <div>
                        <Separator className="my-4" />
                        <Button
                            type="submit"
                            disabled={processing}
                            className="w-full"
                        >
                            {processing ? "Creating account..." : "Create account"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
