"use client";

import { NotificationsCount } from "@/lib/types";
import { Bell } from "lucide-react";
import useNotificationsButtons from "@/hooks/useNotificationsButtons";
import ButtonContent from "@/components/layout/ButtonContent";

export interface NotificationsButtonsProps {
    initialState: NotificationsCount
}

export default function NotificationsButton({ initialState }: NotificationsButtonsProps) {

    const url = "/api/notifications/unread-count"
    const data = useNotificationsButtons<NotificationsCount>(url, "unread-notifications-count", initialState)

    return (
        <ButtonContent
            title="Notifications" url="notifications"
            icon={<Bell />} data={{ unreadCount: data?.unreadCount || 0 }}
        />
    )
}