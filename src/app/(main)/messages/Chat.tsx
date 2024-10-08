"use client"

import Loading from "@/app/loading"
import useInitializeChatClient from "./useInitializeChatClient"
import { Chat } from "stream-chat-react"
import ChatSideBar from "./ChatSidebar"
import ChatChannel from "./ChatChannel"
import { useTheme } from "next-themes"
import { useState } from "react"
import styles from "../../../app/styles/messages.module.css"

export default function ChatContent() {

    const chatClient = useInitializeChatClient()
    const [sideBarOpen, setSideBarOpen] = useState(false)
    const { resolvedTheme } = useTheme()
    if (!chatClient) {
        return <Loading />
    }

    return (
        <main className={styles.containerMainChat}>
            <div className={styles.containerChatContent}>
                <Chat client={chatClient} theme={resolvedTheme === "dark" ? "str-chat__theme-dark" : "str-chat__theme-light"}>
                    <ChatSideBar open={sideBarOpen} openSidebar={() => setSideBarOpen(true)} />
                    <ChatChannel open={!sideBarOpen} openSidebar={() => setSideBarOpen(false)} />
                </Chat>
            </div>
        </main>
    )
}