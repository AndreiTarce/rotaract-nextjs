import Image from 'next/image'
import { Card, CardContent, CardDescription, CardTitle } from '../card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { IMember } from '@/models/interfaces'
import user_placeholder from '@/assets/images/user-placeholder.png'
import { getAttendance } from '@/lib/entityService'
import { Separator } from '../separator'

export default async function DashboardMemberCard({ user }: { user: IMember }) {
    const attendance = await getAttendance(user._id)
    return (
        <Card className="flex justify-center items-center flex-col py-4 px-2">
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
        </Card>
    )
}
