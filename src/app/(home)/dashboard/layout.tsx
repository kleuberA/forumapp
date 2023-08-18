import { NextAuthProvider } from '@/context/AuthContext'
import type { Metadata } from 'next'



export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'Generated by create next app',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body >
                <NextAuthProvider>
                    {children}
                </NextAuthProvider>
            </body>
        </html>
    )
}