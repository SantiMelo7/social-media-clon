import PostEditor from "@/components/posts/editor/PostEditor";
import styles from "../styles/main.module.css"

export default function Home() {
  return (
    <main className={styles.containerAppMain}>
      <div className={styles.containerAppMainEditor}>
        <PostEditor />
      </div>
    </main>
  )
}
