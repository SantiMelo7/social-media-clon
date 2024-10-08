import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './styles/index.js'
import React from 'react'
import { ThemeProvider } from "next-themes"
import { Toaster } from '@/components/ui/toaster'
import ReactQueryProvider from './ReactQueryProvider'
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin"
import { extractRouterConfig } from 'uploadthing/server'
import { fileRoute } from './api/uploadthing/core'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Bugbook Clone',
    description: 'Generated by create next app',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <NextSSRPlugin routerConfig={extractRouterConfig(fileRoute)} />
                <ReactQueryProvider>
                    <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>{children}</ThemeProvider>
                    <Toaster />
                </ReactQueryProvider>
            </body>
        </html>
    )
}
