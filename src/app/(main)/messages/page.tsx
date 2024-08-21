import { Metadata } from "next"
import ChatContent from "./Chat"

export const metadata: Metadata = {
    title: "Messages"
}

export default async function PageBoorkMarks() {
    return (
        <ChatContent />
    )
}