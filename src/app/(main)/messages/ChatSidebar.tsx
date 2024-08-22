import { ChannelList, ChannelPreviewMessenger, ChannelPreviewUIComponentProps, useChatContext } from "stream-chat-react";
import { useSession } from "../SessionProvider";
import { getAdditionalChannelSearchProps, getFilters, getOptions } from "@/util/configMessage";
import { cn } from "@/lib/utils";
import { useCallback, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { MenuHeaderSideBar } from "./MenuHeaderSideBar";
import { ChatProps } from "@/interfaces/chat";
import styles from "../../../app/styles/messages.module.css"

export default function ChatSideBar({ open, openSidebar: onClose }: ChatProps) {
    const { user } = useSession()
    const filters = getFilters(user)
    const options = getOptions();
    const additionalChannelSearchProps = getAdditionalChannelSearchProps(user);

    const ChannelPreviewCustom = useCallback((props: ChannelPreviewUIComponentProps) => (
        <ChannelPreviewMessenger {...props}
            onSelect={() => {
                props.setActiveChannel?.(props.channel, props.watchers)
                onClose()
            }}
        />
    ), [onClose])

    const queryClient = useQueryClient()

    const { channel } = useChatContext()

    useEffect(() => {
        if (channel?.id) {
            queryClient.invalidateQueries({ queryKey: ["unread-messages-count"] })
        }
    }, [channel?.id])

    return (
        <div className={cn(styles.containerChatSideBar, !open ? "block" : "hidden")}>
            <MenuHeaderSideBar onClose={onClose} />
            <ChannelList filters={filters} showChannelSearch options={options} sort={{ last_message_at: -1 }}
                additionalChannelSearchProps={additionalChannelSearchProps} Preview={ChannelPreviewCustom}
            />
        </div>
    )
}
