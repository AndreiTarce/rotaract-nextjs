'use client'

import { AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

export default function AnimatePresenceWrapper(props: { children: ReactNode }) {
    return <AnimatePresence initial={false}>{props.children}</AnimatePresence>
}
