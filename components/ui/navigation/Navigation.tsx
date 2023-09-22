import Image from 'next/image'
import Link from 'next/link'

import { Facebook, Instagram } from 'lucide-react'

import logo from '../../../assets/images/visio.png'
import { ModeToggle } from '../ModeToggle'
import { Button } from '../button'
import { Separator } from '../separator'
import HamburgerMenu from './HamburgerMenu'
import UserMenu from './UserMenu'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Navigation() {
    return (
        <nav className="sticky bg-inherit top-0 z-10">
            <div className="flex justify-between py-3 mx-16 max-md:mx-4">
                <Link href="/">
                    <Image
                        src={logo}
                        alt="Rotaract logo"
                        height={40}
                        className="sticky top-4 left-16 max-md:top-4 max-md:left-8"
                        quality={100}
                    />
                </Link>
                <ul className="flex flex-row gap-1">
                    <li className="max-md:hidden">
                        <Link href="/">
                            <Button variant="outline" className="border-0">
                                Home
                            </Button>
                        </Link>
                    </li>
                    <li className="max-md:hidden">
                        <Link href="/about">
                            <Button variant="outline" className="border-0">
                                About us
                            </Button>
                        </Link>
                    </li>
                    <li className="max-md:hidden">
                        <Link href="/projects">
                            <Button variant="outline" className="border-0">
                                Projects
                            </Button>
                        </Link>
                    </li>
                    <li className="max-md:hidden">
                        <Link href="/members">
                            <Button variant="outline" className="border-0">
                                Members
                            </Button>
                        </Link>
                    </li>
                    <li className="max-md:hidden">
                        <Link href="/contact">
                            <Button variant="outline" className="border-0">
                                Contact
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="https://www.instagram.com/rotaractvisiocj/"
                            target="_blank"
                        >
                            <Button size="icon" variant="outline">
                                <Instagram />
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="https://www.facebook.com/RotaractVisioClujNapoca"
                            target="_blank"
                        >
                            <Button size="icon" variant="outline">
                                <Facebook />
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <ModeToggle />
                    </li>
                    <li className="max-md:hidden">
                        <UserMenu />
                    </li>
                    <HamburgerMenu />
                </ul>
            </div>
            <Separator />
        </nav>
    )
}
