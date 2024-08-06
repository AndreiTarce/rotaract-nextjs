import { Card } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

export default function DashboardCardSkeleton() {
    return (
        <Card className="flex flex-col space-y-3 p-6">
            <Skeleton className="h-[125px] rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4" />
                <Skeleton className="h-4" />
            </div>
        </Card>
    );
}
