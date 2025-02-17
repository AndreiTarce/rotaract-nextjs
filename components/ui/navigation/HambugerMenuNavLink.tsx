'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DropdownMenuItem } from '../dropdown-menu';

export default function HamburgerMenuNavLink(props: { text: string; href: string }) {
    const pathname = usePathname();
    const isExactMatch = pathname === props.href;
    const isSubpath = props.href !== '/' && pathname.startsWith(props.href);

    return (
        <Link href={props.href} className="w-full">
            <DropdownMenuItem className="flex w-full flex-col items-start justify-start text-lg">
                <div className="w-fit">
                    {props.text}
                    {isExactMatch || isSubpath ? (
                        <div className="bg-primary h-[2px] w-2/3 rounded-lg"></div>
                    ) : null}
                </div>
            </DropdownMenuItem>
        </Link>
    );
}
