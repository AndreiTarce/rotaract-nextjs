'use client'

import { Card, CardContent, CardHeader, CardTitle } from '../card'
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

export default function AdaugareSedinta() {
    return (
        <Card>
            <CardHeader className="pb-4">
                <CardTitle>Adaugare sedinta</CardTitle>
            </CardHeader>
            <CardContent>
                <Select>
                    <SelectTrigger className="w-[180px]">
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
            </CardContent>
        </Card>
    )
}
