'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../card'
import { Input } from '../input'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '../select'
import { MEETING_TYPES } from './constants'
import { Label } from '../label'
import { FormLabel } from '../form'

export default function AdaugareSedinta() {
    const [location, setLocation] = useState('')
    return (
        <Card>
            <CardHeader className="pb-4">
                <CardTitle>Adaugare sedinta</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    <Select>
                        <SelectTrigger className="w-fit">
                            <SelectValue placeholder="Tipul sedintei" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {MEETING_TYPES.map((meeting, index: number) => (
                                    <SelectItem value={meeting.id} key={index}>
                                        {meeting.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Input
                        placeholder="Locatie"
                        className="w-fit"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
            </CardContent>
        </Card>
    )
}
