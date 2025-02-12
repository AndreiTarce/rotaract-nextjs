'use client';

import { ICause } from '@/models/causes';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import CauseDialog from './CauseDialog';

export default function CauseCard(props: ICause) {
    const [isOpen, setIsOpen] = useState(false);
    const searchParams = useSearchParams();
    const cause = searchParams.get('cause');
    return (
        <div>
            <Link href={`about/?cause=${props.title}`} scroll={false}>
                <div className="relative max-w-[180px] rounded-lg p-2 hover:scale-105 hover:cursor-pointer hover:bg-black/10 hover:shadow-lg">
                    <div className="relative">
                        <Image
                            src={props.images[0]}
                            alt="Cauza"
                            width={180}
                            height={180}
                            className="rounded-lg"
                        />
                        <FontAwesomeIcon
                            icon={faExpand}
                            className="absolute top-4 right-4 z-10 text-white"
                        />
                        <div className="absolute top-0 h-1/2 w-full rounded-lg bg-linear-to-b from-black to-transparent opacity-60"></div>
                    </div>
                    <p className="mt-2 text-xs leading-none font-semibold text-white md:text-base">
                        {props.title}
                    </p>
                </div>
            </Link>
            {cause && (
                <CauseDialog
                    isOpen={true}
                    setIsOpen={setIsOpen}
                    title={props.title}
                    description={props.description}
                    images={props.images}
                    downloadUrl={props.downloadUrl}
                />
            )}
        </div>
    );
}
