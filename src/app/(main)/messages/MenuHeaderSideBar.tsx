"use client"

import { Button } from "@/components/ui/button"
import { MailPlus, X } from "lucide-react"
import NewChatDialog from "./NewChatDialog"
import { useState } from "react"
import { MenuHeaderSideBarProps } from "@/interfaces/chat"
import styles from "../../../app/styles/messages.module.css"

export function MenuHeaderSideBar({ onClose }: MenuHeaderSideBarProps) {
    const [showNewChatDialog, setShowNewChatDialog] = useState(false)
    return (
        <>
            <div className="flex justify-center items-center gap-3 p-2">
                <div className="h-full p-2">
                    <Button variant="defaultNotBg" onClick={onClose}>
                        <X className={styles.buttonClick} />
                    </Button>
                </div>
                <h1 className="text-xl font-bold me-auto md:ms-2">Messages</h1>
                <Button variant="defaultNotBg" onClick={() => setShowNewChatDialog(true)} title="Start new chat">
                    <MailPlus className={styles.buttonClick} />
                </Button>
            </div>
            {showNewChatDialog && (
                <NewChatDialog
                    open={showNewChatDialog}
                    onOpenChange={setShowNewChatDialog}
                    onChatCreated={() => {
                        setShowNewChatDialog(false)
                        onClose()
                    }}
                />
            )}
        </>
    )
}