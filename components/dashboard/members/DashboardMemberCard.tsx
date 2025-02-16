import user_placeholder from '@/assets/images/user-placeholder.png';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { MemberDto } from '@/dtos/member.dto';
import { MemberInteractor } from '@/interactors/memberInteractor';
import connectMongoDB from '@/lib/mongodb';
import { MemberRepository } from '@/repositories/memberRepository';
import { getMemberAttendance } from '@/use-cases/members/getMemberAttendance';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import EditMemberForm from './EditMemberForm';

const memberInteractor = new MemberInteractor(new MemberRepository());

export default async function DashboardMemberCard({
    userId,
    currentUser,
}: {
    userId: string;
    currentUser: MemberDto;
}) {
    await connectMongoDB();

    const user = await memberInteractor.getMemberById(userId);
    const attendance = await getMemberAttendance(user.id);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Card className="relative flex flex-col items-center justify-center px-2 py-4 hover:cursor-pointer hover:bg-black/10 dark:hover:bg-gray-50/10">
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
                            unoptimized
                        />
                    </div>
                    <div className="font-semibold">
                        {user.first_name} {user.last_name}
                    </div>
                    <div className="text-muted-foreground mb-2 text-xs">{user.email}</div>
                    <div className="capitalize">{user.role}</div>
                    <div className="text-muted-foreground mb-2 text-sm capitalize">
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
                                    className="text-muted-foreground absolute top-3 right-3 hover:cursor-pointer"
                                />
                            </TooltipTrigger>
                            <TooltipContent>View member</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </Card>
            </DialogTrigger>
            <DialogContent className="max-w-[60%] rounded-lg max-md:w-[90%] max-md:max-w-[90%] max-md:pt-16">
                <EditMemberForm userId={user.id} currentUser={currentUser} readOnly />
            </DialogContent>
        </Dialog>
    );
}
