import PostEditor from "@/components/posts/editor/PostEditor";
import styles from "../styles/main.module.css"
import TrendsSidebar from "@/components/TrendsSidebar";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import { dataTabs } from "@/util/dataTabs";

export default async function Home() {
  return (
    <main className={styles.containerAppMain}>
      <div className={styles.containerAppMainEditor}>
        <PostEditor />
        <Tabs defaultValue="for-you">
          <TabsList>
            {dataTabs.map((text) => (
              <TabsTrigger key={text.key} value={text.value}>
                {text.titleTab}
              </TabsTrigger>
            ))}
          </TabsList>
          {dataTabs.map((text) => (
            <TabsContent key={text.key} value={text.value}>
              {text.renderTab}
            </TabsContent>
          ))}
        </Tabs>
      </div>
      <TrendsSidebar />
    </main>
  )
}
