import { IMember } from '@/models/member'
import Image from 'next/image'
import { Card } from '../card'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../hover-card'
import MemberInfo from './MemberInfo'

export default function MemberPill({ user }: { user: IMember }) {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Card className="p-1 rounded-full flex w-fit gap-1 justify-center items-center hover:cursor-pointer">
                    <div className="h-6 w-6 relative rounded-full overflow-hidden">
                        <Image
                            src={user.picture}
                            alt="test"
                            width={100}
                            height={100}
                            style={{
                                objectFit: 'cover',
                            }}
                        />
                    </div>
                    <div className="text-sm">
                        <span className="font-bold">{user.first_name} </span>
                        <span className="">{user.last_name}</span>
                    </div>
                </Card>
            </HoverCardTrigger>
            <HoverCardContent align="start" className="w-[400px] p-0">
                <MemberInfo user={user} />
            </HoverCardContent>
        </HoverCard>
    )
}
