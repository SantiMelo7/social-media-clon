import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import { WhoToFollow } from "./WhoToFollow";
import { TrendingTopics } from "./TrendingTopics";
import styles from "../../app/styles/rightMain.module.css"
import { GetServerSideProps } from "next";

interface TrendsSidebarProps {
    pathname?: string
}

export default function TrendsSidebar({ pathname }: TrendsSidebarProps) {

    const containerClass = pathname === '/feed'
        ? styles.containerContentFeed
        : styles.containerRigthMain;

    return (
        <div
            className={containerClass}>
            <Suspense fallback={<Loader2 className={styles.suspenseSpin} />}>
                <WhoToFollow />
                <TrendingTopics />
            </Suspense>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const pathname = context.req.url || "";

    return {
        props: {
            pathname
        }
    };
};