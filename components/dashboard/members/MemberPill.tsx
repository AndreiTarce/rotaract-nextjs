import user_placeholder from '@/assets/images/user-placeholder.png';
import { MeetingMemberDto } from '@/dtos/meeting.dto';
import Image from 'next/image';
import { Card } from '../../ui/card';
import { HoverCard, HoverCardTrigger } from '../../ui/hover-card';

export default function MemberPill({ user }: { user: MeetingMemberDto }) {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Card className="flex w-fit items-center justify-center gap-1 rounded-full px-2 py-1 hover:cursor-pointer">
                    <div className="relative h-6 w-6 overflow-hidden rounded-full">
                        <Image
                            src={user.picture || user_placeholder}
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
            {/* <HoverCardContent align="start" className="w-[400px] p-0">
                <MemberInfoClient userId={user.id} />
            </HoverCardContent> */}
        </HoverCard>
    );
}
