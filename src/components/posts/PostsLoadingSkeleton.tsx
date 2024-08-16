import styles from "../../app/styles/main.module.css"
import PostLoadingSkeleton from './PostLoadingSkeleton';

export default function PostsLoadingSkeleton() {
    return (
        <div className={styles.containerInfiniteScroll}>
            <PostLoadingSkeleton />
            <PostLoadingSkeleton />
            <PostLoadingSkeleton />
        </div>
    )
}
