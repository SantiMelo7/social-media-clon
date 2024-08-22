import { Metadata } from "next"
import NotificationsFeed from "./NotificationsFeed"
import ContentMainPage from "@/components/layout/ContentMainPage"

export const metadata: Metadata = {
    title: "Notifications"
}

export default async function PageBoorkMarks() {
    return (
        <ContentMainPage title="Notifications">
            <NotificationsFeed />
        </ContentMainPage>
    )
}