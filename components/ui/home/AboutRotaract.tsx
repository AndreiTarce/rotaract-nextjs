import { faGlobe, faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, CardContent, CardHeader, CardTitle } from '../card'
import { Separator } from '../separator'
import AboutRotaractSlider from './AboutRotaractSlider'

const firstParagraph = (
    <div className="flex gap-8 max-md:flex-col">
        <p className="text-muted-foreground text-justify">
            <b>Rotaract </b>
            este o comunitate globală de <b>tineri profesionisti</b> cu vârste
            de peste 18 ani, care sunt interesați să aibă un{' '}
            <b>impact pozitiv</b> asupra comunităților lor și asupra lumii. Este
            o ramură orientată spre tineret a Rotary International, care este o
            organizație mondiala renumita. Rotaract combină cuvintele
            &quot;Rotary&quot; și &quot;Action&quot; pentru a sublinia
            angajamentul său de a{' '}
            <b>acționa pentru a crea schimbări pozitive</b>.
        </p>
        <FontAwesomeIcon icon={faGlobe} className="text-7xl max-md:text-9xl" />
    </div>
)

const secondParagraph = (
    <div className="flex gap-8 max-md:flex-col">
        <FontAwesomeIcon
            icon={faHandHoldingHeart}
            className="text-7xl max-md:order-2 max-md:text-9xl"
        />
        <p className="text-muted-foreground text-justify">
            Cluburile Rotaract organizează proiecte de servicii,{' '}
            <b>stimulează </b>
            abilitățile de leadership, <b>promovează</b> înțelegerea culturală,{' '}
            <b>strâng </b>
            <b>fonduri</b> pentru cauze caritabile, <b>se implică</b> în
            comunitățile locale și <b>încurajează</b> relatiile sociale între
            membri. Acesta împuternicește tinerii adulți să devină lideri
            responsabili și conștienți din punct de vedere social, lucrând
            pentru <b>schimbări pozitive</b> la nivel local și global.
        </p>
    </div>
)

export default function AboutRotaract() {
    return (
        <div className="mx-16 max-md:mx-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-7xl font-extrabold max-md:text-5xl leading-none bg-gradient-to-r from-rotaract-cranberry to-rose-500 bg-clip-text text-transparent">
                        Despre Rotaract
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-8 max-md:hidden">
                        {firstParagraph}
                        <Separator />
                        {secondParagraph}
                    </div>
                    <AboutRotaractSlider>
                        {firstParagraph}
                        {secondParagraph}
                    </AboutRotaractSlider>
                </CardContent>
            </Card>
        </div>
    )
}
