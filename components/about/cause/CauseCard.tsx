'use client'

import { ICause } from '@/models/causes'
import { faExpand } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import CauseDialog from './CauseDialog'

export default function CauseCard(props: ICause) {
    const [isOpen, setIsOpen] = useState(false)
    const searchParams = useSearchParams()
    const cause = searchParams.get('cause')
    return (
        <div>
            <Link href={`about/?cause=${props.title}`} scroll={false}>
                <div className="p-2 relative rounded-lg  max-w-[180px] hover:shadow-lg hover:scale-105 hover:cursor-pointer hover:bg-black hover:bg-opacity-10!">
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
                        <div className="bg-linear-to-b from-black to-transparent absolute top-0 h-1/2 w-full rounded-lg opacity-60"></div>
                    </div>
                    <p className="font-semibold text-xs md:text-base mt-2 text-white leading-none">
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
    )
}
