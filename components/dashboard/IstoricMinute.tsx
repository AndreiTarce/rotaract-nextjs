'use client';
import { MeetingDto } from '@/dtos/meeting.dto';
import {
    MEETINGS_PATH,
    ROTARACT_VISIO_MINUTE_DRIVE_URL,
} from '@/lib/constants';
import { faGoogleDrive } from '@fortawesome/free-brands-svg-icons';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    keepPreviousData,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import DashboardCardSkeleton from './DashboardCardSkeleton';
import Minuta from './Minuta';

export const getMeetings = async (params: { year: number; type?: string }) => {
    const url = MEETINGS_PATH;
    const { year, type } = params;
    const startDate = `${year}-01-01`;
    const endDate = `${year}-12-31`;

    try {
        const res = await fetch(
            url +
                '?' +
                new URLSearchParams({
                    start_date: startDate,
                    end_date: endDate,
                    type: type ? type : '',
                }),
            { cache: 'no-store' }
        );

        if (!res.ok) {
            throw new Error('Failed to fetch meetings');
        }

        return res.json();
    } catch (error) {
        console.log('Error loading meetings: ', error);
    }
};

export default function IstoricMinute() {
    const [year, setYear] = useState(new Date().getFullYear());
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['meetings', year],
        queryFn: async () => {
            const { meetings } = await getMeetings({
                year: year,
            });
            return meetings as MeetingDto[];
        },
        placeholderData: keepPreviousData,
    });

    const addYear = () => {
        setYear((prevYear) => prevYear + 1);
    };

    const subtractYear = () => {
        setYear((prevYear) => prevYear - 1);
    };

    return (
        <Card className="border-none">
            <CardHeader className="flex flex-row justify-between pb-4">
                <CardTitle className="self-center">Istoric minute</CardTitle>
                <Button asChild variant="outline" size="sm">
                    <Link
                        href={ROTARACT_VISIO_MINUTE_DRIVE_URL}
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
                <div className="mb-2 flex w-full justify-between md:max-w-[200px]">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={subtractYear}
                        disabled={year > 2014 ? false : true}
                    >
                        <FontAwesomeIcon icon={faCaretLeft} />
                    </Button>
                    <div className="flex items-center justify-center font-semibold">
                        {year}
                    </div>
                    <Button variant="outline" size="sm" onClick={addYear}>
                        <FontAwesomeIcon icon={faCaretRight} />
                    </Button>
                </div>
                <ScrollArea className="h-96 rounded-lg border">
                    <div className="flex flex-col p-2 md:p-4">
                        {!isLoading ? (
                            data!.map((meeting: MeetingDto, index: number) => (
                                <>
                                    <Minuta
                                        key={index}
                                        type={meeting.type}
                                        author={meeting.minuteAuthor}
                                        date={meeting.start_date}
                                        url={meeting.minuteUrl}
                                        id={meeting.id}
                                    />
                                    <Separator className="my-1" />
                                </>
                            ))
                        ) : (
                            <div className="flex flex-col gap-2">
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <DashboardCardSkeleton key={index} />
                                ))}
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
