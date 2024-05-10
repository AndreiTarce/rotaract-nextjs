import { IMember } from '@/models/interfaces'
import { Card, CardContent, CardHeader, CardTitle } from '../card'
import DashboardMemberCard from './DashboardMemberCard'
import { ScrollArea } from '../scroll-area'
import { getMembers } from '@/lib/entityService'

export default async function MembersPanel({
    currentUser,
}: {
    currentUser: IMember
}) {
    const { members }: { members: IMember[] } = await getMembers()
    return (
        <Card>
            <CardHeader className="pb-4 flex flex-row justify-between">
                <CardTitle>Membri</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-96 w-full pr-4 rounded">
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
    )
}
