import prisma from '@/lib/prisma';
import { validateRequest } from '../../../../auth';

export async function PATCH() {
    try {
        const { user } = await validateRequest()
        if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 })

        await prisma.notification.updateMany({
            where: {
                recipientId: user.id,
                read: false,
            },
            data: {
                read: true
            }
        })

        return new Response()

    } catch (error) {
        console.log(error);
        return Response.json({ error: "Internal server error" }, { status: 500 })
    }
}