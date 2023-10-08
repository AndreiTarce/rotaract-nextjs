'use client'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../card'
import { ScrollArea } from '../scroll-area'
import moment from 'moment'
import { Button } from '../button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import Cotizatie from './Cotizatie'
import { Separator } from '../separator'

export default function IstoricMinute() {
    const [date, setDate] = useState(moment())
    const [year, setYear] = useState(moment().format('YYYY'))

    const addYear = () => {
        const newDate = date.add(1, 'year')
        setYear(newDate.format('YYYY'))
    }

    const subtractYear = () => {
        const newDate = date.subtract(1, 'year')
        setYear(newDate.format('YYYY'))
    }

    useEffect(() => {
        console.log('fetch data')
    }, [year])

    return (
        <Card className="">
            <CardHeader className="pb-4">
                <CardTitle>Istoric minute</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between md:max-w-[200px] w-full mb-2">
                    <Button variant="outline" size="sm" onClick={subtractYear}>
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
                        <Cotizatie />
                        <Separator className="my-1" />
                        <Cotizatie />
                        <Separator className="my-1" />
                        <Cotizatie />
                        <Separator className="my-1" />
                        <Cotizatie />
                        <Separator className="my-1" />
                        <Cotizatie />
                        <Separator className="my-1" />
                        <Cotizatie />
                        <Separator className="my-1" />
                        <Cotizatie />
                        <Separator className="my-1" />
                        <Cotizatie />
                        <Separator className="my-1" />
                        <Cotizatie />
                        <Separator className="my-1" />
                        <Cotizatie />
                        <Separator className="my-1" />
                        <Cotizatie />
                        <Separator className="my-1" />
                        <Cotizatie />
                        <Separator className="my-1" />
                        <Cotizatie />
                        <Separator className="my-1" />
                        <Cotizatie />
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}
