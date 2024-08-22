import { Metadata } from "next"
import BookMarksFeed from "./BookMarksFeed"
import ContentMainPage from "@/components/layout/ContentMainPage"

export const metadata: Metadata = {
    title: "Bookmarks"
}

export default async function PageBoorkMarks() {
    return (
        <ContentMainPage title="BookMarks">
            <BookMarksFeed />
        </ContentMainPage>
    )
}

