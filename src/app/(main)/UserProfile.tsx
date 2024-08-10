import FollowButton from "@/components/follow/FollowButton";
import FollowerCount from "@/components/follow/FollowerCount";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/UserAvatar";
import { FollowerInfo, UserData } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { formatDate } from "date-fns";

interface UserProfileProps {
    user: UserData;
    loggedInUserId: string
}

async function UserProfile({ user, loggedInUserId }: UserProfileProps) {
    const followerInfo: FollowerInfo = {
        followers: user._count.followers,
        isFollowedByUser: user.followers.some(
            ({ followerId }) => followerId === loggedInUserId)
    }
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
                        <FollowerCount userId={user.id} initialState={followerInfo} />
                    </div>
                </div>
                {user.id === loggedInUserId ? (
                    <Button >Edit Profile</Button>
                ) : (
                    <FollowButton userId={user.id} initialState={followerInfo} ></FollowButton>
                )}
            </div>
            {user.bio && (
                <>
                    <hr />
                    <div className="whitespace-pre-line overflow-hidden break-words">
                        {user.bio}
                    </div>
                </>
            )}
        </div>
    )
}

export default UserProfile