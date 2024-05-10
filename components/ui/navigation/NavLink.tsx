'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '../button'

export default function NavLink(props: { text: string; href: string }) {
    const pathname = usePathname()
    const isExactMatch = pathname === props.href
    const isSubpath = props.href !== '/' && pathname.startsWith(props.href)

    return (
        <Link href={props.href}>
            <Button variant="outline" className="border-0 items-start">
                <div>
                    {props.text}
                    {isExactMatch || isSubpath ? (
                        <div className="h-[2px] w-2/3 bg-primary rounded-lg"></div>
                    ) : null}
                </div>
            </Button>
        </Link>
    )
}
