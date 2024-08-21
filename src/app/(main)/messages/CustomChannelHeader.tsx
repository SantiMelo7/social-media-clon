import { Button } from "@/components/ui/button"
import { CustomChannelHeaderProps } from "@/interfaces/chat"
import { Menu } from "lucide-react"
import { ChannelHeader } from "stream-chat-react"
import styles from "../../../app/styles/messages.module.css"

export default function CustomChannelHeader({ openSidebar, ...props }: CustomChannelHeaderProps) {
    return (
        <div className="flex items-center gap-2">
            <div className="h-full pl-5 flex flex-row justify-center items-center gap-x-7">
                <Button variant="defaultNotBg" onClick={openSidebar}>
                    <Menu className={styles.buttonClick} />
                </Button>
                <ChannelHeader {...props} />
            </div>
        </div>
    )
}