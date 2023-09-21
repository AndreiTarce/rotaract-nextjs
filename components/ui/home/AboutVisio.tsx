import Image from 'next/image'
import { Card, CardHeader, CardTitle } from '../card'
import clujImage from '@/assets/images/cluj3.png'
import clujImage2 from '@/assets/images/cluj_biserica.png'

export default function AboutVisio() {
    return (
        <div className="mx-16 max-md:mx-4 mt-8">
            <Card className="overflow-hidden">
                <div className="md:grid md:grid-cols-[50%_50%] max-md:bg-[url('../assets/images/cluj_biserica.png')] max-md:bg-cover">
                    <Image
                        src={clujImage}
                        alt="Cluj-Napoca Church"
                        className="max-md:hidden brightness-75"
                    />
                    <div>
                        <CardHeader>
                            <CardTitle className="text-7xl font-extrabold max-md:text-5xl leading-none bg-gradient-to-r from-rotaract-cranberry to-rose-500 bg-clip-text text-transparent text-end">
                                Despre Visio
                            </CardTitle>
                        </CardHeader>
                    </div>
                </div>
            </Card>
        </div>
    )
}
