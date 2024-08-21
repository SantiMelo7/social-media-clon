"use client"

import Loading from "@/app/loading"
import useInitializeChatClient from "./useInitializeChatClient"
import { Chat } from "stream-chat-react"
import ChatSideBar from "./ChatSidebar"
import ChatChannel from "./ChatChannel"
import { useTheme } from "next-themes"
import { useState } from "react"

export default function ChatContent() {
    const chatClient = useInitializeChatClient()
    const [sideBarOpen, setSideBarOpen] = useState(false)
    const { resolvedTheme } = useTheme()
    if (!chatClient) {
        return <Loading />
    }

    return (
        <main className="relative w-full overflow-hidden rounded-2xl bg-card shadow-sm">
            <div className="absolute bottom-0 top-0 flex w-full">
                <Chat client={chatClient} theme={resolvedTheme === "dark" ? "str-chat__theme-dark" : "str-chat__theme-light"}>
                    <ChatSideBar open={sideBarOpen} openSidebar={() => setSideBarOpen(false)} />
                    <ChatChannel open={!sideBarOpen} openSidebar={() => setSideBarOpen(true)} />
                </Chat>
            </div>
        </main>
    )
}