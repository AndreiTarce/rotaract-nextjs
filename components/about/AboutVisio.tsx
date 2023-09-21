import clujImage from '@/assets/images/cluj3.png'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import Value from './values/Value'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import ValuesCarousel from './values/ValuesCarousel'

export default function AboutVisio() {
    return (
        <Card className="overflow-hidden mx-16 max-md:mx-4 mt-8">
            <div className="md:grid md:grid-cols-[50%_50%] max-md:bg-[url('../assets/images/cluj_biserica2.png')] max-md:bg-cover max-md:bg-top">
                <Image
                    src={clujImage}
                    alt="Cluj-Napoca Church"
                    className="max-md:hidden brightness-75 h-full 2xl:max-h-[600px] object-cover object-right"
                />
                <div className="h-fit">
                    <CardHeader>
                        <CardTitle className="text-7xl font-extrabold max-md:text-5xl leading-none bg-gradient-to-r from-rotaract-cranberry to-rose-500 bg-clip-text text-transparent text-end">
                            Despre Visio
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-end dark:text-muted-foreground md:text-muted-foreground mb-8">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Tincidunt id aliquet risus
                            feugiat in ante. At elementum eu facilisis sed odio
                            morbi quis commodo. Pulvinar etiam non quam lacus
                            suspendisse faucibus. Vitae congue eu consequat ac
                            felis donec. Habitasse platea dictumst quisque
                            sagittis purus sit amet volutpat.
                        </div>
                        <ValuesCarousel>
                            <Value
                                icon={faUsers}
                                title="Prietenie"
                                text="Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Perspiciatis doloremque nesciunt optio. Qui
                            debitis fuga natus amet a nobis aspernatur! Suscipit
                            nam nostrum fuga nulla aliquid a eaque illum? Minus?"
                            />
                            <Value
                                icon={faUsers}
                                title="Prietenie"
                                text="Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Perspiciatis doloremque nesciunt optio. Qui
                            debitis fuga natus amet a nobis aspernatur! Suscipit
                            nam nostrum fuga nulla aliquid a eaque illum? Minus?"
                            />
                            <Value
                                icon={faUsers}
                                title="Prietenie"
                                text="Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Perspiciatis doloremque nesciunt optio. Qui
                            debitis fuga natus amet a nobis aspernatur! Suscipit
                            nam nostrum fuga nulla aliquid a eaque illum? Minus?"
                            />
                            <Value
                                icon={faUsers}
                                title="Prietenie"
                                text="Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Perspiciatis doloremque nesciunt optio. Qui
                            debitis fuga natus amet a nobis aspernatur! Suscipit
                            nam nostrum fuga nulla aliquid a eaque illum? Minus?"
                            />
                            <Value
                                icon={faUsers}
                                title="Prietenie"
                                text="Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Perspiciatis doloremque nesciunt optio. Qui
                            debitis fuga natus amet a nobis aspernatur! Suscipit
                            nam nostrum fuga nulla aliquid a eaque illum? Minus?"
                            />
                            <Value
                                icon={faUsers}
                                title="Prietenie"
                                text="Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Perspiciatis doloremque nesciunt optio. Qui
                            debitis fuga natus amet a nobis aspernatur! Suscipit
                            nam nostrum fuga nulla aliquid a eaque illum? Minus?"
                            />
                        </ValuesCarousel>
                    </CardContent>
                </div>
            </div>
        </Card>
    )
}
