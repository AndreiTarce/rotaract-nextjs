'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../button';

export default function NavLink(props: { text: string; href: string }) {
    const pathname = usePathname();
    const isExactMatch = pathname === props.href;
    const isSubpath = props.href !== '/' && pathname.startsWith(props.href);

    return (
        <Button variant="outline" className="items-start border-0" asChild>
            <Link href={props.href}>
                <div>
                    {props.text}
                    {isExactMatch || isSubpath ? (
                        <div className="bg-primary h-[2px] w-2/3 rounded-lg"></div>
                    ) : null}
                </div>
            </Link>
        </Button>
    );
}
