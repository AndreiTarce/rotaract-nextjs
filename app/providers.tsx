'use client'
import { Next13ProgressBar } from 'next13-progressbar'
import React, { createContext, useState } from 'react'

import { Dispatch, SetStateAction } from 'react'

type LanguageContextType = {
    language: string
    setLanguage: Dispatch<SetStateAction<string>>
}

export const LanguageContext = createContext<LanguageContextType | null>(null)

const Providers = ({ children }: { children: React.ReactNode }) => {
    const [language, setLanguage] = useState('ro')
    return (
        <LanguageContext.Provider
            value={{ language: language, setLanguage: setLanguage }}
        >
            {children}
            <Next13ProgressBar
                height="4px"
                color="#d41367"
                options={{ showSpinner: false }}
                showOnShallow
            />
        </LanguageContext.Provider>
    )
}

export default Providers
