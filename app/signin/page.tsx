import { GoogleSignInButton, GoogleSignOutButton } from "@/components/ui/signin/authButton";
import Image from "next/image";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default async function SignIn() {
    return (
        <main className="mt-28 mx-16 max-md:mx-4 flex justify-center align-middle">
            {/* <p className="text-2xl">You have to be signed in to access the member dashboard</p>
            <GoogleSignInButton />
            <GoogleSignOutButton /> */}
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Sign in</CardTitle>
                    <CardDescription>You have to be signed in to access the member dashboard.</CardDescription>
                </CardHeader>
                <CardFooter className="w-full">
                    <GoogleSignInButton />
                    {/* <Button variant="outline">Cancel</Button> */}
                    {/* <Button>Deploy</Button> */}
                </CardFooter>
            </Card>
        </main>
    )
};