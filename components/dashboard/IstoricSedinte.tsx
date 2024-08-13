'use client';

import { MeetingDto } from '@/dtos/meeting.dto';
import { MemberDto } from '@/dtos/member.dto';
import { ROTARACT_VISIO_MINUTE_DRIVE_URL } from '@/lib/constants';
import { faGoogleDrive } from '@fortawesome/free-brands-svg-icons';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';
import DashboardCardSkeleton from './DashboardCardSkeleton';
import { getMeetings } from './IstoricMinute';
import Sedinta from './Sedinta';
import { MEETING_TYPES } from './constants';

export default function IstoricSedinte({ user }: { user: MemberDto }) {
    const [year, setYear] = useState(new Date().getFullYear());
    const [type, setType] = useState(MEETING_TYPES[0].name);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['meetings', year, type],
        queryFn: async () => {
            const { meetings } = await getMeetings({
                year: year,
                type: type,
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
                <CardTitle className="self-center">Istoric sedinte</CardTitle>
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
                <div className="mb-2 flex flex-wrap items-center gap-4">
                    <div className="flex w-full justify-between md:max-w-[200px]">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={subtractYear}
                            disabled={year > 2023 ? false : true}
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
                    <Select
                        defaultValue={type}
                        onValueChange={(e) => setType(e)}
                    >
                        <SelectTrigger className="h-9 w-fit">
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
                <ScrollArea className="h-96 rounded md:pr-4">
                    <div className="grid grid-cols-responsive-grid gap-4">
                        {!isLoading ? (
                            data!.map((meeting: MeetingDto, index: number) =>
                                meeting.presentMembers?.length ? (
                                    <Sedinta
                                        key={index}
                                        meeting={meeting}
                                        user={user}
                                    />
                                ) : null
                            )
                        ) : (
                            <>
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <DashboardCardSkeleton key={index} />
                                ))}
                            </>
                        )}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
