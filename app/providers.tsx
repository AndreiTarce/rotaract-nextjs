'use client'
import { LazyMotion, domAnimation } from 'framer-motion'
import { Next13ProgressBar } from 'next13-progressbar'
import React from 'react'

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <LazyMotion features={domAnimation}>{children}</LazyMotion>
            <Next13ProgressBar
                height="4px"
                color="#d41367"
                options={{ showSpinner: false }}
                showOnShallow
            />
        </>
    )
}

export default Providers
