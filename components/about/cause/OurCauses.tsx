import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getCauses } from '@/lib/entityService'
import { ICause } from '@/models/causes'
import CauseCard from './CauseCard'

export default async function OurCauses() {
    const { causes }: { causes: ICause[] } = await getCauses()
    return (
        <Card className="bg-gradient-to-tr from-rotaract-cranberry to-rose-500 shadow-md border rounded-lg grow flex flex-col">
            <CardHeader>
                <CardTitle className="text-7xl font-extrabold max-md:text-5xl text-white">
                    Cauze
                </CardTitle>
            </CardHeader>
            <CardContent className="grow flex flex-col justify-between">
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Maxime esse reprehenderit ut! Enim placeat porro neque
                    fugiat culpa sunt veniam dolor nemo, non sequi possimus
                    natus sapiente vero libero animi.
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
