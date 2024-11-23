'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '../ui/collapsible';
import { Separator } from '../ui/separator';
import { CatrafusaleWorkshopRegistrationForm } from './CatrafusaleWorkshopRegistrationForm';

export default function CatrafusaleWorkshop() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Card className="mb-4 flex w-full grow flex-col rounded-lg border bg-gradient-to-tr from-[#ffe4d2] to-[#ee8984] shadow-md md:w-1/2">
            <CardHeader className="pb-4">
                <CardTitle className="text-5xl font-extrabold text-foreground dark:text-background max-md:text-5xl">
                    Workshop
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="mb-4 text-foreground dark:text-background">
                    Informatii despre workshop aici
                </p>
                <Separator className="mb-4" />
                <Collapsible
                    open={isOpen}
                    onOpenChange={() => setIsOpen(!isOpen)}
                    className="text-foreground dark:text-background"
                >
                    <CollapsibleTrigger
                        asChild
                        className="mb-4 hover:cursor-pointer"
                    >
                        <CardTitle className="flex items-center justify-between">
                            Către înregistrare
                            <ChevronDown
                                className={`h-4 w-4 transition-transform duration-200 ${
                                    isOpen ? 'rotate-180' : ''
                                }`}
                            />
                        </CardTitle>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <CatrafusaleWorkshopRegistrationForm productId="asd" />
                    </CollapsibleContent>
                </Collapsible>
            </CardContent>
        </Card>
    );
}
