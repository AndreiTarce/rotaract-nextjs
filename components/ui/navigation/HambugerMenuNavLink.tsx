'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { DropdownMenuItem } from '../dropdown-menu'

export default function HamburgerMenuNavLink(props: {
    text: string
    href: string
}) {
    const pathname = usePathname()

    return (
        <Link href={props.href} className="w-full">
            <DropdownMenuItem className="text-lg flex flex-col items-start justify-start w-fit">
                {props.text}
                {pathname === props.href ? (
                    <div className="h-[2px] w-2/3 bg-primary rounded-lg"></div>
                ) : null}
            </DropdownMenuItem>
        </Link>
    )
}
