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

export default function LoginCard() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/login')
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-2xl">Login to your account</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
                <CardAction>
                    <Link href="/register" className="hover:underline">Register</Link>
                </CardAction>
            </CardHeader>
            <CardContent className="space-y-6">
                <Button type="button" variant="outline" className="w-full gap-2" asChild>
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
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                                type="email"
                                value={data.email}
                                placeholder="email@example.com"
                                onChange={(e) => setData('email', e.target.value)}
                                autoComplete="email"
                                required
                            />
                            {errors.email && (<p>{errors.email}</p>)}
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                              <Label htmlFor="password">Password</Label>
                              <a
                                href="/forgot-password"
                                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                              >
                                Forgot your password?
                              </a>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                placeholder="e.g. 12345678"
                                onChange={(e) => setData('password', e.target.value)}
                                autoComplete="current-password"
                                required
                            />
                            {errors.password && (<p>{errors.password}</p>)}
                        </div>
                        <div>
                            <Separator className="my-4" />
                            <Button
                                type="submit"
                                disabled={processing}
                                className="w-full"
                            >
                                {processing ? 'Logging in...' : 'Login'}
                            </Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
