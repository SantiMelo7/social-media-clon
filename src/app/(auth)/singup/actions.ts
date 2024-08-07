"use server"

import { lucia } from "@/auth";
import prisma from "@/lib/prisma";
import { SingUp, singUpSchema } from "@/lib/validation";
import { hash } from "argon2";
import { generateIdFromEntropySize } from "lucia";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function singUp(
    crendetials: SingUp
): Promise<{ error: string }> {
    console.log(crendetials);
    try {
        const { username, email, password } = singUpSchema.parse(crendetials)
        const passwordHash = await hash(password, {
            memoryCost: 19456,
            timeCost: 2,
            parallelism: 1,
        })
        const userId = generateIdFromEntropySize(10)
        const existingUsername = await prisma.user.findFirst({
            where: {
                username: {
                    equals: username,
                    mode: "insensitive"
                }
            }
        })
        if (existingUsername) {
            return {
                error: "Username alredy taken"
            }
        }
        const existingEmail = await prisma.user.findFirst({
            where: {
                email: {
                    equals: email,
                    mode: "insensitive"
                }
            }
        })
        if (existingEmail) {
            return {
                error: "Email alredy taken"
            }
        }
        await prisma.user.create({
            data: {
                id: userId,
                username,
                displayName: username,
                email,
                password: passwordHash,
            }
        })
        const session = await lucia.createSession(userId, {})
        const sessionCookkie = lucia.createSessionCookie(session.id)
        cookies().set(
            sessionCookkie.name,
            sessionCookkie.value,
            sessionCookkie.attributes,
        )
        return redirect("/")
    } catch (error) {
        if (isRedirectError(error)) throw error;
        return {
            error: "Something went wrong. Please try again."
        }
    }
}