'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '../button'

export default function NavLink(props: { text: string; href: string }) {
    const pathname = usePathname()

    return (
        <Link href={props.href}>
            <Button variant="outline" className="border-0 items-start">
                <div>
                    {props.text}
                    {pathname === props.href ? (
                        <div className="h-[2px] w-2/3 bg-primary rounded-lg"></div>
                    ) : null}
                </div>
            </Button>
        </Link>
    )
}
