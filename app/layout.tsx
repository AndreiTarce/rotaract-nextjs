import { ThemeProvider } from '@/components/theme-provider'
import Footer from '@/components/ui/footer/Footer'
import { Navigation } from '@/components/ui/navigation/Navigation'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Acasă | Rotaract Visio Cluj-Napoca',
    description: 'Clubul nostru a fost chartat în data de 12 octombrie 2013, sub îndrumarea clubului Rotary Visio Cluj-Napoca . Cu o istorie de implicare comunitară de peste un deceniu, ne străduim să aducem schimbări pozitive în orașul nostru și în lumea din jurul nostru. Misiunea noastră este de a inspira și mobiliza tinerii din Cluj-Napoca pentru a se implica activ în proiecte de voluntariat, dezvoltând astfel lideri viitori și promovând serviciul în comunitate.',
    keywords: ['rotaract', 'visio', 'cluj-napoca', 'charity', 'rotary', 'proiecte caritabile', 'caritate', 'district2241']
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
