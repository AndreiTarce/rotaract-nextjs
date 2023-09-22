import { ThemeProvider } from '@/components/theme-provider'
import { Navigation } from '@/components/ui/navigation/Navigation'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './providers'
import Footer from '@/components/ui/footer/Footer'
import '@fortawesome/fontawesome-svg-core/styles.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Rotaract Visio Cluj-Napoca',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider attribute="class" defaultTheme="dark">
                    <Providers>
                        <Navigation />
                        {children}
                        <Analytics />
                    </Providers>
                </ThemeProvider>
            </body>
            <footer>
                <Footer />
            </footer>
        </html>
    )
}
