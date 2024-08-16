import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { CommentsPage, getCommentsDataInclude } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, {
    params: { postId } }: { params: { postId: string } }
) {
    try {

        const { user: loggedInUser } = await validateRequest()
        if (!loggedInUser) {
            return Response.json({ error: "Unathorized" }, { status: 401 })
        }

        const cursor = req.nextUrl.searchParams.get("cursor") || undefined
        const pageSize = 10

        const comments = await prisma.comment.findMany({
            where: {
                postId
            },
            include: getCommentsDataInclude(loggedInUser.id),
            orderBy: { createAd: "asc" },
            take: -pageSize - 1,
            cursor: cursor ? { id: cursor } : undefined
        })

        if (!comments) {
            return Response.json({ error: "Comments not found" }, { status: 404 })
        }

        const previousCursor = comments.length > pageSize ? comments[0].id : null

        const data: CommentsPage = {
            comments: comments.length > pageSize ? comments.slice(1) : comments,
            previousCursor,

        }
        return Response.json(data)

    } catch (error) {
        console.log(error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
