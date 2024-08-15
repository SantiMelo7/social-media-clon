import TrendsSidebar from "@/components/layout/TrendsSidebar"
import { Metadata } from "next"
import BookMarksFeed from "./BookMarksFeed"

export const metadata: Metadata = {
    title: "Bookmarks"
}

export default async function PageBoorkMarks() {
    return (
        <main className="flex w-full min-w-0 gap-5">
            <div className="w-full min-w-0 space-y-5">
                <div className="rounded-2xl bg-card p-5 shadow-sm">
                    <h1 className="text-center text-2xl font-bold">BookMarks</h1>
                </div>
                <BookMarksFeed />
            </div>
            <TrendsSidebar />
        </main>
    )
}

