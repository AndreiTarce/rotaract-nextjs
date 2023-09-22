'use client'
import { m } from 'framer-motion'

export default function SlideInWrapper(props: { children: React.ReactNode }) {
    return (
        <m.div
            transition={{ duration: 0.5 }}
            initial={{ opacity: 0, translateX: -150 }}
            whileInView={{
                opacity: 1,
                translateX: 0,
                transition: { ease: 'easeOut' },
            }}
        >
            {props.children}
        </m.div>
    )
}
