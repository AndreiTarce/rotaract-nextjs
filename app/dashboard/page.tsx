import DashboardCardSkeleton from '@/components/dashboard/DashboardCardSkeleton';
import ImportantLinks from '@/components/dashboard/ImportantLinks';
import IstoricMinute from '@/components/dashboard/IstoricMinute';
import IstoricSedinte from '@/components/dashboard/IstoricSedinte';
import SectionsTab from '@/components/dashboard/SectionsTab';
import AddMeetingForm from '@/components/dashboard/meetings/AddMeetingForm';
import AddMemberFormCard from '@/components/dashboard/members/AddMemberFormCard';
import CotizatieMembru from '@/components/dashboard/members/CotizatieMembru';
import MemberInfo from '@/components/dashboard/members/MemberInfo';
import MembersPanel from '@/components/dashboard/members/MembersPanel';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MemberDto } from '@/dtos/member.dto';
import { authConfig, loginIsRequiredServer } from '@/lib/auth';
import { getMemberByEmail } from '@/lib/entityService';
import { isSecretary } from '@/lib/utils';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { headers } from 'next/headers';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Dashboard | Rotaract Visio Cluj-Napoca',
};

export default async function Dashboard() {
    const cookie = headers().get('cookie') || undefined;
    await loginIsRequiredServer();
    const session = await getServerSession(authConfig);
    const currentUser = (await getMemberByEmail(
        session?.user?.email!,
        cookie
    )) as MemberDto;

    const sedinte = (
        <Card className="flex flex-col gap-4 md:grid md:grid-cols-2">
            <IstoricSedinte user={currentUser} />
            <Separator className="md:hidden" />
            <IstoricMinute />
        </Card>
    );

    const membri = (
        <Suspense fallback={<DashboardCardSkeleton />}>
            <div className="mb-4">
                <MembersPanel currentUser={currentUser} />
            </div>
        </Suspense>
    );

    return (
        <main className="mx-16 mt-5 max-md:mx-4 md:mt-12">
            <h1 className="mb-8 text-3xl font-bold tracking-tight">
                Dashboard
            </h1>
            <div className="mb-4 flex flex-col gap-4 md:grid md:grid-cols-3">
                <Card>
                    <MemberInfo user={currentUser} />
                </Card>
                <ImportantLinks />
                <CotizatieMembru />
            </div>
            <SectionsTab
                sedinte={sedinte}
                membri={membri}
                functii_secretar={
                    isSecretary(currentUser) && (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <AddMeetingForm user={currentUser} />
                            <AddMemberFormCard />
                        </div>
                    )
                }
            />
        </main>
    );
}
