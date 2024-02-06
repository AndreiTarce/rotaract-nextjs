'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../card'
import { Input } from '../input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../tabs'
import { Label } from '../label'
import { Button } from '../button'
import MembersPanel from './MembersPanel'
import { ReactElement } from 'react'

export default function SectionsTab({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <Tabs defaultValue="account">
            <TabsList className="grid grid-flow-col justify-start">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">{children}</TabsContent>
            <TabsContent value="password">
                <Card>
                    <CardHeader>
                        <CardTitle>Password</CardTitle>
                        <CardDescription>
                            Change your password here. After saving, youll be
                            logged out.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="current">Current password</Label>
                            <Input id="current" type="password" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="new">New password</Label>
                            <Input id="new" type="password" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Save password</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    )
}
