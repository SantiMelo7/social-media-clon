import { FollowerInfo, UserData } from "@/lib/types";

export const followerState = (user: UserData, loggedInUser: string): FollowerInfo => {
    return {
        followers: user._count.followers,
        isFollowedByUser: !!user.followers.some(
            ({ followerId }) => followerId === loggedInUser
        ),
    };
};