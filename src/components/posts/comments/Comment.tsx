import Links from "@/components/layout/Links";
import UserAvatar from "@/components/users/UserAvatar";
import UserTooltip from "@/components/users/UserTooltip";
import { CommentData } from "@/lib/types";
import { formatedRelativeDate } from "@/lib/utils";

export interface CommentProps {
    comments: CommentData,
}

export default function Comment({ comments }: CommentProps) {
    return (
        <div className="flex gap-3 py-3">
            <span className="hidden sm:inline">
                <UserTooltip user={comments.user}>
                    <Links url={`/users/${comments.user.id}`}>
                        <UserAvatar avatarUrl={comments.user.avatarUrl} />
                    </Links>
                </UserTooltip>
            </span>
            <div>
                <div className="flex gap-x-3 items-center">
                    <UserTooltip user={comments.user}>
                        <Links url={`/users/${comments.user.id}`}>
                            <h1 className="font-medium hover:underline">{comments.user.displayName}</h1>
                        </Links>
                    </UserTooltip>
                    <span className="text-muted-foreground">{formatedRelativeDate(comments.createAd)}</span>
                </div>
                <div>{comments.content}</div>
            </div>
        </div>
    )
}