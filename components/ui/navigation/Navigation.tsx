import Image from 'next/image';
import Link from 'next/link';

import logo from '../../../assets/images/visio.webp';
import { ModeToggle } from '../ModeToggle';
import { Separator } from '../separator';
import HamburgerMenu from './HamburgerMenu';
import NavLink from './NavLink';
import UserMenu from './UserMenu';

export function Navigation() {
    return (
        <nav className="sticky top-0 z-50 w-full bg-inherit">
            <div className="mx-16 flex justify-between py-3 max-md:mx-4">
                <Link href="/">
                    <Image src={logo} alt="Rotaract logo" height={40} quality={100} />
                </Link>
                <ul className="flex flex-row gap-1">
                    <li className="max-md:hidden">
                        <NavLink href="/" text="Acasă" />
                    </li>
                    <li className="max-md:hidden">
                        <NavLink href="/about" text="Despre noi" />
                    </li>
                    <li className="max-md:hidden">
                        <NavLink href="/projects" text="Proiecte" />
                    </li>
                    <li className="max-md:hidden">
                        <NavLink href="/members" text="Membri" />
                    </li>
                    <li className="max-md:hidden">
                        <NavLink href="/contact" text="Contact" />
                    </li>
                    <li className="max-md:hidden">
                        <NavLink href="/support-us" text="Support us" />
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
    );
}
