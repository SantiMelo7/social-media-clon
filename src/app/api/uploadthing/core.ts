import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { createUploadthing, FileRouter } from "uploadthing/next"
import { UploadThingError, UTApi } from "uploadthing/server";

const f = createUploadthing();

const keyUrl = `/a/${process.env.UPLOADTHING_APP_ID}/`
const keyUrlF = (file: any) => {
    return file.url.replace(
        "/f/", keyUrl
    )
}

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
            const key = oldAvatarUrl.split(keyUrl)[1]
            await new UTApi().deleteFiles(key)
        }
        const newAvatarUlr = file.url.replace("/f/", keyUrl)
        await prisma.user.update({
            where: {
                id: metadata.user.id,
            },
            data: {
                avatarUrl: newAvatarUlr
            }
        })
        return { avatarUrl: newAvatarUlr }
    }),
    attachment: f({
        image: { maxFileSize: "4MB", maxFileCount: 5 },
        video: { maxFileSize: "64MB", maxFileCount: 5 },
    })
        .middleware(async () => {
            const { user } = await validateRequest();

            if (!user) throw new UploadThingError("Unauthorized");

            return {};
        })
        .onUploadComplete(async ({ file }) => {
            const media = await prisma.media.create({
                data: {
                    url: file.url.replace("/f/", `/a/${process.env.UPLOADTHING_APP_ID}/`),
                    type: file.type.startsWith("image") ? "IMAGE" : "VIDEO",
                },
            });

            return { mediaId: media.id };
        }),
} satisfies FileRouter

export type AppFileRoute = typeof fileRoute