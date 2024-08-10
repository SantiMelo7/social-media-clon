import { formatNumber, getTrendingTopics } from "@/lib/utils";
import Link from "next/link";
import styles from "../app/styles/rightMain.module.css"

export async function TrendingTopics() {
    const trendingTopics = await getTrendingTopics()
    return (
        <div className={styles.containerMainSideBarTrending}>
            <div className={styles.titleCardSideBar}>Trending Topics</div>
            {trendingTopics.map(({ hashtag, count }) => {
                const title = hashtag.split('#')[1]
                return (
                    <div key={title}>
                        {trendingTopics.length < 0 ? (
                            <p className={styles.parragrafhNoTrending}>No trending topics available</p>
                        ) : (
                            <Link key={title} href={`/hashtag/${title}`} className="block">
                                <p className={styles.textPrincipal} title={hashtag}>
                                    {hashtag}
                                </p>
                                <div className={styles.containerFormatNumber}>
                                    {formatNumber(count)} {count < 1 ? 'post' : 'posts'}
                                </div>
                            </Link>
                        )}
                    </div>
                )
            })}
        </div>
    )
}