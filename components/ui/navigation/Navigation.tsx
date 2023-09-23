import Image from 'next/image'
import Link from 'next/link'

import logo from '../../../assets/images/visio.webp'
import { ModeToggle } from '../ModeToggle'
import { Separator } from '../separator'
import HamburgerMenu from './HamburgerMenu'
import NavLink from './NavLink'
import UserMenu from './UserMenu'

export function Navigation() {
    return (
        <nav className="sticky bg-inherit top-0 z-10">
            <div className="flex justify-between py-3 mx-16 max-md:mx-4">
                <Link href="/">
                    <Image
                        src={logo}
                        alt="Rotaract logo"
                        height={40}
                        quality={100}
                    />
                </Link>
                <ul className="flex flex-row gap-1">
                    <li className="max-md:hidden">
                        <NavLink href="/" text="Home" />
                    </li>
                    <li className="max-md:hidden">
                        <NavLink href="/about" text="About us" />
                    </li>
                    <li className="max-md:hidden">
                        <NavLink href="/projects" text="Projects" />
                    </li>
                    <li className="max-md:hidden">
                        <NavLink href="/members" text="Members" />
                    </li>
                    <li className="max-md:hidden">
                        <NavLink href="/contact" text="Contact" />
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
