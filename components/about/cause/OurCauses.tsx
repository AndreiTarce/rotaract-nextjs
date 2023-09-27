import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getCauses } from '@/lib/entityService'
import { ICause } from '@/models/causes'
import CauseCard from './CauseCard'

export default async function OurCauses() {
    const { causes }: { causes: ICause[] } = await getCauses()
    return (
        <Card className="bg-gradient-to-tr from-rotaract-cranberry to-rose-500 shadow-md border rounded-lg grow flex flex-col">
            <CardHeader className="pb-4">
                <CardTitle className="text-7xl font-extrabold max-md:text-5xl text-white">
                    Cauze
                </CardTitle>
            </CardHeader>
            <CardContent className="grow flex flex-col justify-between">
                <p className="text-justify">
                    Fie că este vorba despre educație, sănătate, protejarea
                    mediului sau alte domenii de importanță socială, fiecare
                    proiect pe care îl organizăm este construit pe baza unei
                    cauze fundamentale. Aceste cauze reprezintă valorile și
                    credințele noastre, și ne amintesc constant de
                    responsabilitatea noastră de a face un impact pozitiv.
                </p>
                <div className="mt-4 grid grid-cols-3 w-fit">
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
    )
}
