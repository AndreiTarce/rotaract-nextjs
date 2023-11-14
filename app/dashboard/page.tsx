import AdaugareSedinta from '@/components/ui/dashboard/AdaugareSedinta'
import CotizatieMembru from '@/components/ui/dashboard/CotizatieMembru'
import ImportantLinks from '@/components/ui/dashboard/ImportantLinks'
import IstoricMinute from '@/components/ui/dashboard/IstoricMinute'
import { authConfig, isSecretary, loginIsRequiredServer } from '@/lib/auth'
import { getMember } from '@/lib/entityService'
import { IMember } from '@/models/member'
import { getServerSession } from 'next-auth'

export default async function Dashboard() {
    await loginIsRequiredServer()
    const session = await getServerSession(authConfig)
    const userInfo: IMember = await getMember(session?.user?.email!)
    return (
        <main className="mt-5 md:mt-12 mx-16 max-md:mx-4">
            <h1 className="text-3xl font-bold tracking-tight mb-8">
                Dashboard
            </h1>
            <div className="md:grid md:grid-cols-3 flex flex-col gap-4 mb-4">
                <CotizatieMembru />
                <ImportantLinks />
            </div>
            <div className="flex flex-col gap-4">
                {isSecretary(userInfo) && <AdaugareSedinta />}
                <IstoricMinute />
            </div>
        </main>
    )
}
