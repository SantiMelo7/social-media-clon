"use server"

import { postSchema } from '@/lib/validation';
import { validateRequest } from '../../../auth';
import prisma from '@/lib/prisma';
import { getPostDataInclude } from '@/lib/types';

export async function submitPost(input: {
    content: string;
    mediaIds: string[]
}) {
    const { user } = await validateRequest()
    if (!user) throw new Error("Lo sentimos, no has iniciado sesión, no tienes la autorización")
    const { content, mediaIds } = postSchema.parse(input)
    const newPost = await prisma.post.create({
        data: {
            content,
            userId: user.id,
            attachments: {
                connect: mediaIds.map((id) => ({ id }))
            }
        },
        include: getPostDataInclude(user.id)
    })
    return newPost
}