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

import { Menu } from 'lucide-react'

import logo from '../../../assets/images/visio.png'
import { ModeToggle } from "../ModeToggle"
import { Button } from "../button"
import { Separator } from "../separator"

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
                <ul className="flex flex-row gap-1 max-md:hidden">
                    <li>
                        <Link
                            className={navigationMenuTriggerStyle()}
                            href="/"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={navigationMenuTriggerStyle()}
                            href="/about"
                        >
                            About us
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={navigationMenuTriggerStyle()}
                            href="/projects"
                        >
                            Projects
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={navigationMenuTriggerStyle()}
                            href="/members"
                        >
                            Members
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={navigationMenuTriggerStyle()}
                            href="/contact"
                        >
                            Contact
                        </Link>
                    </li>
                    <li>
                        <ModeToggle />
                    </li>
                </ul>
                <Button variant="outline" size="icon" className="max-md:flex hidden">
                    <Menu className="h-4 w-4" />
                </Button>
            </nav>
            <Separator />
        </div>
    )
}