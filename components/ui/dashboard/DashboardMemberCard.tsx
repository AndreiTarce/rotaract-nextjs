import user_placeholder from '@/assets/images/user-placeholder.png';
import { MemberDto } from '@/dtos/member.dto';
import { getMemberAttendance } from '@/lib/entityService';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { headers } from 'next/headers';
import Image from 'next/image';
import { Card } from '../card';
import { Dialog, DialogContent, DialogTrigger } from '../dialog';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '../tooltip';

export default async function DashboardMemberCard({
    user,
    currentUser,
}: {
    user: MemberDto;
    currentUser: MemberDto;
}) {
    const cookie = headers().get('cookie') || undefined;
    const attendance = await getMemberAttendance({ memberId: user.id }, cookie);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Card className="relative flex flex-col items-center justify-center px-2 py-4 hover:cursor-pointer hover:bg-black hover:bg-opacity-10 dark:hover:bg-gray-50 dark:hover:bg-opacity-10">
                    <div className="relative h-[50px] w-[50px] overflow-hidden rounded-full">
                        <Image
                            src={user.picture || user_placeholder}
                            alt="Profile picture"
                            width={50}
                            height={50}
                            style={{
                                width: '100%',
                                height: 'auto',
                            }}
                        />
                    </div>
                    <div className="font-semibold">
                        {user.first_name} {user.last_name}
                    </div>
                    <div className="mb-2 text-xs text-muted-foreground">
                        {user.email}
                    </div>
                    <div className="capitalize">{user.role}</div>
                    <div className="mb-2 text-sm capitalize text-muted-foreground">
                        Status: {user.status}
                    </div>
                    <div className="flex w-full justify-evenly gap-2 text-xs">
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
                    <TooltipProvider>
                        <Tooltip delayDuration={200}>
                            <TooltipTrigger asChild>
                                <FontAwesomeIcon
                                    icon={faEye}
                                    className="absolute right-3 top-3 text-muted-foreground hover:cursor-pointer"
                                />
                            </TooltipTrigger>
                            <TooltipContent>View member</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </Card>
            </DialogTrigger>
            <DialogContent className="max-w-[90vw] rounded-xl md:w-fit">
                {/* <EditMemberForm
                    userInfo={user}
                    currentUser={currentUser}
                    readOnly
                /> */}
            </DialogContent>
        </Dialog>
    );
}
