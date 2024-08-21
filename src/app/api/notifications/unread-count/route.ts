import prisma from '@/lib/prisma';
import { validateRequest } from '../../../../auth';
import { NotificationsCount } from '@/lib/types';

export async function GET() {
    try {
        const { user } = await validateRequest()
        if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 })

        const noificationsCount = await prisma.notification.count({
            where: {
                recipientId: user.id,
                read: false
            }
        })
        const data: NotificationsCount = {
            unreadCount: noificationsCount
        }

        return Response.json(data)
    } catch (error) {
        console.log(error);
        return Response.json({ error: "Internal server error" }, { status: 500 })
    }
}