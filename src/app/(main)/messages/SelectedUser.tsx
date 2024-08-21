import UserAvatar from '@/components/users/UserAvatar';
import { ResultChat } from '@/interfaces/resultChat';
import { X } from 'lucide-react';

export function SelectedUser({ user, onRemove }: ResultChat) {
    return (
        <button
            className="flex items-center gap-2 rounded-2xl border -translate-y-3 p-1 hover:bg-muted/50"
            onClick={onRemove}
        >
            <UserAvatar avatarUrl={user.image as string} size={24} />
            <p className="font-bold">{user.name}</p>
            <X className="mx-2 size-5 text-muted-foreground" />
        </button>
    )
}