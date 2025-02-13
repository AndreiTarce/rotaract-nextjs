'use client';

import useMediaQuery from '@/hooks/useMediaQuery';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '../ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '../ui/dialog';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from '../ui/drawer';

export interface CatrafusaleWorkshopCardProps {
    title: string;
    image: string;
    description: string;
    price: number;
}

export default function CatrafusaleWorkshopCard(
    props: CatrafusaleWorkshopCardProps
) {
    const isDesktop = useMediaQuery('(min-width: 768px)');
    const [open, setOpen] = useState(false);

    return (
        <div>
            <div
                className="relative rounded-lg p-2 lg:hover:scale-105 lg:hover:cursor-pointer lg:hover:bg-black/10 lg:hover:shadow-lg"
                onClick={() => setOpen(true)}
            >
                <div className="relative aspect-square">
                    <Image
                        src={props.image}
                        alt="Cauza"
                        fill
                        sizes="(min-width: 808px) 50vw, 100vw"
                        style={{
                            objectFit: 'cover',
                        }}
                        className="rounded-lg"
                    />
                    <FontAwesomeIcon
                        icon={faExpand}
                        className="absolute top-4 right-4 z-10 text-white"
                    />
                    <div className="absolute top-0 h-1/2 w-full rounded-lg bg-linear-to-b from-black to-transparent opacity-60"></div>
                    <div className="text-card dark:text-foreground absolute top-3 left-4 rounded-lg text-2xl font-bold">
                        {props.price}
                        RON
                    </div>
                </div>
                <p className="text-foreground dark:text-card mt-2 text-lg leading-none font-semibold md:text-base">
                    {props.title}
                </p>
            </div>
            {isDesktop && (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{props.title}</DialogTitle>
                            <DialogDescription className="text-justify text-base">
                                <div className="mb-4 font-semibold">
                                    Preț: {props.price}RON
                                </div>
                                {props.description}
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            )}

            {!isDesktop && (
                <Drawer open={open} onOpenChange={setOpen}>
                    <DrawerContent>
                        <DrawerHeader className="text-left">
                            <DrawerTitle className="text-lg">
                                {props.title}
                            </DrawerTitle>
                            <DrawerDescription className="text-justify text-base">
                                <div className="mb-4 font-semibold">
                                    Preț: {props.price}RON
                                </div>
                                {props.description}
                            </DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter className="pt-2">
                            <DrawerClose asChild>
                                <Button variant="outline">Închidere</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            )}
        </div>
    );
}
