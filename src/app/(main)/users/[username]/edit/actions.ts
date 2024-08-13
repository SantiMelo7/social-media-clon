"use server";

import { validateRequest } from '@/auth';
import prisma from '@/lib/prisma';
import { getUserDataSelect } from '@/lib/types';
import { UpdateUserProfile, updateUserProfileSchema } from '@/lib/validation';

export async function updateUserProfile(values: UpdateUserProfile) {
    const validateValues = updateUserProfileSchema.parse(values)

    const { user } = await validateRequest()
    if (!user) throw new Error("Unathorized")

    const updateUser = await prisma.user.update({
        where: { id: user.id },
        data: validateValues,
        select: getUserDataSelect(user.id)
    })

    return updateUser
}