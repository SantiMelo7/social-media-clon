import styles from "../../app/styles/main.module.css"
import PostLoadingSkeleton from './PostLoadingSkeleton';
import NotificationsSleketon from "../layout/NotificationsSleketon"

export function PostsLoadingSkeleton() {
    return (
        <div className={styles.containerInfiniteScroll}>
            <PostLoadingSkeleton />
            <PostLoadingSkeleton />
            <PostLoadingSkeleton />
        </div>
    )
}

export function NotificationsLoadingSleketon() {
    return (
        <div className={styles.containerInfiniteScroll}>
            <NotificationsSleketon />
            <NotificationsSleketon />
            <NotificationsSleketon />
        </div>
    )
}