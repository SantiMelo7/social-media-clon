"use server"

import prisma from "@/lib/prisma";
import { Login, loginSchema } from "@/lib/validation";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import { verify } from "argon2";
import { lucia } from "@/auth";
import { cookies } from "next/headers";

export async function login(
    credentials: Login
): Promise<{ error: string }> {
    try {
        const { displayName, password } = loginSchema.parse(credentials)
        const existingUser = await prisma.user.findFirst({
            where: {
                displayName: {
                    equals: displayName,
                    mode: "insensitive",
                },
            }
        })
        if (!existingUser || !existingUser.password) {
            return {
                error: "Incorrect displayName or password"
            }
        }
        const validationPassword = await verify(existingUser.password, password)
        if (!validationPassword) {
            return {
                error: "Incorrect displayName or password"
            }
        }
        const session = await lucia.createSession(existingUser.id, {})
        const sessionCookkie = lucia.createSessionCookie(session.id)
        cookies().set(
            sessionCookkie.name,
            sessionCookkie.value,
            sessionCookkie.attributes,
        )
        return redirect("/")
    } catch (error) {
        if (isRedirectError(error)) throw error;
        console.log(error);
        return {
            error: "Something went wrong. Please try again."
        }
    }
}