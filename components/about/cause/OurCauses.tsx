import img from '@/assets/images/testcauza.png'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CauseCard from './CauseCard'

export default function OurCauses() {
    return (
        <Card className="mt-8 bg-gradient-to-tr from-rotaract-cranberry to-rose-500 shadow-md border rounded-lg">
            <CardHeader>
                <CardTitle className="text-7xl font-extrabold max-md:text-5xl text-white">
                    Cauze
                </CardTitle>
            </CardHeader>
            <CardContent>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime
                esse reprehenderit ut! Enim placeat porro neque fugiat culpa
                sunt veniam dolor nemo, non sequi possimus natus sapiente vero
                libero animi.
                <div className="mt-4 grid grid-cols-3 w-fit">
                    <CauseCard
                        title="Scoala Panticeu asjjkfa jkasf jkasf hjk"
                        img={img}
                    />
                    <CauseCard title="Scoala Panticeu" img={img} />
                    <CauseCard title="Scoala Panticeu" img={img} />
                </div>
            </CardContent>
        </Card>
    )
}
