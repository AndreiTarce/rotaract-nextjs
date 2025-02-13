'use client';

import { AnimatePresence } from 'motion/react';
import { ReactNode } from 'react';

export default function AnimatePresenceWrapper(props: { children: ReactNode }) {
    return <AnimatePresence initial={false}>{props.children}</AnimatePresence>;
}
