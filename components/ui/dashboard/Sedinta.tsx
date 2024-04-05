'use client'

import { API_KEY } from '@/lib/constants'
import { IMeeting } from '@/models/meeting'
import { IMember } from '@/models/member'
import { faGoogleDrive, faReadme } from '@fortawesome/free-brands-svg-icons'
import {
    faCalendar,
    faCircle,
    faLocationPin,
    faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ChevronsUpDown } from 'lucide-react'
import { ObjectId } from 'mongodb'
import Link from 'next/link'
import { use, useState } from 'react'
import { Button } from '../button'
import { Card, CardDescription, CardHeader, CardTitle } from '../card'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '../collapsible'
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuShortcut,
    ContextMenuTrigger,
} from '../context-menu'
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
import { toast } from '../use-toast'
import MemberPill from './MemberPill'
import { useQueryClient } from '@tanstack/react-query'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '../alert-dialog'

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
    const queryClient = useQueryClient()

    const deleteMeeting = (id: ObjectId) => {
        fetch('/api/meetings' + `?api_key=${API_KEY}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
            }),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                throw new Error('Error deleting meeting')
            })
            .then((res) => {
                queryClient.invalidateQueries({
                    queryKey: ['meetings'],
                    exact: false,
                })
                toast({
                    title: 'Stergere sedinta',
                    description: (
                        <div className="flex gap-2">
                            <FontAwesomeIcon icon={faTrash} />
                            <span className="self-center">
                                Sedinta a fost stearsa cu succes!
                            </span>
                        </div>
                    ),
                    duration: 10000,
                })
            })
            .catch((err) => {
                toast({
                    title: 'Eroare la stergere',
                    variant: 'destructive',
                    description: (
                        <div className="flex gap-2">
                            <span className="self-center">
                                Sedinta nu a fost stearsa.
                            </span>
                        </div>
                    ),
                    duration: 10000,
                })
            })
    }

    return (
        <ContextMenu>
            <Dialog>
                <DialogTrigger asChild>
                    <ContextMenuTrigger>
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
                                            {memberIsPresent
                                                ? 'Prezent'
                                                : 'Absent'}
                                        </Button>
                                    </div>
                                ) : null}
                            </CardHeader>
                        </Card>
                    </ContextMenuTrigger>
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
                        <div className="flex flex-col md:gap-4 md:flex-row  flex-wrap">
                            <Collapsible
                                open={isPresentOpen}
                                onOpenChange={setIsPresentOpen}
                            >
                                <CollapsibleTrigger asChild className="md:mb-2">
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
                                                {meeting.presentMembers
                                                    ?.length &&
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
                                <CollapsibleTrigger asChild className="md:mb-2">
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
                                                {meeting.absentMembers
                                                    ?.length &&
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

                    {/* <Label className="text-lg font-semibold">Highlights</Label>
                    <Textarea placeholder="Coming soon" disabled /> */}

                    <DialogFooter>
                        <div className="flex gap-1 flex-wrap">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button type="submit">
                                        <FontAwesomeIcon
                                            icon={faReadme}
                                            className="mr-2"
                                        />
                                        Vezi minuta{' '}
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="h-[90%] max-w-[95%] rounded-lg">
                                    <div className="pt-4">
                                        <iframe
                                            src={meeting.minuteUrl.replace(
                                                /\/view\b/g,
                                                '/preview'
                                            )}
                                            width="100%"
                                            height="100%"
                                            allow="autoplay"
                                        ></iframe>
                                    </div>
                                </DialogContent>
                            </Dialog>

                            <Link href={meeting.minuteUrl} target="_blank">
                                <Button type="submit">
                                    <FontAwesomeIcon
                                        icon={faGoogleDrive}
                                        className="mr-2"
                                    />
                                    Link minuta{' '}
                                </Button>
                            </Link>

                            {user.role === 'Secretary' ? (
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive">
                                            <FontAwesomeIcon
                                                icon={faTrash}
                                                className="mr-2"
                                            />
                                            Sterge sedinta{' '}
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Esti sigur(ă)?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Acțiunea de ștergere este
                                                ireversibilă
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                Anulare
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={() =>
                                                    deleteMeeting(meeting._id)
                                                }
                                            >
                                                Sterge{' '}
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                    className="ml-2"
                                                />
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            ) : null}
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <AlertDialog>
                <ContextMenuContent className="w-64">
                    <AlertDialogTrigger asChild>
                        <ContextMenuItem
                            disabled={!(user.role === 'Secretary')}
                        >
                            <>
                                Sterge sedinta
                                <ContextMenuShortcut>
                                    <FontAwesomeIcon icon={faTrash} />
                                </ContextMenuShortcut>
                            </>
                        </ContextMenuItem>
                    </AlertDialogTrigger>
                </ContextMenuContent>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Esti sigur(ă)?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Acțiunea de ștergere este ireversibilă
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Anulare</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => deleteMeeting(meeting._id)}
                        >
                            Sterge{' '}
                            <FontAwesomeIcon icon={faTrash} className="ml-2" />
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </ContextMenu>
    )
}
