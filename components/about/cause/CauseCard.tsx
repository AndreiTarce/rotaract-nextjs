'use client'

import { faExpand } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image, { StaticImageData } from 'next/image'
import CauseDialog from './CauseDialog'
import { useState } from 'react'

export default function CauseCard(props: {
    title: string
    img: StaticImageData
}) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div>
            <div
                className="p-2 relative rounded-lg w-fit h-fit max-w-[150px] hover:shadow-lg hover:scale-105 hover:cursor-pointer hover:bg-black hover:!bg-opacity-10"
                onClick={() => setIsOpen(true)}
            >
                <div className="relative">
                    <Image
                        src={props.img}
                        alt="Cauza"
                        width={135}
                        height={135}
                        className="rounded-lg"
                    />
                    <FontAwesomeIcon
                        icon={faExpand}
                        className="absolute top-4 right-4 z-10 text-white"
                    />
                    <div className="bg-gradient-to-b from-black to-transparent absolute top-0 h-1/2 w-full rounded-lg opacity-60"></div>
                </div>
                <p className="font-semibold text-base mt-2 text-white leading-none">
                    {props.title}
                </p>
            </div>
            <CauseDialog
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title={props.title}
                img={props.img}
            />
        </div>
    )
}
