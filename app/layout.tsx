import './globals.css'
import type { Metadata } from 'next'
import { Inter, Montserrat, Poppins, Roboto } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Navigation } from '@/components/ui/navigation/Navigation'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto({ subsets: ['latin'], weight: ["400", "500", "700", "900"] })
const montserrat = Montserrat({ subsets: ['latin'] })
const poppins = Poppins({ subsets: ['latin'], weight: ["400", "500", "700", "900"] })

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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Providers>
            <Navigation />
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
