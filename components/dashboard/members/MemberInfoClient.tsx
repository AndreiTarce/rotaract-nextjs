'use client';
import user_placeholder from '@/assets/images/user-placeholder.png';
import { MemberDto } from '@/dtos/member.dto';
import { MEMBER_ATTENDANCE_PATH } from '@/lib/constants';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Card, CardDescription, CardTitle } from '../../ui/card';
import { Skeleton } from '../../ui/skeleton';

export default function MemberInfoClient({ user }: { user: MemberDto }) {
    const [attendance, setAttendance] = useState<any>();
    const [loading, setLoading] = useState(true);

    const getMemberAttendance = async (id: string) => {
        const url = MEMBER_ATTENDANCE_PATH;
        const res = await fetch(
            url +
                '?' +
                new URLSearchParams({
                    id: id.toString(),
                })
        );
        return res.json();
    };

    const getNeededData = async () => {
        const memberAttendance = await getMemberAttendance(user.id);
        setAttendance(memberAttendance);
        setLoading(false);
    };

    useEffect(() => {
        getNeededData();
    }, []);

    if (loading)
        return (
            <div className="relative overflow-hidden p-6">
                <div className="flex flex-wrap gap-4">
                    <Skeleton className="h-28 w-28 self-center rounded-full" />
                    <div>
                        <CardTitle>
                            <Skeleton className="mb-1 h-5 w-36" />
                        </CardTitle>
                        <CardDescription>
                            <Skeleton className="mb-6 h-3 w-24" />
                        </CardDescription>
                        <Skeleton className="mb-1 h-3 w-16" />
                        <Skeleton className="h-3 w-16" />
                        <div className="mt-4 flex flex-wrap gap-2 text-sm">
                            <Card className="w-fit rounded-full px-2 py-1">
                                <Skeleton className="h-4 w-16" />
                            </Card>
                            <Card className="w-fit rounded-full px-2 py-1">
                                <Skeleton className="h-4 w-16" />
                            </Card>
                        </div>
                    </div>
                </div>
                <FontAwesomeIcon
                    icon={faUser}
                    className="absolute right-6 top-6 text-muted-foreground"
                />
            </div>
        );

    if (attendance)
        return (
            <div className="relative overflow-hidden p-6">
                <div className="flex flex-wrap gap-4">
                    <div className="relative h-28 w-28 self-center overflow-hidden rounded-full">
                        <Image
                            src={user.picture || user_placeholder}
                            alt="Profile picture"
                            fill
                            style={{
                                objectFit: 'cover',
                            }}
                        />
                    </div>
                    <div>
                        <CardTitle>
                            {user.first_name} {user.last_name}
                        </CardTitle>
                        <CardDescription>{user.email}</CardDescription>
                        <div className="capitalize">{user.role}</div>
                        <div className="text-sm capitalize text-muted-foreground">
                            Status: {user.status}
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2 text-sm">
                            <Card className="w-fit rounded-full px-2 py-1">
                                <span className="text-green-800 dark:text-green-500">
                                    Prezențe {attendance.totalPresences}
                                </span>
                            </Card>
                            <Card className="w-fit rounded-full px-2 py-1">
                                <span className="text-red-700 dark:text-red-600">
                                    Absențe {attendance.totalAbsences}
                                </span>
                            </Card>
                        </div>
                    </div>
                </div>
                <FontAwesomeIcon
                    icon={faUser}
                    className="absolute right-6 top-6 text-muted-foreground"
                />
            </div>
        );
}
