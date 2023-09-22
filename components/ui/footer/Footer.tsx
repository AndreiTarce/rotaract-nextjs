import logo from '@/assets/images/visio.webp'
import {
    faFacebook,
    faInstagram,
    faLinkedin,
    faTiktok,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import { Separator } from '../separator'

export default function Footer() {
    return (
        <div className="my-8 dark:text-muted-foreground bottom-0">
            <Separator className="mb-8" />
            <div className="mx-16 max-md:mx-4">
                <div className="grid grid-cols-3 grid-rows-1 gap-0 max-md:flex max-md:flex-col max-md:items-center max-md:gap-8">
                    <Image
                        src={logo}
                        alt="Rotaract Visio logo"
                        height={40}
                        className="justify-self-start max-md:w-[40vw]"
                        quality={100}
                    />
                    <div className="flex gap-8 justify-self-center justify-center w-full max-md:flex max-md:flex-wrap max-md:justify-center max-md:gap-0 max-md:gap-y-4">
                        <Link
                            href="/"
                            className="max-md:w-1/3 max-md:text-center"
                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            className="max-md:w-1/3 max-md:text-center"
                        >
                            About us
                        </Link>
                        <Link
                            href="/projects"
                            className="max-md:w-1/3 max-md:text-center"
                        >
                            Projects
                        </Link>
                        <Link
                            href="/members"
                            className="max-md:w-1/3 max-md:text-center"
                        >
                            Members
                        </Link>
                        <Link
                            href="/contact"
                            className="max-md:w-1/3 max-md:text-center"
                        >
                            Contact
                        </Link>
                    </div>
                    <div className="flex gap-4 justify-self-end">
                        <Link
                            href="https://www.instagram.com/rotaractvisiocj/"
                            target="_blank"
                        >
                            <FontAwesomeIcon icon={faInstagram} size="xl" />
                        </Link>
                        <Link
                            href="https://www.facebook.com/RotaractVisioClujNapoca"
                            target="_blank"
                        >
                            <FontAwesomeIcon icon={faFacebook} size="xl" />
                        </Link>
                        <Link
                            href="https://www.linkedin.com/company/rotaract-cluj-napoca-visio/"
                            target="_blank"
                        >
                            <FontAwesomeIcon icon={faLinkedin} size="xl" />
                        </Link>
                        <Link
                            href="https://www.tiktok.com/@rotaractvisiocluj"
                            target="_blank"
                        >
                            <FontAwesomeIcon icon={faTiktok} size="xl" />
                        </Link>
                    </div>
                </div>
                <div className="flex justify-center mt-8 text-center gap-2 max-md:flex-col">
                    <span>Copyright © 2023 Rotaract Visio Cluj-Napoca</span>
                    <span className="max-md:hidden">|</span>
                    <span>All Rights Reserved</span>
                </div>
            </div>
        </div>
    )
}
