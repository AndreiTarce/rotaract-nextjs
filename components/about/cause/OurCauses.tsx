import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCauses } from '@/lib/entityService';
import { ICause } from '@/models/causes';
import CauseCard from './CauseCard';

export const dynamic = 'force-dynamic';

export default async function OurCauses() {
    const causes = (await getCauses()) as ICause[];
    return (
        <Card className="flex grow flex-col rounded-lg border bg-linear-to-tr from-rotaract-cranberry to-rose-500 shadow-md">
            <CardHeader className="pb-4">
                <CardTitle className="text-7xl font-extrabold text-white max-md:text-5xl">
                    Cauze
                </CardTitle>
            </CardHeader>
            <CardContent className="flex grow flex-col justify-between">
                <p className="text-justify text-white">
                    Fie că este vorba despre educație, sănătate, protejarea
                    mediului sau alte domenii de importanță socială, fiecare
                    proiect pe care îl organizăm este construit pe baza unei
                    cauze fundamentale. Aceste cauze reprezintă valorile și
                    credințele noastre, și ne amintesc constant de
                    responsabilitatea noastră de a face un impact pozitiv.
                </p>
                <div className="mt-4 grid w-fit grid-cols-3">
                    {causes.map((cause: ICause, index: number) => (
                        <CauseCard
                            title={cause.title}
                            images={cause.images}
                            description={cause.description}
                            downloadUrl={cause.downloadUrl}
                            key={index}
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
