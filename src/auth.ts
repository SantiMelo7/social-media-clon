import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Lucia, Session } from "lucia";
import { User } from "lucia";
import { cache } from "react";
import { cookies } from 'next/headers'
import { Google } from "arctic"

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            secure: process.env.NODE_ENV === "production"
        }
    },
    getUserAttributes(data) {
        return {
            id: data.id,
            username: data.username,
            displayName: data.displayName,
            googleId: data.googleId,
            avatarUrl: data.avatarUrl,
        }
    }
})

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia
        DatabaseUserAttributes: DatabaseUserAttributes
    }
}

interface DatabaseUserAttributes {
    id: string;
    username: string;
    displayName: string;
    googleId: string;
    avatarUrl: string | null
}

export const google = new Google(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback/google`,
)

export const validateRequest = cache(
    async (): Promise<{ user: User, session: Session } | { user: null; session: null; }> => {
        const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
        if (!sessionId) {
            return {
                user: null, session: null
            }
        }
        const result = await lucia.validateSession(sessionId)
        try {
            if (result.user && result.session.fresh) {
                const duplicateSession = lucia.createSessionCookie(result.session.id)
                cookies().set(duplicateSession.name, duplicateSession.value, duplicateSession.attributes)
            }
            if (!result.session) {
                const valueSessionCokkie = lucia.createBlankSessionCookie()
                cookies().set(valueSessionCokkie.name, valueSessionCokkie.value, valueSessionCokkie.attributes)
            }
        } catch (error) {
            console.log(error);
        }
        return result
    },
)