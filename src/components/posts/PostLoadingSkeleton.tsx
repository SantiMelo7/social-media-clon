import { Skeleton } from "../ui/skeleton";
import styles from "../../app/styles/main.module.css"

export default function PostLoadingSkeleton() {
    return (
        <div className={styles.containerContentSleketon}>
            <div className={styles.containerSecondSleketon}>
                <Skeleton className={styles.sleketonOne} />
                <div className={styles.containerOneTwoSleketon}>
                    <Skeleton className={styles.sleketonTwo} />
                    <Skeleton className={styles.sleketonThree} />
                </div>
            </div>
            <div className={styles.containerSleketonFour}>
                <Skeleton className={styles.sleketonFour} />
            </div>
        </div>
    )
}