"use server"

import { postSchema } from '@/lib/validation';
import { validateRequest } from '../../../auth';
import prisma from '@/lib/prisma';
import { getPostDataInclude } from '@/lib/types';

export async function submitPost(input: string) {
    const { user } = await validateRequest()
    if (!user) throw new Error("Lo sentimos, no has iniciado sesión, no tienes la autorización")
    const { content } = postSchema.parse({ content: input })
    const newPost = await prisma.post.create({
        data: {
            content,
            userId: user.id
        },
        include: getPostDataInclude(user.id)
    })
    return newPost
}