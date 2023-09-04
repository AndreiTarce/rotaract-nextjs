import { Gauge, Menu, User } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../dropdown-menu'
import { GoogleSignInButton, GoogleSignOutButton } from '../signin/authButton'
import { getServerSession } from 'next-auth'
import { authConfig } from '@/lib/auth'
import { Avatar, AvatarFallback, AvatarImage } from '../avatar'

export default async function HamburgerMenu() {
    const session = await getServerSession(authConfig)
    return (
        <li className="md:hidden">
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button
                        variant="outline"
                        size="icon"
                        className="max-md:flex hidden"
                    >
                        <Menu className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-screen mt-3">
                    <Link href="/">
                        <DropdownMenuItem className="text-lg">
                            Home
                        </DropdownMenuItem>
                    </Link>

                    <Link href="/about">
                        <DropdownMenuItem className="text-lg">
                            About us
                        </DropdownMenuItem>
                    </Link>
                    <Link href="/projects">
                        <DropdownMenuItem className="text-lg">
                            Projects
                        </DropdownMenuItem>
                    </Link>
                    <Link href="/members">
                        <DropdownMenuItem className="text-lg">
                            Members
                        </DropdownMenuItem>
                    </Link>
                    <Link href="/contact">
                        <DropdownMenuItem className="text-lg">
                            Contact
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>
                        {session?.user ? (
                            <div className="flex gap-2">
                                <div>
                                    <Avatar>
                                        <AvatarImage
                                            src={
                                                session?.user?.image as
                                                    | string
                                                    | undefined
                                            }
                                            alt="Profile picture"
                                        />
                                        <AvatarFallback>
                                            <User />
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                                <div className="flex flex-col">
                                    <span className="dark:text-gray-400">
                                        {session.user.name}
                                    </span>
                                    <span className="text-gray-600 dark:text-gray-500">
                                        {session.user.email}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <span className="dark:text-gray-400 font-normal text-base">
                                Member login
                            </span>
                        )}
                    </DropdownMenuLabel>
                    {session?.user && (
                        <Link href="/dashboard" className="flex">
                            <DropdownMenuItem>
                                <Gauge className="mr-2" />
                                <span className="self-center">
                                    Members dashboard
                                </span>
                            </DropdownMenuItem>
                        </Link>
                    )}
                    <div className="p-2">
                        {session?.user ? (
                            <GoogleSignOutButton />
                        ) : (
                            <GoogleSignInButton />
                        )}
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </li>
    )
}
