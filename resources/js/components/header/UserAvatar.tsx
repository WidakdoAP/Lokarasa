import { User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function UserAvatar() {
    return (
        <Avatar className="border">
            <AvatarImage src="" alt="User" />
            <AvatarFallback>
                <User size="icon" />
            </AvatarFallback>
        </Avatar>
    );
}
