'use client';

import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from '@/components/ui/drawer';
import useMediaQuery from '@/hooks/useMediaQuery';
import { ICause } from '@/models/causes';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import CauseImageCarousel from './CauseImageCarousel';

interface ICauseSetterProps {
    isOpen: boolean;
    setIsOpen?: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

type ICauseProps = ICause & ICauseSetterProps;

const CauseImage = (props: { src: string; key: number }) => (
    <Image
        src={props.src}
        alt={`Cause photo ${props.key}`}
        width={400}
        height={400}
        className="rounded-lg"
    />
);

export default function CauseDialog(props: ICauseProps) {
    const router = useRouter();
    const isDesktop = useMediaQuery('(min-width: 768px)');
    const [isDownloading, setIsDownloading] = useState(false);

    const downloadFile = async (url: string, filename?: string) => {
        setIsDownloading(true);
        const data = await fetch(url, {
            headers: { 'Cache-Control': 'no-cache' },
        });
        const blob = await data.blob();
        const objectUrl = URL.createObjectURL(blob);

        const link = document.createElement('a');

        link.setAttribute('href', objectUrl);
        if (filename) link.setAttribute('download', filename);
        link.style.display = 'none';

        document.body.appendChild(link);

        link.click();
        setIsDownloading(false);

        document.body.removeChild(link);
    };

    if (isDesktop)
        return (
            <Dialog
                open={props.isOpen}
                onOpenChange={(e) => {
                    props.setIsOpen!(false);
                    router.back();
                }}
            >
                <DialogContent className="flex h-[80%] w-[80%] max-w-[80%] flex-col rounded-lg max-md:h-[90%] max-md:w-[90%] max-md:max-w-[90%]">
                    <DialogHeader className="flex">
                        <DialogTitle className="mb-4 w-fit text-5xl font-extrabold max-md:mt-4 max-md:text-3xl">
                            {props.title}
                        </DialogTitle>
                        {props.downloadUrl && (
                            <>
                                <Button
                                    className="w-fit"
                                    size="sm"
                                    onClick={() =>
                                        downloadFile(props.downloadUrl, `Mapa ${props.title}.pdf`)
                                    }
                                    disabled={isDownloading}
                                >
                                    {isDownloading ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="1em"
                                            viewBox="0 0 512 512"
                                            className="dark:fill-dark mr-2 animate-spin fill-white"
                                        >
                                            <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
                                        </svg>
                                    ) : (
                                        <FontAwesomeIcon icon={faDownload} className="mr-3" />
                                    )}
                                    Mapa de prezentare
                                </Button>
                                <FontAwesomeIcon
                                    icon={faDownload}
                                    className="text-[rgb(248, 250, 252)] absolute top-4 left-4 my-0! opacity-70 md:hidden!"
                                    onClick={() =>
                                        downloadFile(props.downloadUrl, `Mapa ${props.title}.pdf`)
                                    }
                                />
                            </>
                        )}
                    </DialogHeader>
                    <div className="text-muted-foreground grow overflow-x-hidden overflow-y-auto pr-2">
                        <p
                            dangerouslySetInnerHTML={{
                                __html: props.description,
                            }}
                        ></p>
                    </div>
                    {props.images && (
                        <div>
                            <CauseImageCarousel>
                                {props.images.map((image: string, index: number) => (
                                    <CauseImage src={image} key={index} />
                                ))}
                            </CauseImageCarousel>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        );

    return (
        <Drawer
            open={props.isOpen}
            onClose={() => {
                props.setIsOpen!(false);
                router.back();
            }}
            fixed
            shouldScaleBackground={false}
        >
            <DrawerContent className="bg-background">
                <DrawerHeader>
                    <DrawerTitle className="text-xl">{props.title}</DrawerTitle>
                    <DrawerDescription className="mt-2">
                        {props.downloadUrl && (
                            <Button
                                className="w-fit"
                                size="sm"
                                onClick={() =>
                                    downloadFile(props.downloadUrl, `Mapa ${props.title}.pdf`)
                                }
                                disabled={isDownloading}
                            >
                                {isDownloading ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="1em"
                                        viewBox="0 0 512 512"
                                        className="dark:fill-dark mr-2 animate-spin fill-white"
                                    >
                                        <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
                                    </svg>
                                ) : (
                                    <FontAwesomeIcon icon={faDownload} className="mr-3" />
                                )}
                                Mapa de prezentare
                            </Button>
                        )}
                    </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter className="max-h-[60vh]">
                    <div className="text-muted-foreground grow overflow-y-auto pr-2">
                        <p
                            dangerouslySetInnerHTML={{
                                __html: props.description,
                            }}
                        ></p>
                    </div>
                    {props.images && (
                        <Carousel
                            opts={{ loop: true }}
                            plugins={[
                                Autoplay({
                                    delay: 4000,
                                }),
                            ]}
                        >
                            <CarouselContent>
                                {props.images.map((image: string, index: number) => (
                                    <CarouselItem
                                        key={`carousel-item-${index}`}
                                        className="basis-1/3"
                                    >
                                        <CauseImage src={image} key={index} />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    )}
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
