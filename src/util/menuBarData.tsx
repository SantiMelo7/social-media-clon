import { Bell, Bookmark, Home, MessageCircle } from "lucide-react"

export const menuBarData = [
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
        icon: <Bell />
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