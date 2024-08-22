import { Button } from "@/components/ui/button"
import { CustomChannelHeaderProps } from "@/interfaces/chat"
import { Menu } from "lucide-react"
import { ChannelHeader } from "stream-chat-react"
import styles from "../../../app/styles/messages.module.css"

export default function CustomChannelHeader({ openSidebar, ...props }: CustomChannelHeaderProps) {
    return (
        <div className={styles.containerHeader}>
            <div className={styles.containerButton}>
                <Button variant="defaultNotBg" onClick={openSidebar}>
                    <Menu className={styles.buttonClick} />
                </Button>
                <ChannelHeader {...props} />
            </div>
        </div>
    )
}