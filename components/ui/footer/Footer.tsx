import logo from '@/assets/images/visio.webp';
import {
    ROTARACT_VISIO_FACEBOOK_URL,
    ROTARACT_VISIO_INSTAGRAM_URL,
    ROTARACT_VISIO_LINKEDIN_URL,
    ROTARACT_VISIO_TIKTOK_URL,
} from '@/lib/constants';
import { faFacebook, faInstagram, faLinkedin, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { Separator } from '../separator';

export default function Footer() {
    const today = new Date();
    return (
        <div className="dark:text-muted-foreground bottom-0 my-8">
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
                    <div className="flex w-full justify-center gap-8 justify-self-center max-md:flex max-md:flex-wrap max-md:justify-center max-md:gap-0 max-md:gap-y-4">
                        <Link href="/" className="max-md:w-1/3 max-md:text-center">
                            Home
                        </Link>
                        <Link href="/about" className="max-md:w-1/3 max-md:text-center">
                            About us
                        </Link>
                        <Link href="/projects" className="max-md:w-1/3 max-md:text-center">
                            Projects
                        </Link>
                        <Link href="/members" className="max-md:w-1/3 max-md:text-center">
                            Members
                        </Link>
                        <Link href="/contact" className="max-md:w-1/3 max-md:text-center">
                            Contact
                        </Link>
                    </div>
                    <div className="flex gap-4 justify-self-end">
                        <Link
                            href={ROTARACT_VISIO_INSTAGRAM_URL}
                            target="_blank"
                            aria-label="Check us out on Instagram"
                        >
                            <FontAwesomeIcon icon={faInstagram} size="xl" />
                        </Link>
                        <Link
                            href={ROTARACT_VISIO_FACEBOOK_URL}
                            target="_blank"
                            aria-label="Check us out on Facebook"
                        >
                            <FontAwesomeIcon icon={faFacebook} size="xl" />
                        </Link>
                        <Link
                            href={ROTARACT_VISIO_LINKEDIN_URL}
                            target="_blank"
                            aria-label="Check us out on Linkedin"
                        >
                            <FontAwesomeIcon icon={faLinkedin} size="xl" />
                        </Link>
                        <Link
                            href={ROTARACT_VISIO_TIKTOK_URL}
                            target="_blank"
                            aria-label="Check us out on TikTok"
                        >
                            <FontAwesomeIcon icon={faTiktok} size="xl" />
                        </Link>
                    </div>
                </div>
                <div className="mt-8 flex justify-center gap-2 text-center max-md:flex-col">
                    <span>Copyright © {today.getFullYear()} Rotaract Visio Cluj-Napoca</span>
                    <span className="max-md:hidden">|</span>
                    <span>All Rights Reserved</span>
                </div>
            </div>
        </div>
    );
}
