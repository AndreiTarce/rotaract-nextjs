'use client'
import { AnimatePresence } from 'framer-motion'
import { Next13ProgressBar } from 'next13-progressbar'
import React from 'react'

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <AnimatePresence initial={false} mode="wait">
                {children}
                <Next13ProgressBar
                    height="4px"
                    color="#d41367"
                    options={{ showSpinner: false }}
                    showOnShallow
                />
            </AnimatePresence>
        </>
    )
}

export default Providers
