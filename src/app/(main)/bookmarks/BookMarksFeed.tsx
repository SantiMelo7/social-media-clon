"use client"

import Post from "@/components/posts/Post"
import { PostsPage } from "@/lib/types"
import { useInfiniteQuery } from "@tanstack/react-query"
import styles from "../../styles/rightMain.module.css"
import stylesMain from "../../styles/main.module.css"
import kyInstance from "@/lib/ky"
import InfiniteScrollContainer from "@/components/layout/InfiniteScrollContainer"
import PostsLoadingSkeleton from "@/components/posts/PostLoadingSkeleton"

export default function BookMarksFeed() {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ["post-feed", "bookmark"],
        queryFn: ({ pageParam }) =>
            kyInstance
                .get(
                    "/api/posts/bookmark",
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
        return <p className={styles.textError}>No one has posated found. Start following people to see their post here.</p>
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
