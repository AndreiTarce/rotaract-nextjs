'use client';

import { MeetingDto, MeetingMemberDto } from '@/dtos/meeting.dto';
import { MemberDto } from '@/dtos/member.dto';
import { isSecretary } from '@/lib/utils';
import { faGoogleDrive, faReadme } from '@fortawesome/free-brands-svg-icons';
import {
    faCalendar,
    faCircle,
    faLocationPin,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQueryClient } from '@tanstack/react-query';
import { ChevronsUpDown } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { errorToast } from '../toasts/error-toast';
import { successToast } from '../toasts/success-toast';
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
} from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '../ui/collapsible';
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuShortcut,
    ContextMenuTrigger,
} from '../ui/context-menu';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog';
import { ScrollArea } from '../ui/scroll-area';
import MemberPill from './members/MemberPill';

export default function Sedinta({
    meeting,
    user,
}: {
    meeting: MeetingDto;
    user: MemberDto;
}) {
    const meetingDate = new Date(meeting.start_date);
    const [isPresentOpen, setIsPresentOpen] = useState(true);
    const [isAbsentOpen, setIsAbsentOpen] = useState(false);
    const memberIsPresent = meeting.presentMembers?.some(
        (presentMember) => presentMember.id === user.id
    );
    const queryClient = useQueryClient();

    const deleteMeeting = (id: string) => {
        fetch('/api/meetings', {
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
                    successToast({
                        title: 'Stergere sedinta',
                        message: 'Sedinta a fost stearsa cu succes!',
                        icon: <FontAwesomeIcon icon={faTrash} />,
                    });
                }
            })
            .catch((err) => {
                errorToast({
                    title: 'Stergere sedinta',
                    message: 'Sedinta nu a fost stearsa',
                });
            })
            .finally(() => {
                queryClient.invalidateQueries({
                    queryKey: ['meetings'],
                    exact: false,
                });
            });
    };

    return (
        <ContextMenu>
            <Dialog>
                <DialogTrigger asChild>
                    <ContextMenuTrigger>
                        <Card className="min-h-fit max-w-[300px] hover:scale-105 hover:cursor-pointer hover:bg-dark hover:bg-opacity-10">
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
                                                        ? 'mr-2 text-green-500 '
                                                        : 'mr-2 text-red-600 '
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
                <DialogContent className="max-w-[60%] rounded-lg max-md:w-[90%] max-md:max-w-[90%]">
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
                        <div className="flex flex-col flex-wrap md:flex-row  md:gap-4">
                            <Collapsible
                                open={isPresentOpen}
                                onOpenChange={setIsPresentOpen}
                            >
                                <CollapsibleTrigger asChild className="md:mb-2">
                                    <div className="w-fit">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="-ml-2 px-2"
                                        >
                                            <span className="text-lg font-semibold">
                                                Membri prezenti
                                            </span>
                                            <ChevronsUpDown className="ml-2 h-4 w-4" />
                                        </Button>
                                    </div>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <Card className="bg-green-600 bg-opacity-10 p-2 md:w-96">
                                        <ScrollArea className="h-[100px] md:h-[300px]">
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {meeting.presentMembers
                                                    ?.length &&
                                                    meeting.presentMembers.map(
                                                        (
                                                            member: MeetingMemberDto,
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
                                            className="-ml-2 px-2"
                                        >
                                            <span className="text-lg font-semibold">
                                                Membri absenti
                                            </span>
                                            <ChevronsUpDown className="ml-2 h-4 w-4" />
                                        </Button>
                                    </div>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <Card className="bg-red-600 bg-opacity-10 p-2 md:w-96">
                                        <ScrollArea className="h-[100px] md:h-[300px]">
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {meeting.absentMembers
                                                    ?.length &&
                                                    meeting.absentMembers.map(
                                                        (
                                                            member: MeetingMemberDto,
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

                    <DialogFooter>
                        <div className="flex flex-wrap gap-1">
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

                            {isSecretary(user) ? (
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
                                                    deleteMeeting(meeting.id)
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
                        <ContextMenuItem disabled={!isSecretary(user)}>
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
                            onClick={() => deleteMeeting(meeting.id)}
                        >
                            Sterge{' '}
                            <FontAwesomeIcon icon={faTrash} className="ml-2" />
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </ContextMenu>
    );
}
