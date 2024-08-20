import { NotificationsCount } from "@/lib/types"
import { Bell, Bookmark, Home, MessageCircle } from "lucide-react"
import { ReactElement } from "react";

export const menuBarData = (unreadNotificationCount: number): Array<{ key: number; title: string; href: string; icon: ReactElement } | (NotificationsCount & { key: number; title: string; href: string; icon: ReactElement })> => [
    {
        key: 1,
        title: "Home",
        href: "/",
        icon: <Home />
    },
    {
        key: 2,
        title: "Notification",
        href: "/notifications",
        icon: <Bell />,
        unreadCount: unreadNotificationCount,
    },
    {
        key: 3,
        title: "Messages",
        href: "/messages",
        icon: <MessageCircle />
    },
    {
        key: 4,
        title: "BookMarks",
        href: "/bookmarks",
        icon: <Bookmark />
    }
]
