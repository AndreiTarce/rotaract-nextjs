'use client'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { ICause } from '@/models/causes'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import CauseImageCarousel from './CauseImageCarousel'
import { useRouter } from 'next/navigation'

interface ICauseSetterProps {
    isOpen: boolean
    setIsOpen?: (value: boolean | ((prevVar: boolean) => boolean)) => void
}

type ICauseProps = ICause & ICauseSetterProps

const CauseImage = (props: { src: string; key: number }) => (
    <Image
        src={props.src}
        alt={`Cause photo ${props.key}`}
        width={400}
        height={400}
        className="rounded-lg"
    />
)

const downloadFile = async (url: string, filename?: string) => {
    const data = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } })
    const blob = await data.blob()
    const objectUrl = URL.createObjectURL(blob)

    const link = document.createElement('a')

    link.setAttribute('href', objectUrl)
    if (filename) link.setAttribute('download', filename)
    link.style.display = 'none'

    document.body.appendChild(link)

    link.click()

    document.body.removeChild(link)
}

export default function CauseDialog(props: ICauseProps) {
    const router = useRouter()
    return (
        <Dialog
            open={props.isOpen}
            onOpenChange={(e) => {
                props.setIsOpen!(false)
                router.back()
            }}
        >
            <DialogContent className="h-[80%] w-[80%] max-w-[80%] max-md:h-[90%] max-md:max-w-[90%] max-md:w-[90%] rounded-lg flex flex-col">
                <DialogHeader className="flex">
                    <DialogTitle className="text-5xl font-extrabold max-md:text-3xl max-md:mt-4 mb-4 w-fit">
                        {props.title}
                    </DialogTitle>
                    {props.downloadUrl && (
                        <>
                            <Button
                                className="w-fit max-md:hidden"
                                size="sm"
                                onClick={() =>
                                    downloadFile(
                                        props.downloadUrl,
                                        `Mapa ${props.title}.pdf`
                                    )
                                }
                            >
                                <FontAwesomeIcon
                                    icon={faDownload}
                                    className="mr-3"
                                />
                                Mapa de prezentare
                            </Button>
                            <FontAwesomeIcon
                                icon={faDownload}
                                className="md:!hidden absolute top-4 left-4 !my-0 text-[rgb(248, 250, 252)] opacity-70"
                                onClick={() =>
                                    downloadFile(
                                        props.downloadUrl,
                                        `Mapa ${props.title}.pdf`
                                    )
                                }
                            />
                        </>
                    )}
                </DialogHeader>
                <div className="overflow-y-auto overflow-x-hidden grow text-muted-foreground pr-2">
                    <p
                        dangerouslySetInnerHTML={{
                            __html: props.description,
                        }}
                    ></p>
                </div>
                {props.images && (
                    <div>
                        <CauseImageCarousel>
                            {props.images.map(
                                (image: string, index: number) => (
                                    <CauseImage src={image} key={index} />
                                )
                            )}
                        </CauseImageCarousel>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
