import user_placeholder from '@/assets/images/user-placeholder.png';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { MemberDto } from '@/dtos/member.dto';
import { IMemberAttendance } from '@/interfaces/meeting/IMemberAttendance';
import { getMemberAttendance } from '@/lib/entityService';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { headers } from 'next/headers';
import Image from 'next/image';

export default async function MemberInfo({ user }: { user: MemberDto }) {
    console.log(user);
    const cookie = headers().get('cookie') || undefined;
    const attendance = (await getMemberAttendance(
        { memberId: user.id },
        cookie
    )) as IMemberAttendance;

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
                                Prezențe {attendance.presences}
                            </span>
                        </Card>
                        <Card className="w-fit rounded-full px-2 py-1">
                            <span className="text-red-700 dark:text-red-600">
                                Absențe {attendance.absences}
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
