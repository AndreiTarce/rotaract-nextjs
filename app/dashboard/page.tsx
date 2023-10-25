import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import CotizatieMembru from '@/components/ui/dashboard/CotizatieMembru'
import ImportantLinks from '@/components/ui/dashboard/ImportantLinks'
import IstoricMinute from '@/components/ui/dashboard/IstoricMinute'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { loginIsRequiredServer } from '@/lib/auth'

export default async function Dashboard() {
    await loginIsRequiredServer()
    return (
        <main className="mt-5 md:mt-12 mx-16 max-md:mx-4">
            <h1 className="text-3xl font-bold tracking-tight mb-8">
                Dashboard
            </h1>
            <div className="md:grid md:grid-cols-3 flex flex-col gap-4 mb-4">
                <CotizatieMembru />
                <ImportantLinks />
            </div>
            <IstoricMinute />
        </main>
    )
}
