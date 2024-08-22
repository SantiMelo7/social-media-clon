import { Metadata } from "next"
import TrendsSidebar from "@/components/layout/TrendsSidebar"
import styles from "../../styles/layout.module.css"

export const metadata: Metadata = {
    title: "Feed"
}

export default async function PageFeed() {
    return (
        <main className={styles.containerMainPage}>
            <TrendsSidebar pathname="/feed" />
        </main>
    )
}