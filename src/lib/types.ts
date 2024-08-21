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
        attachments: true,
        likes: {
            where: {
                userId: loggedInUser
            },
            select: {
                userId: true
            }
        },
        bookmarks: {
            where: {
                userId: loggedInUser
            },
            select: {
                userId: true
            }
        },
        comments: {
            where: {
                userId: loggedInUser
            },
            select: {
                userId: true
            }
        },
        _count: {
            select: {
                likes: true,
                comments: true
            },
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

export interface LikesInfo {
    likes: number;
    isLikeByUser: boolean;
}

export interface BookmarksInfo {
    isBookmarkByUser: boolean;
}

export function getCommentsDataInclude(loggedInUserId: string) {
    return {
        user: {
            select: getUserDataSelect(loggedInUserId)
        }
    } satisfies Prisma.CommentInclude
}

export type CommentData = Prisma.CommentGetPayload<{
    include: ReturnType<typeof getCommentsDataInclude>
}>;

export interface CommentsPage {
    comments: CommentData[],
    previousCursor: string | null
}

export const notificationsInclude = {
    issuer: {
        select: {
            username: true,
            displayName: true,
            avatarUrl: true,
        }
    },
    post: {
        select: {
            content: true,
        }
    }
} satisfies Prisma.NotificationInclude

export type NotificationData = Prisma.NotificationGetPayload<{
    include: typeof notificationsInclude
}>;

export interface NotificationsPage {
    notification: NotificationData[],
    previousCursor: string | null
}

export interface NotificationsCount {
    unreadCount: number
}

export interface MessageCountinfo {
    unreadCount: number
}