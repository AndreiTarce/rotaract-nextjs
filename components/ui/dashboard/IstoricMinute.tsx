'use client'
import { API_KEY, MEETINGS_PATH } from '@/lib/constants'
import { IMeeting } from '@/models/meeting'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    keepPreviousData,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query'
import { useState } from 'react'
import { Button } from '../button'
import { Card, CardContent, CardHeader, CardTitle } from '../card'
import { ScrollArea } from '../scroll-area'
import { Separator } from '../separator'
import Minuta from './Minuta'
import { faGoogleDrive } from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link'

export const getMeetings = async (params: {
    api_key: string
    year: number
    type?: string
}) => {
    const url = MEETINGS_PATH
    const { year, api_key, type } = params
    const startDate = `${year}-01-01`
    const endDate = `${year}-12-31`

    try {
        const res = await fetch(
            url +
                '?' +
                new URLSearchParams({
                    api_key: api_key,
                    startDate: startDate,
                    endDate: endDate,
                    type: type ? type : '',
                }),
            { cache: 'no-store' }
        )

        if (!res.ok) {
            throw new Error('Failed to fetch meetings')
        }

        return res.json()
    } catch (error) {
        console.log('Error loading meetings: ', error)
    }
}

export default function IstoricMinute() {
    const [year, setYear] = useState(new Date().getFullYear())
    const queryClient = useQueryClient()

    const { data, isLoading, isError } = useQuery({
        queryKey: ['meetings', year],
        queryFn: async () => {
            const { meetings } = await getMeetings({
                api_key: API_KEY,
                year: year,
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
                <CardTitle className="self-center">Istoric minute</CardTitle>
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
                <div className="flex justify-between md:max-w-[200px] w-full mb-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={subtractYear}
                        disabled={year > 2014 ? false : true}
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
                <ScrollArea className="border rounded h-96">
                    <div className="p-2 md:p-4 flex flex-col">
                        {!isLoading ? (
                            data!.map((meeting: IMeeting, index: number) => (
                                <>
                                    <Minuta
                                        key={index}
                                        type={meeting.type}
                                        author={meeting.minuteAuthor}
                                        date={meeting.start_date}
                                        url={meeting.minuteUrl}
                                        id={meeting._id}
                                    />
                                    <Separator className="my-1" />
                                </>
                            ))
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
