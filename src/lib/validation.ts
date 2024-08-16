import { z } from 'zod'

const requiredString = z.string().trim().min(1, "Required")

export const singUpSchema = z.object({
    email: requiredString.email('Invalid email address'),
    username: requiredString.regex(
        /^[a-zA-Z0-9_-]+$/, "Only letters, numbers - and _ allowed"
    ),
    displayName: requiredString.regex(
        /^[a-zA-Z0-9_-]+$/, "Only letters, numbers - and _ allowed"
    ),
    password: requiredString.min(8, "Must be a least 8 characthers")
})

export type SingUp = z.infer<typeof singUpSchema>

export const loginSchema = z.object({
    displayName: requiredString,
    password: requiredString,
})

export type Login = z.infer<typeof loginSchema>

export const postSchema = z.object({
    content: requiredString,
    mediaIds: z.array(z.string()).max(5, "Cannot have more then 5 attachments")
})

export const updateUserProfileSchema = z.object({
    username: requiredString,
    displayName: requiredString,
    bio: z.string().max(100, "Must be at most 100 characters")
})

export type UpdateUserProfile = z.infer<typeof updateUserProfileSchema>

export const createComments = z.object({
    content: requiredString,
})