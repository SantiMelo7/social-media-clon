"use server"

import { createComments } from '@/lib/validation';
import { validateRequest } from '../../../auth';
import prisma from '@/lib/prisma';
import { getCommentsDataInclude, PostData } from '@/lib/types';

export async function submitComment({ post, content }: { post: PostData, content: string }) {
    const { user } = await validateRequest()
    if (!user) throw new Error("Lo sentimos, no has iniciado sesión, no tienes la autorización")
    const { content: contentValidate, } = createComments.parse({ content })
    const newComment = await prisma.comment.create({
        data: {
            content: contentValidate,
            postId: post.id,
            userId: user.id,
        },
        include: getCommentsDataInclude(user.id)
    })
    return newComment
}

export async function deleteComment(id: string) {
    const { user } = await validateRequest()
    if (!user) throw new Error("Lo sentimos, no has iniciado sesión, no tienes la autorización")

    const deleteComment = await prisma.comment.findUnique({
        where: { id },
    })

    if (!deleteComment) throw new Error("Comment not found")

    if (deleteComment.userId !== user.id) throw new Error("Unauthorized")

    await prisma.comment.delete({
        where: { id },
        include: getCommentsDataInclude(user.id)
    })

    return deleteComment

}