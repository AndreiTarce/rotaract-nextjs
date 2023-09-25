'use client'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import Image, { StaticImageData } from 'next/image'
import CauseImageCarousel from './CauseImageCarousel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@/components/ui/button'

interface ICauseProps {
    isOpen: boolean
    setIsOpen?: (value: boolean | ((prevVar: boolean) => boolean)) => void
    title: string
    img: StaticImageData
}

const CauseImage = (props: { src: StaticImageData; key: number }) => (
    <Image
        src={props.src}
        alt={`Cause photo ${props.key}`}
        width={400}
        height={400}
        className="rounded-lg"
    />
)

const downloadFile = async (url: string, filename: string) => {
    const data = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } })
    const blob = await data.blob()
    const objectUrl = URL.createObjectURL(blob)

    const link = document.createElement('a')

    link.setAttribute('href', objectUrl)
    link.setAttribute('download', filename)
    link.style.display = 'none'

    document.body.appendChild(link)

    link.click()

    document.body.removeChild(link)
}

export default function CauseDialog(props: ICauseProps) {
    return (
        <Dialog open={props.isOpen} onOpenChange={props.setIsOpen}>
            <DialogContent className="h-[80%] w-[80%] max-w-[80%] max-md:h-[90%] max-md:max-w-[90%] max-md:w-[90%] rounded-lg flex flex-col">
                <DialogHeader className="flex">
                    <DialogTitle className="text-5xl font-extrabold max-md:text-5xl mb-4 w-fit">
                        {props.title}
                    </DialogTitle>
                    <Button
                        className="w-fit max-md:hidden"
                        size="sm"
                        onClick={() =>
                            downloadFile(
                                'https://rotaract-visio-bucket.s3.eu-central-1.amazonaws.com/members/musteata-gabriela.png',
                                'test.png'
                            )
                        }
                    >
                        <FontAwesomeIcon icon={faDownload} className="mr-3" />
                        Mapa de prezentare
                    </Button>
                    <FontAwesomeIcon
                        icon={faDownload}
                        className="md:hidden absolute top-4 left-4 !my-0 text-[rgb(248, 250, 252)] opacity-70"
                    />
                </DialogHeader>
                <div className="overflow-y-auto overflow-x-hidden grow text-muted-foreground">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Explicabo sapiente optio vel minus, sequi facere
                        consequuntur nisi odit aperiam! Reiciendis neque labore
                        consequatur eveniet! Fuga explicabo deserunt magnam
                        reiciendis dolor? Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Minima corporis ea quo perferendis,
                        culpa accusantium mollitia asperiores obcaecati totam
                        harum. Voluptas quasi id neque? Reiciendis fugiat qui
                        eligendi accusantium voluptates. Lorem ipsum dolor sit
                        amet consectetur adipisicing elit. Dicta voluptatum
                        libero modi possimus mollitia, similique vel omnis nam
                        aperiam at obcaecati reprehenderit sit fugit doloribus
                        voluptates, necessitatibus hic natus voluptate. Lorem
                        ipsum dolor sit amet consectetur adipisicing elit. Velit
                        dolorem ad nisi. Perspiciatis nulla error, aperiam nihil
                        suscipit, architecto doloribus, placeat ipsa inventore
                        fugiat vitae molestiae consequuntur. Recusandae, totam
                        quam?
                    </p>
                </div>
                <div>
                    <CauseImageCarousel>
                        <CauseImage src={props.img} key={1} />
                        <CauseImage src={props.img} key={2} />
                        <CauseImage src={props.img} key={3} />
                        <CauseImage src={props.img} key={4} />
                        <CauseImage src={props.img} key={5} />
                        <CauseImage src={props.img} key={6} />
                        <CauseImage src={props.img} key={7} />
                        <CauseImage src={props.img} key={8} />
                        <CauseImage src={props.img} key={9} />
                        <CauseImage src={props.img} key={10} />
                        <CauseImage src={props.img} key={11} />
                        <CauseImage src={props.img} key={12} />
                    </CauseImageCarousel>
                </div>
            </DialogContent>
        </Dialog>
    )
}
