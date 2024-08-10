import { Prisma } from "@prisma/client";

export function getUserDataSelect(loggedInUserId: string) {
    return {
        id: true,
        username: true,
        displayName: true,
        avatarUrl: true,
        bio: true,
        createAd: true,
        followers: {
            where: {
                followerId: loggedInUserId,
            },
            select: {
                followerId: true,
            },
        },
        _count: {
            select: {
                followers: true,
                posts: true,
            },
        },
    } satisfies Prisma.UserSelect;
}

export type UserData = Prisma.UserGetPayload<{
    select: ReturnType<typeof getUserDataSelect>
}>

export function getPostDataInclude(loggedInUser: string) {
    return {
        user: {
            select: getUserDataSelect(loggedInUser),
        },
    } satisfies Prisma.PostInclude;
}

export type PostData = Prisma.PostGetPayload<{
    include: ReturnType<typeof getPostDataInclude>
}>;

export interface PostsPage {
    posts: PostData[]
    nextCursor: string | null
}

export interface FollowerInfo {
    followers: number;
    isFollowedByUser: boolean;
}