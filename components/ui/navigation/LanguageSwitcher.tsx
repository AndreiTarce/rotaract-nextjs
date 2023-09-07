'use client'

import { LanguageContext } from '@/app/providers'
import { useContext } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '../select'

export function LanguageSwitcher() {
    const language = useContext(LanguageContext)
    return (
        <Select dir="rtl">
            <SelectTrigger>
                <SelectValue placeholder={language?.language.toUpperCase()} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Languages</SelectLabel>
                    <SelectItem value="RO">RO</SelectItem>
                    <SelectItem value="EN">EN</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
