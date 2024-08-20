"use client"

import Loading from "@/app/loading"
import useInitializeChatClient from "./useInitializeChatClient"
import { Chat } from "stream-chat-react"
import ChatSideBar from "./ChatSidebar"
import ChatChannel from "./ChatChannel"

export default function ChatContent() {
    const chatClient = useInitializeChatClient()

    if (!chatClient) {
        return <Loading />
    }

    return (
        <Chat client={chatClient}>
            <ChatSideBar />
            <ChatChannel />
        </Chat>
    )

}