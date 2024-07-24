import user_placeholder from '@/assets/images/user-placeholder.png';
import { MemberDto } from '@/dtos/member.dto';
import Image from 'next/image';
import { Card } from '../card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../hover-card';
import MemberInfoClient from './MemberInfoClient';

export default function MemberPill({ user }: { user: MemberDto }) {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Card className="flex w-fit items-center justify-center gap-1 rounded-full p-1 hover:cursor-pointer">
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
            <HoverCardContent align="start" className="w-[400px] p-0">
                <MemberInfoClient user={user} />
            </HoverCardContent>
        </HoverCard>
    );
}
