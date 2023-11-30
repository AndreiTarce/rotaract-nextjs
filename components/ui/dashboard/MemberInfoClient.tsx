'use client'
import user_placeholder from '@/assets/images/user-placeholder.png'
import { getAttendance } from '@/lib/entityService'
import { IMember } from '@/models/member'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { Card, CardDescription, CardTitle } from '../card'
import { useEffect, useState } from 'react'
import { MEMBER_ATTENDANCE_PATH } from '@/lib/constants'
import { ObjectId } from 'mongodb'
import { Skeleton } from '../skeleton'

export default function MemberInfoClient({ user }: { user: IMember }) {
    const [attendance, setAttendance] = useState<any>()
    const [loading, setLoading] = useState(true)

    const getMemberAttendance = async (id: ObjectId) => {
        const url = MEMBER_ATTENDANCE_PATH
        const res = await fetch(
            url +
                '?' +
                new URLSearchParams({
                    id: id.toString(),
                })
        )
        return res.json()
    }

    const getNeededData = async () => {
        const memberAttendance = await getMemberAttendance(user._id)
        setAttendance(memberAttendance)
        setLoading(false)
    }

    useEffect(() => {
        getNeededData()
    }, [])

    if (loading)
        return (
            <div className="overflow-hidden p-6 relative">
                <div className="flex gap-4 flex-wrap">
                    <Skeleton className="rounded-full w-28 h-28 self-center" />
                    <div>
                        <CardTitle>
                            <Skeleton className="w-36 h-5 mb-1" />
                        </CardTitle>
                        <CardDescription>
                            <Skeleton className="w-24 h-3 mb-6" />
                        </CardDescription>
                        <Skeleton className="w-16 h-3 mb-1" />
                        <Skeleton className="w-16 h-3" />
                        <div className="text-sm mt-4 flex gap-2 flex-wrap">
                            <Card className="w-fit px-2 py-1 rounded-full">
                                <Skeleton className="h-4 w-16" />
                            </Card>
                            <Card className="w-fit px-2 py-1 rounded-full">
                                <Skeleton className="h-4 w-16" />
                            </Card>
                        </div>
                    </div>
                </div>
                <FontAwesomeIcon
                    icon={faUser}
                    className="text-muted-foreground absolute top-6 right-6"
                />
            </div>
        )

    if (attendance)
        return (
            <div className="overflow-hidden p-6 relative">
                <div className="flex gap-4 flex-wrap">
                    <div className="relative rounded-full overflow-hidden w-28 h-28 self-center">
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
                        <div className="text-muted-foreground text-sm capitalize">
                            Status: {user.status}
                        </div>
                        <div className="text-sm mt-4 flex gap-2 flex-wrap">
                            <Card className="w-fit px-2 py-1 rounded-full">
                                <span className="dark:text-green-500 text-green-800">
                                    Prezențe {attendance.totalPresences}
                                </span>
                            </Card>
                            <Card className="w-fit px-2 py-1 rounded-full">
                                <span className="text-red-700 dark:text-red-600">
                                    Absențe {attendance.totalAbsences}
                                </span>
                            </Card>
                        </div>
                    </div>
                </div>
                <FontAwesomeIcon
                    icon={faUser}
                    className="text-muted-foreground absolute top-6 right-6"
                />
            </div>
        )
}
