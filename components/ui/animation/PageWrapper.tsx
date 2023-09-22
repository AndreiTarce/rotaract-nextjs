'use client'
import { usePathname } from 'next/navigation'

import { motion } from 'framer-motion'

const PageWrapper = ({
    children,
}: {
    children: React.ReactNode
    className?: string
}) => {
    const path = usePathname()
    return (
        <motion.div
            key={path}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 300 }}
        >
            {children}
        </motion.div>
    )
}

export default PageWrapper
