'use client'
import { usePathname } from 'next/navigation'

import { m } from 'framer-motion'

const PageWrapper = ({
    children,
}: {
    children: React.ReactNode
    className?: string
}) => {
    const path = usePathname()
    return (
        <m.div
            key={path}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 300 }}
        >
            {children}
        </m.div>
    )
}

export default PageWrapper
