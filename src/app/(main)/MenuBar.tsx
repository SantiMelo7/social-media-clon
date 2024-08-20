import { menuBarData } from "@/util/menuBarData"
import { ClassNameProps } from "@/interfaces/classNameProps"
import { validateRequest } from "@/auth"
import prisma from "@/lib/prisma"
import NotificationsButtons from "./NotificationsButtons"
import ButtonNavBar from "@/components/layout/ButonnNavBar"

export default async function MenuBar({ className }: ClassNameProps) {
    const { user } = await validateRequest()
    if (!user) return null

    const unreadNotificationCount = await prisma.notification.count({
        where: {
            recipientId: user.id,
            read: false
        }
    })
    const data = menuBarData(unreadNotificationCount)
    const filteredData = unreadNotificationCount !== null ? data : [data[0], data[2], data[3]];

    return (
        <div className={className}>
            {filteredData.map((text, index) => (
                <div key={text.key}>
                    {index === 1 && unreadNotificationCount !== null ? (
                        <NotificationsButtons initialState={{ unreadCount: unreadNotificationCount }} />
                    ) : (
                        <ButtonNavBar title={text.title} url={text.href}>
                            {text.icon}
                        </ButtonNavBar>
                    )}
                </div>
            ))}
        </div>
    )
}