'use client'
import { API_KEY, MEETINGS_PATH } from '@/lib/constants'
import { IMeeting } from '@/models/meeting'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Button } from '../button'
import { Card, CardContent, CardHeader, CardTitle } from '../card'
import { ScrollArea } from '../scroll-area'
import { Separator } from '../separator'
import Minuta from './Minuta'

export default function IstoricMinute() {
    const [date, setDate] = useState(moment())
    const [year, setYear] = useState(moment().format('YYYY'))
    const [meetings, setMeetings] = useState([])
    const [loading, setLoading] = useState(true)

    const addYear = () => {
        const newDate = date.add(1, 'year')
        setYear(newDate.format('YYYY'))
        setLoading(true)
    }

    const subtractYear = () => {
        const newDate = date.subtract(1, 'year')
        setYear(newDate.format('YYYY'))
        setLoading(true)
    }

    const getMeetings = async (params: {
        api_key: string
        startDate: string
        endDate: string
    }) => {
        const url = MEETINGS_PATH

        try {
            const res = await fetch(url + '?' + new URLSearchParams(params))

            if (!res.ok) {
                throw new Error('Failed to fetch meetings')
            }

            return res.json()
        } catch (error) {
            console.log('Error loading meetings: ', error)
        }
    }

    useEffect(() => {
        const startDate = `${year}-01-01`
        const endDate = `${year}-12-31`
        getMeetings({
            api_key: API_KEY,
            startDate: startDate,
            endDate: endDate,
        })
            .then((result) => {
                setMeetings(result.meetings)
                setLoading(false)
            })
            .catch((err) => console.log(err))
    }, [year])

    return (
        <Card>
            <CardHeader className="pb-4">
                <CardTitle>Istoric minute</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between md:max-w-[200px] w-full mb-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={subtractYear}
                        disabled={parseInt(year) > 2014 ? false : true}
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
                        {!loading ? (
                            meetings.map((meeting: IMeeting, index: number) => (
                                <>
                                    <Minuta
                                        key={index}
                                        type={meeting.type}
                                        author={meeting.minuteAuthor}
                                        date={meeting.date}
                                        url={meeting.minuteUrl}
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
