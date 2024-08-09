"use server"

import { validateRequest } from "@/auth"
import prisma from "@/lib/prisma"
import { postDataInclude } from "@/lib/types"

export async function deletePost(id: string) {
    const { user } = await validateRequest()

    if (!user) throw new Error("Unauthorized")
    const post = await prisma.post.findUnique({
        where: { id }
    })
    if (!post) throw new Error("Post no found")

    if (post.userId !== user.id) throw new Error("Unauthorized")

    const deletePost = await prisma.post.delete({
        where: { id },
        include: postDataInclude
    })

    return deletePost
}