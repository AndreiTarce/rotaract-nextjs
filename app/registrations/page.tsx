import { Separator } from '@/components/ui/separator';
import {
    CatrafusaleRegistrationInteractor,
    CatrafusaleWorkshopRegistrationInteractor,
} from '@/interactors/catrafusaleRegistrationInteractor';
import { loginIsRequiredServer } from '@/lib/auth';
import connectMongoDB from '@/lib/mongodb';
import { catrafusaleColumns } from './catrafusaleColumns';
import { catrafusaleWorkshopColumns } from './catrafusaleWorkshopColumns';
import { DataTable } from './data-table';

const registrationInteractor = new CatrafusaleRegistrationInteractor();
const workshopRegistrationInteractor = new CatrafusaleWorkshopRegistrationInteractor();

export default async function Registrations() {
    await connectMongoDB();
    const registrations = await registrationInteractor.getRegistrations();
    const newRegistrations = registrations.map((registration, index) => ({
        position: index + 1,
        ...registration,
    }));
    const workshopRegistrations = await workshopRegistrationInteractor.getRegistrations();
    const newWorkshopRegistrations = workshopRegistrations.map((registration, index) => ({
        position: index + 1,
        ...registration,
    }));

    await loginIsRequiredServer();

    return (
        <main className="mx-16 mt-5 max-md:mx-4 md:mt-12">
            <div className="mb-8">
                <h1 className="mb-2 text-3xl font-bold tracking-tight">Registrations</h1>
                <div className="text-muted-foreground">CATRAFUSALE 2024 Winter Edition</div>
            </div>

            <h2 className="mb-2">Înregistrări CATRAFUSALE</h2>
            <DataTable columns={catrafusaleColumns} data={newRegistrations} />
            <Separator className="my-4" />
            <h2 className="mb-2">Înregistrări Workshops</h2>
            <DataTable columns={catrafusaleWorkshopColumns} data={newWorkshopRegistrations} />
        </main>
    );
}
