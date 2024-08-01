import { Card } from '@/components/ui/card';
import IstoricMinute from '@/components/ui/dashboard/IstoricMinute';
import IstoricSedinte from '@/components/ui/dashboard/IstoricSedinte';
import MembersPanel from '@/components/ui/dashboard/MembersPanel';
import { Separator } from '@/components/ui/separator';
import { authConfig, loginIsRequiredServer } from '@/lib/auth';
import { getMemberByEmail } from '@/lib/entityService';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { headers } from 'next/headers';

export const metadata: Metadata = {
    title: 'Dashboard | Rotaract Visio Cluj-Napoca',
};

export default async function Dashboard() {
    await loginIsRequiredServer();
    const session = await getServerSession(authConfig);
    const cookie = headers().get('cookie') || undefined;
    const currentUser = await getMemberByEmail(session?.user?.email!, cookie);

    const sedinte = (
        <Card className="flex flex-col gap-4 md:grid md:grid-cols-2">
            <IstoricSedinte user={currentUser} />
            <Separator className="md:hidden" />
            <IstoricMinute />
        </Card>
    );

    const membri = (
        <div className="mb-4">
            <MembersPanel currentUser={currentUser} />
        </div>
    );

    return (
        <main className="mx-16 mt-5 max-md:mx-4 md:mt-12">
            <h1 className="mb-8 text-3xl font-bold tracking-tight">
                Dashboard
            </h1>
            {/* <div className="mb-4 flex flex-col gap-4 md:grid md:grid-cols-3">
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
                            <AdaugareSedinta user={currentUser} />
                            <AddMemberFormCard />
                        </div>
                    )
                }
            /> */}
        </main>
    );
}
