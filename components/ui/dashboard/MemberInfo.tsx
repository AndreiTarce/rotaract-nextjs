import { IMember } from '@/models/member'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../card'
import Image from 'next/image'
import { getAttendance } from '@/lib/entityService'
import user_placeholder from '@/assets/images/user-placeholder.png'

export default async function MemberInfo({ user }: { user: IMember }) {
    const attendance = await getAttendance(user._id)
    return (
        <div className="flex overflow-hidden p-6 justify-between">
            <div className="flex gap-4 flex-wrap">
                <div className="relative rounded-full overflow-hidden w-28 h-28 self-center">
                    <Image
                        src={user.picture || user_placeholder}
                        alt="Profile picture"
                        fill
                        style={{
                            objectFit: 'cover', // cover, contain, none
                        }}
                    />
                </div>
                <div>
                    <CardTitle>
                        {user.first_name} {user.last_name}
                    </CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                    <div>{user.role}</div>
                    <div className="text-sm mt-4 flex gap-2">
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
            <FontAwesomeIcon icon={faUser} className="text-muted-foreground" />
        </div>
    )
}
