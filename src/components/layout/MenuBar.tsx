import { menuBarData } from "@/util/menuBarData"
import { ClassNameProps } from "@/interfaces/classNameProps"
import { validateRequest } from "@/auth"
import prisma from "@/lib/prisma"
import NotificationsButton from "../../app/(main)/notifications/NotificationsButton"
import ButtonNavBar from "@/components/layout/ButtonNavBar"
import NotificationsMessages from "../../app/(main)/messages/NotificationsMessages"
import streamServerClient from "@/lib/stream"
import Links from "@/components/layout/Links"
import { FileEdit } from "lucide-react"

export default async function MenuBar({ className }: ClassNameProps) {

    const { user } = await validateRequest()
    if (!user) return null

    const [unreadNotificationCount, unreadMessagesCount] = await Promise.all([
        prisma.notification.count({
            where: {
                recipientId: user.id,
                read: false
            }
        }),
        (await streamServerClient.getUnreadCount(user.id)).total_unread_count
    ])

    const data = menuBarData(unreadNotificationCount, unreadMessagesCount)
    const filteredData = unreadNotificationCount !== null && unreadMessagesCount !== null ? data : [data[0], data[3], data[4]];

    return (
        <div className={className}>
            {filteredData.map((text, index) => (
                <div key={text.key}>
                    {index === 1 && unreadNotificationCount !== null ? (
                        <NotificationsButton initialState={{ unreadCount: unreadNotificationCount }} />
                    ) : index === 2 && unreadMessagesCount !== null ? (
                        <NotificationsMessages initialState={{ unreadCount: unreadMessagesCount }} />
                    ) : (
                        <ButtonNavBar title={text.title} url={text.href}>
                            {text.icon}
                        </ButtonNavBar>
                    )}
                </div>
            ))}
            <Links className="ml-2 sm:ml-4 block lg:hidden" url="/feed">
                <FileEdit />
            </Links>
        </div>
    )
}