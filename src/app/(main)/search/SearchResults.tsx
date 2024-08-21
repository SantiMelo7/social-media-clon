"use client"

import Post from "@/components/posts/Post"
import { PostsPage } from "@/lib/types"
import { useInfiniteQuery } from "@tanstack/react-query"
import styles from "../../styles/rightMain.module.css"
import stylesMain from "../../styles/main.module.css"
import kyInstance from "@/lib/ky"
import InfiniteScrollContainer from "@/components/layout/InfiniteScrollContainer"
import { PostsLoadingSkeleton } from "@/components/posts/SleketonPending"

export interface SearchResultsProps {
    query: string
}

export default function SearchResults({ query }: SearchResultsProps) {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ["post-feed", "search", query],
        queryFn: ({ pageParam }) =>
            kyInstance.get("/api/search", {
                searchParams: {
                    q: query,
                    ...(pageParam ? { cursor: pageParam } : {})
                }
            })
                .json<PostsPage>(),
        initialPageParam: null as string | null,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        gcTime: 0
    });

    const posts = data?.pages.flatMap(page => page.posts) || []

    if (status === "pending") {
        return <PostsLoadingSkeleton />
    }
    if (status === "success" && !posts.length && !hasNextPage) {
        return <p className={styles.textError}>No post found fot this query.</p>
    }

    console.log(data);


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
