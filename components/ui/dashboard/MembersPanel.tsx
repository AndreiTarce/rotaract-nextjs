import { MemberDto } from '@/dtos/member.dto';
import { IMember } from '@/interfaces/member/IMember';
import { getMembers } from '@/lib/entityService';
import { Card, CardContent, CardHeader, CardTitle } from '../card';
import { ScrollArea } from '../scroll-area';
import DashboardMemberCard from './DashboardMemberCard';

export default async function MembersPanel({
    currentUser,
}: {
    currentUser: IMember;
}) {
    const members: MemberDto[] = await getMembers();
    return (
        <Card>
            <CardHeader className="flex flex-row justify-between pb-4">
                <CardTitle>Membri</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-96 w-full rounded pr-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-8">
                        {members.map((member, index) => (
                            <DashboardMemberCard
                                user={member}
                                key={index}
                                currentUser={currentUser}
                            />
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
