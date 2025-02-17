import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MemberDto } from '@/dtos/member.dto';
import { MemberInteractor } from '@/interactors/memberInteractor';
import connectMongoDB from '@/lib/mongodb';
import { MemberRepository } from '@/repositories/memberRepository';
import { ScrollArea } from '../../ui/scroll-area';
import DashboardMemberCard from './DashboardMemberCard';

export const dynamic = 'force-dynamic';

const memberInteractor = new MemberInteractor(new MemberRepository());

export default async function MembersPanel({ currentUser }: { currentUser: MemberDto }) {
    await connectMongoDB();

    const members = await memberInteractor.getAllMembers();

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
                                userId={member.id}
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
