import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import { WhoToFollow } from "./WhoToFollow";
import { TrendingTopics } from "./TrendingTopics";
import styles from "../../app/styles/rightMain.module.css"

export default function TrendsSidebar() {
    return (
        <div className={styles.containerRigthMain}>
            <Suspense fallback={<Loader2 className={styles.suspenseSpin} />}>
                <WhoToFollow />
                <TrendingTopics />
            </Suspense>
        </div>
    )
}