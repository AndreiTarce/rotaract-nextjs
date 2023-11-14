'use client'
import { LazyMotion, domAnimation } from 'framer-motion'
import { Next13ProgressBar } from 'next13-progressbar'
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <LazyMotion features={domAnimation}>{children}</LazyMotion>
            </QueryClientProvider>
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
