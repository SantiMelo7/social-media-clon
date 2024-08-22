import TrendsSidebar from "./TrendsSidebar";
import styles from "../../app/styles/layout.module.css"
import { ContentMainPageProps } from "@/interfaces/contentMainPageProps";

export default function ContentMainPage({ title, children, isContenMore, component }: ContentMainPageProps) {
    return (
        <main className={styles.containerMainPage}>
            <div className={styles.containerMainContent}>
                {isContenMore && (
                    component
                )}
                <div className={styles.containerTitle}>
                    <h1 className={styles.title}>{title}</h1>
                </div>
                {children}
            </div>
            <TrendsSidebar />
        </main>
    )
}

