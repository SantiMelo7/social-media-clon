import styles from "../../app/styles/main.module.css"
import { Skeleton } from "../ui/skeleton";

export default function Notificactions() {
    return (
        <div className={styles.containerContentSleketon}>
            <div className="flex gap-3 p-3 items-center flex-wrap">
                <Skeleton className="w-10 h-4 mt-0.5" />
                <Skeleton className="rounded-full size-10" />
                <Skeleton className={styles.sleketonThree} />
            </div>
            <div className={styles.containerSleketonFour}>
                <Skeleton className={styles.sleketonFour} />
            </div>
        </div>
    )
}