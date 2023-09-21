'use client'
import { motion } from 'framer-motion'

export default function SlideInWrapper(props: { children: React.ReactNode }) {
    return (
        <motion.div
            transition={{ duration: 0.5 }}
            initial={{ opacity: 0, translateX: -150 }}
            whileInView={{
                opacity: 1,
                translateX: 0,
                transition: { delay: 0.5 },
            }}
        >
            {props.children}
        </motion.div>
    )
}
