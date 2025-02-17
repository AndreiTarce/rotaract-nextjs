import DashboardCardSkeleton from '@/components/dashboard/DashboardCardSkeleton';

export default function DashboardLoading() {
    return (
        <main className="mx-16 mt-5 max-md:mx-4 md:mt-12">
            <h1 className="mb-8 text-3xl font-bold tracking-tight">Dashboard</h1>
            <DashboardCardSkeleton />
        </main>
    );
}
