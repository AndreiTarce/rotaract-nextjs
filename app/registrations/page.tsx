import { CatrafusaleRegistrationInteractor } from '@/interactors/catrafusaleRegistrationInteractor';
import { loginIsRequiredServer } from '@/lib/auth';
import connectMongoDB from '@/lib/mongodb';
import { columns } from './columns';
import { DataTable } from './data-table';

const registrationInteractor = new CatrafusaleRegistrationInteractor();

export default async function Registrations() {
    await connectMongoDB();
    const registrations = await registrationInteractor.getRegistrations();
    const newRegistrations = registrations.map((registration, index) => ({
        position: index + 1,
        ...registration,
    }));

    await loginIsRequiredServer();

    return (
        <main className="mx-16 mt-5 max-md:mx-4 md:mt-12">
            <div className="mb-8">
                <h1 className="mb-2 text-3xl font-bold tracking-tight">
                    Registrations
                </h1>
                <div className="text-muted-foreground">
                    CATRAFUSALE 2024 Winter Edition
                </div>
            </div>

            <DataTable columns={columns} data={newRegistrations} />
        </main>
    );
}
