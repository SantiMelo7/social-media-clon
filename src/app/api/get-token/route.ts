import { validateRequest } from "@/auth";
import streamServerClient from "@/lib/stream";

export async function GET() {
    try {
        const { user } = await validateRequest()
        if (!user) {
            return Response.json({ error: "Unathorized" }, { status: 401 })
        }

        const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60
        const issueAt = Math.floor(Date.now() / 1000) - 60
        const token = streamServerClient.createToken(
            user?.id,
            expirationTime,
            issueAt,
        )

        return Response.json({ token })
    } catch (error) {
        console.log(error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 })
    }
}