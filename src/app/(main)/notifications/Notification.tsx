"use client"

import UserAvatar from "@/components/users/UserAvatar";
import { NotificationProps } from "@/interfaces/notificationProps";
import { cn } from "@/lib/utils";
import { getNotificationTypeMap } from "@/util/notificationTypeMap";
import Link from "next/link";

export default function Notification({ notification }: NotificationProps) {
    const notificationTypeMap = getNotificationTypeMap(notification);
    const { message, icon, href } = notificationTypeMap[notification.type]

    return (
        <Link href={href} className="block">
            <article
                className={cn("flex gap-3 rounded-xl bg-card p-5 shadow-sm transition-colors hover:bg-card/70",
                    !notification.read && "bg-primary/10"
                )}
            >
                <div className="my-1">{icon}</div>
                <div className="space-y-3">
                    <div className="flex items-center gap-x-3">
                        <UserAvatar avatarUrl={notification.issuer.avatarUrl} size={36} />
                        <span className="font-extrabold text-primary text-lg">{notification.issuer.displayName}</span>
                    </div>
                    <div>
                        <span>{message}</span>
                    </div>
                    {notification.post && (
                        <div className="line-clamp-1 whitespace-pre-line text-muted-foreground">{notification.post.content}</div>
                    )}
                </div>
            </article>
        </Link>
    )
}