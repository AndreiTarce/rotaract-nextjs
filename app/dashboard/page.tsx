import { Card } from '@/components/ui/card'
import AdaugareSedinta from '@/components/ui/dashboard/AdaugareSedinta'
import CotizatieMembru from '@/components/ui/dashboard/CotizatieMembru'
import ImportantLinks from '@/components/ui/dashboard/ImportantLinks'
import IstoricMinute from '@/components/ui/dashboard/IstoricMinute'
import IstoricSedinte from '@/components/ui/dashboard/IstoricSedinte'
import MemberInfo from '@/components/ui/dashboard/MemberInfo'
import MembersPanel from '@/components/ui/dashboard/MembersPanel'
import SectionsTab from '@/components/ui/dashboard/SectionsTab'
import { Separator } from '@/components/ui/separator'
import { authConfig, isSecretary, loginIsRequiredServer } from '@/lib/auth'
import { getMember } from '@/lib/entityService'
import { IMember } from '@/models/member'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'

export const metadata: Metadata = {
    title: 'Dashboard | Rotaract Visio Cluj-Napoca',
}

export default async function Dashboard() {
    await loginIsRequiredServer()
    const session = await getServerSession(authConfig)
    const userInfo: IMember = await getMember(session?.user?.email!)

    const sedinte = (
        <Card className="flex flex-col md:grid md:grid-cols-2 gap-4">
            <IstoricSedinte user={userInfo} />
            <Separator className="md:hidden" />
            <IstoricMinute />
        </Card>
    )

    const membri = (
        <div className="mb-4">
            <MembersPanel user={userInfo} />
        </div>
    )

    return (
        <main className="mt-5 md:mt-12 mx-16 max-md:mx-4">
            <h1 className="text-3xl font-bold tracking-tight mb-8">
                Dashboard
            </h1>
            <div className="md:grid md:grid-cols-3 flex flex-col gap-4 mb-4">
                <Card>
                    <MemberInfo user={userInfo} />
                </Card>
                <ImportantLinks />
                <CotizatieMembru />
            </div>
            <SectionsTab
                sedinte={sedinte}
                membri={membri}
                functii_secretar={
                    isSecretary(userInfo) && <AdaugareSedinta user={userInfo} />
                }
            />
        </main>
    )
}
