import { authConfig } from '@/lib/auth';
import { Gauge, Menu, User } from 'lucide-react';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../avatar';
import { Button } from '../button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../dropdown-menu';
import { GoogleSignInButton, GoogleSignOutButton } from '../signin/authButton';
import HamburgerMenuNavLink from './HambugerMenuNavLink';

export default async function HamburgerMenu() {
    const session = await getServerSession(authConfig);
    return (
        <li className="md:hidden">
            <DropdownMenu>
                <DropdownMenuTrigger className="hidden max-md:flex">
                    <Button variant="outline" size="icon">
                        <Menu className="h-4 w-4" />
                        <span className="sr-only">Open navigation menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mt-3 w-screen">
                    <HamburgerMenuNavLink href="/" text="Acasă" />
                    <HamburgerMenuNavLink href="/about" text="Despre noi" />
                    <HamburgerMenuNavLink href="/projects" text="Proiecte" />
                    <HamburgerMenuNavLink href="/members" text="Membri" />
                    <HamburgerMenuNavLink href="/contact" text="Contact" />
                    <HamburgerMenuNavLink href="/support-us" text="Support us" />
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>
                        {session?.user ? (
                            <div className="flex gap-2">
                                <div>
                                    <Avatar>
                                        <AvatarImage
                                            src={session?.user?.image as string | undefined}
                                            alt="Profile picture"
                                        />
                                        <AvatarFallback>
                                            <User />
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                                <div className="flex flex-col">
                                    <span className="dark:text-gray-400">{session.user.name}</span>
                                    <span className="text-gray-600 dark:text-gray-500">
                                        {session.user.email}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <span className="text-base font-normal dark:text-gray-400">
                                Member login
                            </span>
                        )}
                    </DropdownMenuLabel>
                    {session?.user && (
                        <Link href="/dashboard" className="flex w-full">
                            <DropdownMenuItem className="w-full">
                                <Gauge className="mr-2" />
                                <span className="self-center">Members dashboard</span>
                            </DropdownMenuItem>
                        </Link>
                    )}
                    <div className="p-2">
                        {session?.user ? <GoogleSignOutButton /> : <GoogleSignInButton />}
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </li>
    );
}
