'use client';
import { cn } from '@/lib/utils';
import { motion, useScroll, useSpring } from 'motion/react';

interface ScrollProgressProps {
    className?: string;
}

export function ScrollProgress({ className }: ScrollProgressProps) {
    const { scrollYProgress } = useScroll();

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 200,
        damping: 50,
        restDelta: 0.001,
    });

    return (
        <motion.div
            className={cn(
                'from-rotaract-cranberry fixed inset-x-0 z-40 h-1 origin-left bg-linear-to-r to-rose-500',
                className
            )}
            style={{
                scaleX,
            }}
        />
    );
}
