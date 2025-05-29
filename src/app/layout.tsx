import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import { ClerkProvider } from "@clerk/nextjs"
import Navbar from "@/components/Navbar"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Password Manager",
  description: "Securely manage your passwords and credit cards",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <Navbar/>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
            <Toaster richColors position="top-right" />
        </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
