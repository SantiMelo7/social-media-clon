import { validateRequest } from "@/auth"
import { UserDataProps } from "@/interfaces/userData"
import UserTooltip from "./UserTooltip"
import UserAvatar from "./UserAvatar"
import Links from "../layout/Links"
import LinkiFy from "../linkify/LinkiFy"
import FollowButton from "../follow/FollowButton"

export default async function UserInfoSide({ user }: UserDataProps) {
    const { user: loggedUser } = await validateRequest()
    await new Promise(r => setTimeout(r, 4000))
    if (!loggedUser) return
    return (
        <div className="space-y-5 rounded-xl bg-card p-5 shadow-sm">
            <div className="text-2xl font-bold">About this user</div>
            <UserTooltip user={user}>
                <Links url={`/users/${user.username}`} className="flex items-center gap-3">
                    <UserAvatar avatarUrl={user.avatarUrl} className="flex-none" />
                    <div>
                        <p className="line-clamp-1 break-all font-semibold hover:underline">
                            {user.displayName}
                        </p>
                        <p className="line-clamp-1 break-all text-muted-foreground">
                            @{user.username}
                        </p>
                    </div>
                </Links>
            </UserTooltip>
            <LinkiFy>
                <div className="line-clamp-6 whitespace-pre-line break-words text-muted-foreground">
                    {user.bio}
                </div>
            </LinkiFy>
            {user.id !== loggedUser.id && (
                <FollowButton nameUser={loggedUser.username} userId={user.id} initialState={{
                    followers: user._count.followers,
                    isFollowedByUser: user.followers.some(({ followerId }) => followerId === loggedUser.id)
                }} />
            )}
        </div>
    )
}