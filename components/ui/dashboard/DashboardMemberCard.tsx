import user_placeholder from '@/assets/images/user-placeholder.png'
import { authConfig } from '@/lib/auth'
import { getAttendance } from '@/lib/entityService'
import { IMember } from '@/models/interfaces'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { Card } from '../card'
import { Dialog, DialogContent, DialogTrigger } from '../dialog'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '../tooltip'
import EditMemberForm from './EditMemberForm'
import { ScrollArea } from '../scroll-area'
import { isSecretary } from '@/lib/utils'
import useMediaQuery from '@/hooks/useMediaQuery'
import { Drawer } from '../drawer'

export default async function DashboardMemberCard({
    user,
    currentUser,
}: {
    user: IMember
    currentUser: IMember
}) {
    const attendance = await getAttendance(user._id)

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Card className="flex justify-center items-center flex-col py-4 px-2 relative hover:cursor-pointer hover:bg-opacity-10 dark:hover:bg-opacity-10 dark:hover:bg-gray-50 hover:bg-black">
                    <div className="relative rounded-full overflow-hidden h-[50px] w-[50px]">
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
                    <div className="text-muted-foreground text-xs mb-2">
                        {user.email}
                    </div>
                    <div className="capitalize">{user.role}</div>
                    <div className="text-muted-foreground text-sm capitalize mb-2">
                        Status: {user.status}
                    </div>
                    <div className="flex w-full text-xs gap-2 justify-evenly">
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
                    <TooltipProvider>
                        <Tooltip delayDuration={200}>
                            <TooltipTrigger asChild>
                                <FontAwesomeIcon
                                    icon={faEye}
                                    className="absolute right-3 top-3 hover:cursor-pointer text-muted-foreground"
                                />
                            </TooltipTrigger>
                            <TooltipContent>View member</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </Card>
            </DialogTrigger>
            <DialogContent className="max-w-[90vw] rounded-xl md:w-fit">
                <EditMemberForm
                    userInfo={user}
                    currentUser={currentUser}
                    readOnly
                />
            </DialogContent>
        </Dialog>
    )
}
