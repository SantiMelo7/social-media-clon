import prisma from "@/lib/prisma"
import { getUserDataSelect } from "@/lib/types"
import { notFound } from "next/navigation"
import { cache } from "react"

export const getUser = cache(async (username: string, loggedinUserId: string) => {
    const user = await prisma.user.findFirst({
        where: {
            username: {
                equals: username,
                mode: "insensitive"
            }
        },
        select: getUserDataSelect(loggedinUserId)
    })
    if (!user) notFound()
    return user
})