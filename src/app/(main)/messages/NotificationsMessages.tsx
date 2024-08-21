"use client";

import { MessageCountinfo } from "@/lib/types";
import { MessageCircle } from "lucide-react";
import useNotificationsButtons from "@/hooks/useNotificationsButtons";
import ButtonContent from "@/components/layout/ButtonContent";

export interface NotificationsMessagesProps {
    initialState: MessageCountinfo
}

export default function NotificationsMessages({ initialState }: NotificationsMessagesProps) {
    const url = "/api/messages/unread-count"
    const data = useNotificationsButtons<MessageCountinfo>(url, "unread-messages-count", initialState)

    return (
        <ButtonContent
            title="Messages" url="messages"
            icon={<MessageCircle />} data={{ unreadCount: data?.unreadCount || 0 }}
        />
    )
}