'use client'

import { IMeeting } from '@/models/meeting'
import { IMember } from '@/models/member'
import { faGoogleDrive } from '@fortawesome/free-brands-svg-icons'
import {
    faCalendar,
    faCircle,
    faLocationPin,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ChevronsUpDown } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '../button'
import { Card, CardDescription, CardHeader, CardTitle } from '../card'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '../collapsible'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../dialog'
import { Label } from '../label'
import { ScrollArea } from '../scroll-area'
import { Textarea } from '../textarea'
import MemberPill from './MemberPill'

export default function Sedinta({
    meeting,
    user,
}: {
    meeting: IMeeting
    user: IMember
}) {
    const meetingDate = new Date(meeting.start_date)
    const [isPresentOpen, setIsPresentOpen] = useState(true)
    const [isAbsentOpen, setIsAbsentOpen] = useState(false)
    const memberIsPresent = meeting.presentMembers?.some(
        (presentMember) => presentMember._id === user._id
    )

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
                        {meeting.presentMembers?.length ? (
                            <div className="w-fit">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="bg-[hsl(var(--accent))]"
                                >
                                    <FontAwesomeIcon
                                        icon={faCircle}
                                        className={
                                            memberIsPresent
                                                ? 'text-green-500 mr-2 '
                                                : 'text-red-600 mr-2 '
                                        }
                                    />
                                    {memberIsPresent ? 'Prezent' : 'Absent'}
                                </Button>
                            </div>
                        ) : null}
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
                                <Card className="md:w-96 p-2 bg-green-600 bg-opacity-10">
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
                                <Card className="md:w-96 p-2 bg-red-600 bg-opacity-10">
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
