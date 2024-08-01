import { Card } from '@/components/ui/card';
import AdaugareSedinta from '@/components/ui/dashboard/AdaugareSedinta';
import AddMemberFormCard from '@/components/ui/dashboard/AddMemberFormCard';
import CotizatieMembru from '@/components/ui/dashboard/CotizatieMembru';
import ImportantLinks from '@/components/ui/dashboard/ImportantLinks';
import IstoricMinute from '@/components/ui/dashboard/IstoricMinute';
import IstoricSedinte from '@/components/ui/dashboard/IstoricSedinte';
import SectionsTab from '@/components/ui/dashboard/SectionsTab';
import { Separator } from '@/components/ui/separator';
import { MemberInteractor } from '@/interactors/memberInteractor';
import { authConfig, loginIsRequiredServer } from '@/lib/auth';
import { isSecretary } from '@/lib/utils';
import { MemberRepository } from '@/repositories/memberRepository';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { headers } from 'next/headers';

export const metadata: Metadata = {
    title: 'Dashboard | Rotaract Visio Cluj-Napoca',
};

const memberInteractor = new MemberInteractor(new MemberRepository());

export default async function Dashboard() {
    const cookie = headers().get('cookie') || undefined;
    await loginIsRequiredServer();
    const session = await getServerSession(authConfig);
    // const currentUser = await getMemberByEmail(session?.user?.email!, cookie);
    const currentUser = await memberInteractor.getMemberByEmail(
        session?.user?.email!
    );

    const sedinte = (
        <Card className="flex flex-col gap-4 md:grid md:grid-cols-2">
            <IstoricSedinte user={currentUser} />
            <Separator className="md:hidden" />
            <IstoricMinute />
        </Card>
    );

    const membri = (
        <div className="mb-4">
            {/* <MembersPanel currentUser={currentUser} /> */}
        </div>
    );

    return (
        <main className="mx-16 mt-5 max-md:mx-4 md:mt-12">
            <h1 className="mb-8 text-3xl font-bold tracking-tight">
                Dashboard
            </h1>
            <div className="mb-4 flex flex-col gap-4 md:grid md:grid-cols-3">
                <Card>{/* <MemberInfo user={currentUser} /> */}</Card>
                <ImportantLinks />
                <CotizatieMembru />
            </div>
            <SectionsTab
                sedinte={sedinte}
                membri={membri}
                functii_secretar={
                    isSecretary(currentUser) && (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <AdaugareSedinta user={currentUser} />
                            <AddMemberFormCard />
                        </div>
                    )
                }
            />
        </main>
    );
}
