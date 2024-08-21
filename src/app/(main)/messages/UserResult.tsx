import UserAvatar from "@/components/users/UserAvatar";
import { UserResultProps } from "@/interfaces/resultChat";
import { Check } from "lucide-react";

export function UserResult({ user, selected, onClick }: UserResultProps) {
    return (
        <div>
            <button
                onClick={onClick}
                className="flex w-full items-center justify-between px-4 py-2.5 transition-colors hover:bg-muted/50"
            >
                <div className="flex items-center gap-5 mt-3">
                    <UserAvatar avatarUrl={user.image as string} />
                    <div className="flex flex-col text-start">
                        <p className="font-bold">{user.name}</p>
                        <p className="text-muted-foreground">@{user.name}</p>
                    </div>
                </div>
                {selected && (
                    <Check className="size-5 text-primary" />
                )}
            </button>
        </div>
    )
}