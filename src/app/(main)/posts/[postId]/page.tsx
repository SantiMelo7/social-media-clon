import Loading from "@/app/loading"
import { validateRequest } from "@/auth"
import Post from "@/components/posts/Post"
import UserInfoSide from "@/components/users/UserInfoSide"
import prisma from "@/lib/prisma"
import { getPostDataInclude } from "@/lib/types"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { cache, Suspense } from "react"
import styles from "../../../../app/styles/layout.module.css"

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
        <main className={styles.containerMainPage}>
            <div className={styles.containerMainContent}>
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
