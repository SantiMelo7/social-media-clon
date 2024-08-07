import { validateRequest } from "@/auth"
import { redirect } from "next/navigation"
import SessionProvider from "../(main)/SessionProvider"
import React from "react";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await validateRequest()
  if (session?.user) redirect("/login")
  return <SessionProvider value={session}>{children}</SessionProvider>
}