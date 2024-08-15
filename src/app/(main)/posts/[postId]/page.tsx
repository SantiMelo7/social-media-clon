import Loading from "@/app/loading"
import { validateRequest } from "@/auth"
import FollowButton from "@/components/follow/FollowButton"
import LinkiFy from "@/components/linkify/LinkiFy"
import Post from "@/components/posts/Post"
import UserAvatar from "@/components/users/UserAvatar"
import UserTooltip from "@/components/users/UserTooltip"
import { UserDataProps } from "@/interfaces/userData"
import prisma from "@/lib/prisma"
import { getPostDataInclude } from "@/lib/types"
import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { cache, Suspense } from "react"

export interface PostPageProps {
    params: { postId: string }
}

const getPost = cache(async (postId: string, loggedUser: string) => {
    const post = await prisma.post.findUnique({
        where: {
            id: postId
        },
        include: getPostDataInclude(loggedUser)
    })
    if (!post) notFound()

    return post
})

export async function generateMetadata({ params: { postId } }: PostPageProps): Promise<Metadata> {
    const { user } = await validateRequest()
    if (!user) return {}

    const post = await getPost(postId, user.id)

    return {
        title: `${post.user.username} (@${post.content.slice(0, 50)})...`,
    }
}

export default async function PostPage({ params: { postId } }: PostPageProps) {
    const { user } = await validateRequest()

    if (!user) {
        return (
            <p>You&rsquo;re not authorized to view this page</p>
        )
    }

    const post = await getPost(postId, user.id)

    return (
        <main className="flex w-full min-w-0 gap-5">
            <div className="w-full min-w-0 space-y-5">
                <Post post={post} />
            </div>
            <div className="sticky top-[5.25rem] hidden h-fit w-80 flex-none lg:block">
                <Suspense fallback={<Loading />}>
                    <UserInfoSide user={post.user} />
                </Suspense>
            </div>
        </main>
    )
}

export async function UserInfoSide({ user }: UserDataProps) {
    const { user: loggedUser } = await validateRequest()
    await new Promise(r => setTimeout(r, 4000))
    if (!loggedUser) return
    return (
        <div className="space-y-5 rounded-xl bg-card p-5 shadow-sm">
            <div className="text-2xl font-bold">About this user</div>
            <UserTooltip user={user}>
                <Link href={`/users/${user.username}`} className="flex items-center gap-3">
                    <UserAvatar avatarUrl={user.avatarUrl} className="flex-none" />
                    <div>
                        <p className="line-clamp-1 break-all font-semibold hover:underline">
                            {user.displayName}
                        </p>
                        <p className="line-clamp-1 break-all text-muted-foreground">
                            @{user.username}
                        </p>
                    </div>
                </Link>
            </UserTooltip>
            <LinkiFy>
                <div className="line-clamp-6 whitespace-pre-line break-words text-muted-foreground">
                    {user.bio}
                </div>
            </LinkiFy>
            {user.id !== loggedUser.id && (
                <FollowButton userId={user.id} initialState={{
                    followers: user._count.followers,
                    isFollowedByUser: user.followers.some(({ followerId }) => followerId === loggedUser.id)
                }} />
            )}
        </div>
    )
}