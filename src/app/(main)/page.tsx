import PostEditor from "@/components/posts/editor/PostEditor";
import styles from "../styles/main.module.css"
import prisma from "@/lib/prisma";
import Post from "@/components/posts/Post";
import { postDataInclude } from "@/lib/types";
import TrendsSidebar from "@/components/TrendsSidebar";

export default async function Home() {

  const posts = await prisma.post.findMany({
    include: postDataInclude,
    orderBy: { createAd: "desc" }
  })

  return (
    <main className={styles.containerAppMain}>
      <div className={styles.containerAppMainEditor}>
        <PostEditor />
        {posts.map((text) => (
          <Post key={text.id} post={text} />
        ))}
      </div>
      <TrendsSidebar />
    </main>
  )
}
