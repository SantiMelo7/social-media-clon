"use server"

import { createComments } from '@/lib/validation';
import { validateRequest } from '../../../auth';
import prisma from '@/lib/prisma';
import { getCommentsDataInclude, PostData } from '@/lib/types';

export async function submitComment({ post, content }: { post: PostData, content: string }) {

    const { user } = await validateRequest()
    if (!user) throw new Error("Lo sentimos, no has iniciado sesión, no tienes la autorización")

    const { content: contentValidate, } = createComments.parse({ content })

    const [newComment] = await prisma.$transaction([
        prisma.comment.create({
            data: {
                content: contentValidate,
                postId: post.id,
                userId: user.id,
            },
            include: getCommentsDataInclude(user.id)
        }),
        ...(post.user.id !== user.id ? [
            prisma.notification.create({
                data: {
                    issuerId: user.id,
                    recipientId: post.user.id,
                    postId: post.id,
                    type: "COMMENT",
                }
            })
        ] : [])
    ])

    return newComment
}

export async function deleteComment(id: string) {

    const { user } = await validateRequest()
    if (!user) throw new Error("Lo sentimos, no has iniciado sesión, no tienes la autorización")

    const comment = await prisma.comment.findUnique({
        where: { id },
    })

    if (!comment) throw new Error("Comment not found")
    if (comment.userId !== user.id) throw new Error("Unauthorized")

    const deleteComment = await prisma.comment.delete({
        where: { id },
        include: getCommentsDataInclude(user.id)
    })

    return deleteComment
}