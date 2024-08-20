"use client";

import { NotificationsCount } from "@/lib/types";
import { Bell } from "lucide-react";
import { QueryKey, useQuery } from "@tanstack/react-query";
import kyInstance from "@/lib/ky";
import ButtonNavBar from "@/components/layout/ButonnNavBar";

export interface NotificationsButtonsProps {
    initialState: NotificationsCount
}

export default function NotificationsButtons({ initialState }: NotificationsButtonsProps) {

    const url = "/api/notifications/unread-count"
    const queryKey: QueryKey = ["unread-notifications-count"]

    const { data } = useQuery({
        queryKey,
        queryFn: () => kyInstance.get(url).json<NotificationsCount>(),
        initialData: initialState,
        refetchInterval: 60 * 1000
    })

    return (
        <ButtonNavBar title="Notifications" url="notifications">
            <div className="relative">
                <Bell />
                {!!data.unreadCount && (
                    <span className="bg-primary rounded-full absolute -right-2 text-white -top-1 tabular-nums px-1 font-medium text-xs">
                        {data.unreadCount}
                    </span>
                )}
            </div>
        </ButtonNavBar>
    )
}