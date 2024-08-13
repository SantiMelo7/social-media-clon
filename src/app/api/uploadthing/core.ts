import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { createUploadthing, FileRouter } from "uploadthing/next"
import { UTApi } from "uploadthing/server";

const f = createUploadthing();

export const fileRoute = {
    avatar: f({
        image: { maxFileSize: "512KB" }
    }).middleware(async () => {
        const { user } = await validateRequest()
        if (!user) throw new Error("Unauthorized")
        return { user }
    }).onUploadComplete(async ({ metadata, file }) => {
        const oldAvatarUrl = metadata.user.avatarUrl

        if (oldAvatarUrl) {
            const key = oldAvatarUrl.split(
                `/a/${process.env.UPLOADTHING_APP_ID}/`
            )[1]
            await new UTApi().deleteFiles(key)
        }

        const newAvatarUlr = file.url.replace(
            "/f/", `/a/${process.env.UPLOADTHING_APP_ID}/`
        )
        await prisma.user.update({
            where: {
                id: metadata.user.id,
            },
            data: {
                avatarUrl: newAvatarUlr
            }
        })
        return { avatarUrl: newAvatarUlr }
    })

} satisfies FileRouter

export type AppFileRoute = typeof fileRoute