import { Head, useForm } from '@inertiajs/react';

import {
    CalendarDays,
    CheckCircle2,
    Mail,
    Camera,
} from 'lucide-react';

import { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

import AppLayout from '@/layouts/app-layout';

interface UserData {
    name: string;
    email: string;
    avatar: string | null;
    email_verified_at: string | null;
    created_at: string;
    google_connected: boolean;
}

interface Props {
    user: UserData;
}

export default function Profile({ user }: Props) {
    const [avatarPreview, setAvatarPreview] = useState<string | null>(user.avatar);

    const { data, setData, post, processing, errors } = useForm({
        name: user.name,
        avatar: null as File | null,
    });

    function getInitials(name: string) {
        return name
            .split(' ')
            .map((word) => word[0])
            .join('')
            .slice(0, 2)
            .toUpperCase();
    }

    function handleAvatarChange(
        event: React.ChangeEvent<HTMLInputElement>,
    ) {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        setData('avatar', file);

        const preview = URL.createObjectURL(file);

        setAvatarPreview(preview);
    }

    function submit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        post('/profile', {
            forceFormData: true,
        });
    }

    const joinedDate = new Date(user.created_at).toLocaleDateString(
        'id-ID',
        {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        },
    );

    return (
        <>
            <Head title="Profile" />

            <div className="mx-auto w-full max-w-5xl space-y-6">
                {/* Profile */}
                <Card>
                    <CardHeader>
                        <CardTitle>Profile</CardTitle>

                        <CardDescription>
                            Manage your profile information.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form
                            onSubmit={submit}
                            className="space-y-8"
                        >
                            {/* Avatar */}
                            <div className="flex flex-col items-center gap-4 sm:flex-row">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage
                                        src={
                                            avatarPreview ??
                                            undefined
                                        }
                                        alt={user.name}
                                        className="object-cover"
                                    />

                                    <AvatarFallback className="text-2xl">
                                        {getInitials(data.name)}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="space-y-2">
                                    <Label
                                        htmlFor="avatar"
                                        className="cursor-pointer"
                                    >
                                        <Button
                                            type="button"
                                            variant="outline"
                                            asChild
                                        >
                                            <span>
                                                <Camera />
                                                Change photo
                                            </span>
                                        </Button>
                                    </Label>

                                    <Input
                                        id="avatar"
                                        type="file"
                                        accept="image/png,image/jpeg,image/webp"
                                        className="hidden"
                                        onChange={handleAvatarChange}
                                    />

                                    <p className="text-sm text-muted-foreground mt-2">
                                        JPG, PNG or WebP. Max 2MB.
                                    </p>

                                    {errors.avatar && (
                                        <p className="text-sm text-destructive">
                                            {errors.avatar}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <Separator />

                            {/* Name */}
                            <div className="space-y-2">
                                <Label htmlFor="name">
                                    Username
                                </Label>

                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(event) =>
                                        setData(
                                            'name',
                                            event.target.value,
                                        )
                                    }
                                    placeholder="Your name"
                                    className="bg-background"
                                />

                                {errors.name && (
                                    <p className="text-sm text-destructive">
                                        {errors.name}
                                    </p>
                                )}

                                <p className="text-sm text-muted-foreground">
                                    This name will be displayed on your
                                    profile.
                                </p>
                            </div>
                            <Button
                                type="submit"
                                disabled={processing}
                            >
                                {processing
                                    ? 'Saving...'
                                    : 'Save changes'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Account information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Account Information</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="rounded-lg bg-muted p-2">
                                <Mail className="h-5 w-5" />
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Email
                                </p>

                                <div className="flex items-center gap-2">
                                    <p className="font-medium">
                                        {user.email}
                                    </p>

                                    {user.email_verified_at && (
                                        <Badge
                                            variant="secondary"
                                            className="gap-1"
                                        >
                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                            Verified
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </div>

                        <Separator />

                        <div className="flex items-center gap-4">
                            <div className="rounded-lg bg-muted p-2">
                                <CalendarDays className="h-5 w-5" />
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Member since
                                </p>

                                <p className="font-medium">
                                    {joinedDate}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Connected accounts */}
                <Card>
                    <CardHeader>
                        <CardTitle>Connected Accounts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="rounded-lg bg-muted p-2">
                                    <FaGoogle className="h-5 w-5" />
                                </div>

                                <div>
                                    <p className="font-medium">
                                        Google
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        {user.google_connected
                                            ? 'Google account connected'
                                            : 'Google account not connected'}
                                    </p>
                                </div>
                            </div>

                            <Badge
                                variant={
                                    user.google_connected
                                        ? 'default'
                                        : 'outline'
                                }
                            >
                                {user.google_connected
                                    ? 'Connected'
                                    : 'Not connected'}
                            </Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Profile.layout = (page: React.ReactNode) => (
    <AppLayout>{page}</AppLayout>
);