'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Switch } from './switch'
import { Label } from './label'

const capitalizeFLetter = (string: string) => {
    return string[0].toUpperCase() + string.slice(1)
}

export function ModeToggle() {
    const { setTheme, theme } = useTheme()

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="end"
                    className="max-md:w-screen mt-3"
                >
                    <DropdownMenuItem
                        onClick={() => setTheme('light')}
                        className="max-md:text-lg"
                    >
                        Light
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => setTheme('dark')}
                        className="max-md:text-lg"
                    >
                        Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => setTheme('system')}
                        className="max-md:text-lg"
                    >
                        System
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export function ModeToggleSwitch() {
    const { setTheme, theme } = useTheme()
    return (
        <div className="flex justify-center align-middle gap-2 p-2">
            <Switch
                id="themeToggle"
                onCheckedChange={(checked) => {
                    if (checked) {
                        setTheme('light')
                    } else {
                        setTheme('dark')
                    }
                }}
                checked={theme === 'light' ? true : false}
            />
            <Label htmlFor="themeToggle" className="h-fit self-center">
                {capitalizeFLetter(theme as string)} mode
            </Label>
        </div>
    )
}
