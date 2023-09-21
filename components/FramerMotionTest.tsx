'use client'
import { motion } from 'framer-motion'
import { Card, CardContent } from './ui/card'

export default function FramerMotionTest() {
    return (
        <Card className="mx-16">
            <CardContent className="flex flex-col gap-8">
                {Array.from(Array(10).keys()).map((element, index) => (
                    <motion.div
                        key={index}
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, translateX: -150 }}
                        whileInView={{ opacity: 1, translateX: 0 }}
                        className="text-5xl h-16 w-16 bg-red-500"
                    >
                        asd
                    </motion.div>
                ))}
            </CardContent>
        </Card>
    )
}
