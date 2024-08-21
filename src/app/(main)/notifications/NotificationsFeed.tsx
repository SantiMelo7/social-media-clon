"use client";

import { NotificationsPage } from "@/lib/types"
import { QueryKey, useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import styles from "../../styles/rightMain.module.css"
import stylesMain from "../../styles/main.module.css"
import kyInstance from "@/lib/ky"
import InfiniteScrollContainer from "@/components/layout/InfiniteScrollContainer"
import { NotificationsLoadingSleketon } from "@/components/posts/SleketonPending"
import Notification from "./Notification";
import { useEffect } from "react";

export default function NotificationsFeed() {

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ["notifications"],
        queryFn: ({ pageParam }) =>
            kyInstance
                .get(
                    "/api/notifications",
                    pageParam ? { searchParams: { cursor: pageParam } } : {},
                )
                .json<NotificationsPage>(),
        initialPageParam: null as string | null,
        getNextPageParam: (lastPage) => lastPage.previousCursor,
    });

    const url = "/api/notifications/mark-as-read"
    const queryKey: QueryKey = ["unread-notifications-count"]

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: () => kyInstance.patch(url),
        onSuccess: () => {
            queryClient.setQueryData(queryKey, {
                unreadCount: 0
            })
        },
        onError(error) {
            console.log(error);
        }
    })

    useEffect(() => {
        mutate()
    }, [mutate])

    const notifications = data?.pages.flatMap(page => page.notification) || []

    if (status === "pending") {
        return <NotificationsLoadingSleketon />
    }

    if (status === "success" && !notifications.length && !hasNextPage) {
        return <p className={styles.textError}>You have no notifications for now.</p>
    }

    return (
        <InfiniteScrollContainer onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()} className={stylesMain.containerInfiniteScroll}>
            {notifications.map((text) => (
                <Notification key={text.id} notification={text} />
            ))}
            {isFetchingNextPage && (
                <NotificationsLoadingSleketon />
            )}
        </InfiniteScrollContainer>
    )
}