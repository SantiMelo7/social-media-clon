import { validateRequest } from "@/auth"
import { redirect } from "next/navigation"
import SessionProvider from "./SessionProvider"
import Navbar from "./Navbar"
import React from "react"
import MenuBar from "./MenuBar"
import styles from "../styles/main.module.css"

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await validateRequest()
    if (!session.user) redirect("/login")
    return (
        <SessionProvider value={session}>
            <div className={styles.containerRoot}>
                <Navbar />
                <div className={styles.containerMain}>
                    <MenuBar className={styles.menuBarLayout} />
                    {children}
                </div>
            </div>
        </SessionProvider>
    )
}