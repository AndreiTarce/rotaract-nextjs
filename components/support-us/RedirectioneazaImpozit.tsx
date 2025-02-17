'use client';
import { cn } from '@/lib/utils';
import Script from 'next/script';
import { useState } from 'react';
import { ShimmerButton } from '../magicui/shimmer-button';
import ColourfulText from '../ui/colourful-text';
import { Spotlight } from '../ui/spotlight-new';

export default function RedirectioneazaImpozit() {
    const [showTaxRedirectForm, setShowTaxRedirectForm] = useState(false);

    return (
        <div
            className={cn('relative mb-4 max-h-screen rounded-lg', {
                ['overflow-hidden']: !showTaxRedirectForm,
                ['overflow-auto']: showTaxRedirectForm,
            })}
        >
            {showTaxRedirectForm ? (
                <div className="mt-4 h-full max-h-[75vh] overflow-auto">
                    <div className="f230ro-formular"></div>
                    <Script src="https://formular230.ro/share/209dfd2a35"></Script>
                </div>
            ) : (
                <>
                    <Spotlight />
                    <div className="relative mx-auto flex w-full flex-col items-center py-8">
                        <h1 className="bg-opacity-50 from-foreground bg-linear-to-b to-slate-700 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl dark:from-neutral-50 dark:to-neutral-400">
                            <ColourfulText
                                text="Redirecționează"
                                className="border-none text-4xl md:text-8xl"
                            />
                            <br />
                            3.5% din impozit
                        </h1>
                        <p className="text-muted-foreground mx-auto mt-4 max-w-lg text-center text-base font-normal">
                            Dăruiește 3.5% din impozitul tău pe venit deja virat statului. Poți
                            depune Declarația 230 până pe 26 Mai 2025.
                        </p>
                        <ShimmerButton
                            className="mt-8 w-fit shadow-2xl"
                            shimmerColor={'#d41367'}
                            onClick={() => setShowTaxRedirectForm(true)}
                        >
                            <span className="text-background dark:text-foreground text-center text-sm leading-none font-medium tracking-tight whitespace-pre-wrap lg:text-lg">
                                Redirecționează acum
                            </span>
                        </ShimmerButton>
                    </div>
                </>
            )}
        </div>
    );
}
