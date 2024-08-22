import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import streamServerClient from "@/lib/stream";
import { createUploadthing, FileRouter } from "uploadthing/next"
import { UploadThingError, UTApi } from "uploadthing/server";

const f = createUploadthing();

const keyUrl = `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/`
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
            const key = oldAvatarUrl.split(
                `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/`,
            )[1];

            await new UTApi().deleteFiles(key);
        }

        const newAvatarUlr = keyUrlF(file)

        await Promise.all([
            prisma.user.update({
                where: {
                    id: metadata.user.id,
                },
                data: {
                    avatarUrl: newAvatarUlr
                }
            }),
            streamServerClient.partialUpdateUser({
                id: metadata.user.id,
                set: {
                    image: newAvatarUlr
                }
            })
        ])

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
                    url: keyUrlF(file),
                    type: file.type.startsWith("image") ? "IMAGE" : "VIDEO",
                },
            });

            return { mediaId: media.id };
        }),
} satisfies FileRouter

export type AppFileRoute = typeof fileRoute