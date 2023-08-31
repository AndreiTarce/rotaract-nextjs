"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import { Menu, Instagram, Facebook } from 'lucide-react'

import logo from '../../../assets/images/visio.png'
import { ModeToggle } from "../ModeToggle"
import { Button } from "../button"
import { Separator } from "../separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../dropdown-menu"

export function Navigation() {
    return (
        <div className="fixed top-0 w-full z-10 bg-inherit">
            <nav className="flex justify-between my-3 mx-16 max-md:mx-4 max-h-12 items-center">
                <Link href="/">
                    <Image
                        src={logo}
                        alt="Rotaract logo"
                        height={40}
                        className="sticky top-4 left-16 max-md:top-4 max-md:left-8"
                        quality={100}
                    />
                </Link>
                <ul className="flex flex-row gap-1">
                    <li className="max-md:hidden">
                        <Link
                            className={navigationMenuTriggerStyle()}
                            href="/"
                        >
                            Home
                        </Link>
                    </li>
                    <li className="max-md:hidden">
                        <Link
                            className={navigationMenuTriggerStyle()}
                            href="/about"
                        >
                            About us
                        </Link>
                    </li>
                    <li className="max-md:hidden">
                        <Link
                            className={navigationMenuTriggerStyle()}
                            href="/projects"
                        >
                            Projects
                        </Link>
                    </li>
                    <li className="max-md:hidden">
                        <Link
                            className={navigationMenuTriggerStyle()}
                            href="/members"
                        >
                            Members
                        </Link>
                    </li>
                    <li className="max-md:hidden">
                        <Link
                            className={navigationMenuTriggerStyle()}
                            href="/contact"
                        >
                            Contact
                        </Link>
                    </li>
                    {/* <li className="max-md:hidden">
                        <Link
                            className={navigationMenuTriggerStyle()}
                            href="/dashboard"
                        >
                            Member dashboard
                        </Link>
                    </li> */}
                    <li>
                        <Link
                            href='https://www.instagram.com/rotaractvisiocj/'
                        >
                            <Button size='icon' variant='outline'>
                                <Instagram />
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href='https://www.facebook.com/RotaractVisioClujNapoca'
                        >
                            <Button size='icon' variant='outline'>
                                <Facebook />
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <ModeToggle />
                    </li>

                    <li>

                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Button variant="outline" size="icon" className="max-md:flex hidden">
                                    <Menu className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-screen mt-3">
                                <Link
                                    href='/'
                                >
                                    <DropdownMenuItem className="text-lg">
                                        Home
                                    </DropdownMenuItem>
                                </Link>

                                <Link
                                    href='/about'
                                >
                                    <DropdownMenuItem className="text-lg">
                                        About us
                                    </DropdownMenuItem>
                                </Link>
                                <Link
                                    href='/projects'
                                >
                                    <DropdownMenuItem className="text-lg">
                                        Projects
                                    </DropdownMenuItem>
                                </Link>
                                <Link
                                    href='/members'
                                >
                                    <DropdownMenuItem className="text-lg">
                                        Members
                                    </DropdownMenuItem>
                                </Link>
                                <Link
                                    href='/contact'
                                >
                                    <DropdownMenuItem className="text-lg">
                                        Contact
                                    </DropdownMenuItem>
                                </Link>
                                {/* <Link
                                    href='/dashboard'
                                >
                                    <DropdownMenuItem className="text-lg">
                                        Member dashboard
                                    </DropdownMenuItem>
                                </Link> */}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </li>
                </ul>
            </nav>
            <Separator />
        </div>
    )
}