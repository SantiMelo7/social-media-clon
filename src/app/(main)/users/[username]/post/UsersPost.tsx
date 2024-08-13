"use client"

import Post from "@/components/posts/Post"
import { PostsPage } from "@/lib/types"
import { useInfiniteQuery } from "@tanstack/react-query"
import styles from "../../../../../app/styles/rightMain.module.css"
import stylesMain from "../../../../../app/styles/main.module.css"
import kyInstance from "@/lib/ky"
import InfiniteScrollContainer from "@/components/InfiniteScrollContainer"
import PostsLoadingSkeleton from "@/components/posts/PostLoadingSkeleton"
import { UserPostsProps } from "@/interfaces/userPostsProps"

export default function UserPosts({ userId }: UserPostsProps) {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ["post-feed", "users-posts", userId],
        queryFn: ({ pageParam }) =>
            kyInstance
                .get(
                    `/api/users/${userId}/posts`,
                    pageParam ? { searchParams: { cursor: pageParam } } : {},
                )
                .json<PostsPage>(),
        initialPageParam: null as string | null,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

    const posts = data?.pages.flatMap(page => page.posts) || []

    if (status === "pending") {
        return <PostsLoadingSkeleton />
    }
    if (status === "success" && !posts.length && !hasNextPage) {
        return <p className={styles.textError}>This user hasn&apos;t posted anuthing yet.</p>
    }

    return (
        <InfiniteScrollContainer onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()} className={stylesMain.containerInfiniteScroll}>
            {posts.map((text) => (
                <Post key={text.id} post={text} />
            ))}
            {isFetchingNextPage && (
                <PostsLoadingSkeleton />
            )}
        </InfiniteScrollContainer>
    )
}