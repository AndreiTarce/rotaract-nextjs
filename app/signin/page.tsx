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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Terminal, XOctagon } from "lucide-react";
import AccesDeniendImage from '../../assets/images/access_denied.svg';
import { Separator } from "@/components/ui/separator";

type Props = {
    params: {};
    searchParams: { [key: string]: string | string[] | undefined | boolean };
};

export default async function SignIn(props: Props) {
    const isWhitelisted = props.searchParams.whitelisted === 'true' ? true : false;

    if (!isWhitelisted) return (
        <main className="mt-28 overflow-hidden mx-16 max-md:mx-4 flex justify-center align-middle flex-col gap-8 lg:gap-8 h-full">
            <Alert className="max-w-lg self-center">
                <XOctagon className="h-4 w-4" />
                <AlertTitle className="mb-2">Acces Denied!</AlertTitle>
                <AlertDescription>
                    <span className="text-gray-700 dark:text-gray-400">
                        Only whitelisted members of <strong>Rotaract Visio Cluj-Napoca</strong> are allowed to access the Members dashboard.
                    </span>
                    <Separator className="my-2" />
                    <span className="text-gray-700 dark:text-gray-400">If you are a member of <strong>Rotaract Visio Cluj-Napoca</strong> and do not have access, please contact the club's IT Department.</span>
                </AlertDescription>
            </Alert>
            <Image src={AccesDeniendImage} alt='Access Denied' className="max-h-[300px] self-center" />
        </main>
    )

    return (
        <main className="mt-28 mx-16 max-md:mx-4 flex justify-center align-middle">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Sign in</CardTitle>
                    <CardDescription>You have to be signed in to access the member dashboard.</CardDescription>
                </CardHeader>
                <CardFooter className="w-full">
                    <GoogleSignInButton />
                </CardFooter>
            </Card>
        </main>
    )
};