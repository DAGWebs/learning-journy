import { cn } from '@/lib/utils'
import './globals.css'
import type { Metadata } from 'next'
import { Lexend } from 'next/font/google'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from '@/components/Providers'
import { Toaster } from '@/components/ui/toaster'

const inter = Lexend({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mentor Minds AI',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'antialiased min-h-screen pt-16')}><ThemeProvider><Navbar />{children}<Toaster /></ThemeProvider></body>
    </html>
  )
}
