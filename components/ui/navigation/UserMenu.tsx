import { authConfig } from '@/lib/auth'
import { Gauge, User } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { ModeToggleSwitch } from '../ModeToggle'
import { Avatar, AvatarFallback, AvatarImage } from '../avatar'
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
import Link from 'next/link'

export default async function UserMenu() {
    const session = await getServerSession(authConfig)
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger>
                <Button size="icon" variant="outline">
                    <User />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
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
                        'Member login'
                    )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {session?.user && (
                    <DropdownMenuItem>
                        <Link href="/dashboard" className="flex">
                            <Gauge className="mr-2" />
                            <span className="self-center">
                                Members dashboard
                            </span>
                        </Link>
                    </DropdownMenuItem>
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
    )
}
