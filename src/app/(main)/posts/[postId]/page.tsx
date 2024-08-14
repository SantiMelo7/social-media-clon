import { validateRequest } from "@/auth"
import Post from "@/components/posts/Post"
import prisma from "@/lib/prisma"
import { getPostDataInclude } from "@/lib/types"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { cache } from "react"

interface PostPageProps {
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
        <main className="fkex w-full min-w-0 gap-5">
            <div className="w-full min-w-0 space-y-5">
                <Post post={post} />
            </div>
        </main>
    )
}