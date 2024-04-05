'use client'

import { API_KEY } from '@/lib/constants'
import { IMeeting } from '@/models/meeting'
import { IMember } from '@/models/member'
import { faGoogleDrive } from '@fortawesome/free-brands-svg-icons'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    keepPreviousData,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '../button'
import { Card, CardContent, CardHeader, CardTitle } from '../card'
import { ScrollArea } from '../scroll-area'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../select'
import { getMeetings } from './IstoricMinute'
import Sedinta from './Sedinta'
import { MEETING_TYPES } from './constants'

export default function IstoricSedinte({ user }: { user: IMember }) {
    const [year, setYear] = useState(new Date().getFullYear())
    const [type, setType] = useState(MEETING_TYPES[0].name)
    const queryClient = useQueryClient()

    const { data, isLoading, isError } = useQuery({
        queryKey: ['meetings', year, type],
        queryFn: async () => {
            const { meetings } = await getMeetings({
                api_key: API_KEY,
                year: year,
                type: type,
            })
            return meetings as IMeeting[]
        },
        placeholderData: keepPreviousData,
    })

    const addYear = () => {
        setYear((prevYear) => prevYear + 1)
    }

    const subtractYear = () => {
        setYear((prevYear) => prevYear - 1)
    }
    return (
        <Card className="border-none">
            <CardHeader className="pb-4 flex flex-row justify-between">
                <CardTitle className="self-center">Istoric sedinte</CardTitle>
                <Button asChild variant="outline" size="sm">
                    <Link
                        href="https://drive.google.com/drive/folders/1jVd1i82MoMS16nNJGcphXd2rHUDPIeR8?usp=drive_link"
                        className="!mt-0"
                        target="_blank"
                    >
                        <FontAwesomeIcon
                            icon={faGoogleDrive}
                            className="text-muted-foreground"
                        />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <div className="flex gap-4 mb-2 items-center flex-wrap">
                    <div className="flex justify-between md:max-w-[200px] w-full">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={subtractYear}
                            disabled={year > 2023 ? false : true}
                        >
                            <FontAwesomeIcon icon={faCaretLeft} />
                        </Button>
                        <div className="font-semibold flex justify-center items-center">
                            {year}
                        </div>
                        <Button variant="outline" size="sm" onClick={addYear}>
                            <FontAwesomeIcon icon={faCaretRight} />
                        </Button>
                    </div>
                    <Select
                        defaultValue={type}
                        onValueChange={(e) => setType(e)}
                    >
                        <SelectTrigger className="w-fit">
                            <SelectValue placeholder="Tipul sedintei" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {MEETING_TYPES.map((meeting, index: number) => (
                                    <SelectItem
                                        value={meeting.name}
                                        key={meeting.id}
                                    >
                                        {meeting.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <ScrollArea className="rounded h-96 md:pr-4">
                    <div className="grid grid-cols-responsive-grid gap-4">
                        {!isLoading ? (
                            data!.map((meeting: IMeeting, index: number) =>
                                meeting.presentMembers?.length ? (
                                    <Sedinta
                                        key={index}
                                        meeting={meeting}
                                        user={user}
                                    />
                                ) : null
                            )
                        ) : (
                            <div className="flex items-center w-full h-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="3em"
                                    viewBox="0 0 512 512"
                                    className="animate-spin mr-2 fill-dark dark:fill-white"
                                >
                                    <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
                                </svg>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}
