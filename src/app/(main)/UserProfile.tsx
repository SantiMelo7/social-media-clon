import FollowButton from "@/components/follow/FollowButton";
import FollowerCount from "@/components/follow/FollowerCount";
import LinkiFy from "@/components/linkify/LinkiFy";
import UserAvatar from "@/components/users/UserAvatar";
import { UserProfileProps } from "@/interfaces/userProfileProps";
import { formatNumber } from "@/lib/utils";
import { followerState } from "@/util/followerState";
import { formatDate } from "date-fns";
import EditProfileButton from "./users/[username]/edit/EditProfileButton";

async function UserProfile({ user, loggedInUserId }: UserProfileProps) {
    return (
        <div className="w-full h-fit space-y-5 bg-card shadow-sm p-5">
            <UserAvatar
                avatarUrl={user.avatarUrl}
                size={250}
                className="mx-auto size-full max-h-60 max-w-60 rounded-full"
            />
            <div className="flex flex-wrap gap-3 sm:flex-nowrap">
                <div className="me-auto space-y-3">
                    <div>
                        <h1 className="text-3xl font-bold">{user.username}</h1>
                        <div className="text-muted-foreground">@{user.displayName}</div>
                    </div>
                    <div>Member since {formatDate(user.createAd, "MMM d, yyyy")}</div>
                    <div className="flex items-center gap-3">
                        <span>
                            Posts: {" "}
                            <span className="font-semibold">
                                {formatNumber(user._count.posts)}
                            </span>
                        </span>
                        <FollowerCount nameUser={user.username} userId={user.id} initialState={followerState(user, loggedInUserId)} />
                    </div>
                </div>
                {user.id === loggedInUserId ? (
                    <EditProfileButton user={user} />
                ) : (
                    <FollowButton nameUser={user.username} userId={user.id} initialState={followerState(user, loggedInUserId)}></FollowButton>
                )}
            </div>
            {user.bio && (
                <>
                    <div className="space-y-2">
                        <span>Bio:</span>
                        <hr className="border-[1.5px] border-primary" />
                    </div>
                    <LinkiFy>
                        <div className="whitespace-pre-line overflow-hidden break-words">
                            {user.bio}
                        </div>
                    </LinkiFy>
                </>
            )}
        </div>
    )
}

export default UserProfile