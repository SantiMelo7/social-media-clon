import { validateRequest } from "@/auth"
import prisma from "@/lib/prisma"
import { getUserDataSelect } from "@/lib/types"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest,
    { params: { username } }: { params: { username: string } }
) {
    console.log(req);
    try {
        const { user } = await validateRequest()
        if (!user) {
            return Response.json({ error: "Unauthorized" }, { status: 401 })
        }
        const userInfo = await prisma.user.findFirst({
            where: {
                username: {
                    mode: "insensitive",
                    equals: username
                }
            },
            select: getUserDataSelect(user.id)
        })

        if (!userInfo) {
            return Response.json({ error: "User not found" }, { status: 404 })
        }
        return Response.json(userInfo)
    } catch (error) {
        console.log(error);
        return Response.json({ error: "Internal server error" }, { status: 500 })
    }
}
