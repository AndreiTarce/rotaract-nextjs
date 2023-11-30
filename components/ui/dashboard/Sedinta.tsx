'use client'

import { IMeeting } from '@/models/meeting'
import { IMember } from '@/models/member'
import { faCalendar, faLocationPin } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '../button'
import { Card, CardDescription, CardHeader, CardTitle } from '../card'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../dialog'
import MemberPill from './MemberPill'
import { ScrollArea } from '../scroll-area'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '../collapsible'
import { useState } from 'react'
import { ChevronsUpDown } from 'lucide-react'
import { faGoogleDrive } from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link'
import { Textarea } from '../textarea'
import { Label } from '../label'

export default function Sedinta({ meeting }: { meeting: IMeeting }) {
    const meetingDate = new Date(meeting.start_date)
    const [isPresentOpen, setIsPresentOpen] = useState(true)
    const [isAbsentOpen, setIsAbsentOpen] = useState(false)
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Card className="hover:scale-105 hover:bg-opacity-10 hover:bg-dark hover:cursor-pointer max-w-[300px] min-h-fit">
                    <CardHeader>
                        <CardTitle>{meeting.type}</CardTitle>
                        <CardDescription className="flex flex-col">
                            <div>
                                <FontAwesomeIcon
                                    icon={faCalendar}
                                    className="mr-2"
                                />
                                {meetingDate.toLocaleDateString('RO', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                })}
                            </div>
                            <div>
                                <FontAwesomeIcon
                                    icon={faLocationPin}
                                    className="mr-2"
                                />
                                {meeting.location}
                            </div>
                        </CardDescription>
                    </CardHeader>
                </Card>
            </DialogTrigger>
            <DialogContent className="max-w-[60%] max-md:w-[90%] max-md:max-w-[90%] rounded-lg">
                <DialogHeader>
                    <DialogTitle className="text-4xl">
                        {meeting.type}
                    </DialogTitle>
                    <DialogDescription>
                        <div>
                            <FontAwesomeIcon
                                icon={faCalendar}
                                className="mr-2"
                            />
                            {meetingDate.toLocaleDateString('RO', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                            })}
                        </div>
                        <div>
                            <FontAwesomeIcon
                                icon={faLocationPin}
                                className="mr-2"
                            />
                            {meeting.location}
                        </div>
                    </DialogDescription>
                </DialogHeader>
                {meeting.presentMembers?.length &&
                meeting.absentMembers?.length ? (
                    <div className="flex flex-col md:flex-row gap-4 flex-wrap">
                        <Collapsible
                            open={isPresentOpen}
                            onOpenChange={setIsPresentOpen}
                        >
                            <CollapsibleTrigger asChild className="mb-2">
                                <div className="w-fit">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="px-2 -ml-2"
                                    >
                                        <span className="text-lg font-semibold">
                                            Membri prezenti
                                        </span>
                                        <ChevronsUpDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <Card className="md:w-96 p-2">
                                    <ScrollArea className="h-[100px] md:h-[300px]">
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {meeting.presentMembers?.length &&
                                                meeting.presentMembers.map(
                                                    (
                                                        member: IMember,
                                                        index: number
                                                    ) => (
                                                        <MemberPill
                                                            user={member}
                                                            key={index}
                                                        />
                                                    )
                                                )}
                                        </div>
                                    </ScrollArea>
                                </Card>
                            </CollapsibleContent>
                        </Collapsible>
                        <Collapsible
                            open={isAbsentOpen}
                            onOpenChange={setIsAbsentOpen}
                        >
                            <CollapsibleTrigger asChild className="mb-2">
                                <div className="w-fit">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="px-2 -ml-2"
                                    >
                                        <span className="text-lg font-semibold">
                                            Membri absenti
                                        </span>
                                        <ChevronsUpDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <Card className="md:w-96 p-2">
                                    <ScrollArea className="h-[100px] md:h-[300px]">
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {meeting.absentMembers?.length &&
                                                meeting.absentMembers.map(
                                                    (
                                                        member: IMember,
                                                        index: number
                                                    ) => (
                                                        <MemberPill
                                                            user={member}
                                                            key={index}
                                                        />
                                                    )
                                                )}
                                        </div>
                                    </ScrollArea>
                                </Card>
                            </CollapsibleContent>
                        </Collapsible>
                    </div>
                ) : null}
                <Label className="text-lg font-semibold">Highlights</Label>
                <Textarea placeholder="Coming soon" disabled />
                <DialogFooter>
                    <Link href={meeting.minuteUrl} target="_blank">
                        <Button type="submit">
                            Minuta{' '}
                            <FontAwesomeIcon
                                icon={faGoogleDrive}
                                className="ml-2"
                            />
                        </Button>
                    </Link>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
