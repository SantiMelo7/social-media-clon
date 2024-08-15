import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getPostDataInclude, PostsPage } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const cursor = req.nextUrl.searchParams.get("cursor") || undefined
        const pageSize = 10
        const { user } = await validateRequest()
        if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 })
        const bookmark = await prisma.bookmark.findMany({
            where: {
                userId: user.id
            },
            include: {
                post: {
                    include: getPostDataInclude(user.id)
                }
            },
            orderBy: { createAd: "desc" },
            take: pageSize + 1,
            cursor: cursor ? { id: cursor } : undefined
        })
        const nextCursor = bookmark.length > pageSize ? bookmark[pageSize].id : null
        const data: PostsPage = {
            posts: bookmark.slice(0, pageSize).map((book) => book.post),
            nextCursor,
        }
        return Response.json(data)
    } catch (error) {
        console.log(error);
        return Response.json({ error: "Internal server error" }, { status: 500 })
    }
}