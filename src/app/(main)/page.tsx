import PostEditor from "@/components/posts/editor/PostEditor";
import styles from "../styles/main.module.css"
import TrendsSidebar from "@/components/TrendsSidebar";
import ForYouFeed from "./ForYouFeed";

export default async function Home() {
  return (
    <main className={styles.containerAppMain}>
      <div className={styles.containerAppMainEditor}>
        <PostEditor />
        <ForYouFeed />
      </div>
      <TrendsSidebar />
    </main>
  )
}
