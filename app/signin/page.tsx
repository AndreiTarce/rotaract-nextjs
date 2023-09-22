import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { GoogleSignInButton } from '@/components/ui/signin/authButton'
import { XOctagon } from 'lucide-react'
import Image from 'next/image'
import AccesDeniendImage from '../../assets/images/access_denied.svg'

type Props = {
    params: {}
    searchParams: { [key: string]: string | string[] | undefined | boolean }
}

export default async function SignIn(props: Props) {
    const isWhitelisted =
        props.searchParams.whitelisted === 'true' ? true : false

    if (!isWhitelisted && props.searchParams.whitelisted)
        return (
            <main className="mt-12 overflow-hidden mx-16 max-md:mx-4 flex justify-center align-middle flex-col gap-8 lg:gap-8 h-full">
                <Alert className="max-w-lg self-center">
                    <XOctagon className="h-4 w-4" />
                    <AlertTitle className="mb-2">Acces Denied!</AlertTitle>
                    <AlertDescription>
                        <span className="text-gray-700 dark:text-gray-400">
                            Only whitelisted members of{' '}
                            <strong>Rotaract Visio Cluj-Napoca</strong> are
                            allowed to access the Members dashboard.
                        </span>
                        <Separator className="my-2" />
                        <span className="text-gray-700 dark:text-gray-400">
                            If you are a member of{' '}
                            <strong>Rotaract Visio Cluj-Napoca</strong> and do
                            not have access, please contact the club&apos;s IT
                            Department.
                        </span>
                    </AlertDescription>
                </Alert>
                <Image
                    src={AccesDeniendImage}
                    alt="Access Denied"
                    className="max-h-[300px] self-center"
                />
            </main>
        )

    return (
        <main className="mt-28 mx-16 max-md:mx-4 flex justify-center align-middle">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Sign in</CardTitle>
                    <CardDescription>
                        You have to be signed in to access the member dashboard.
                    </CardDescription>
                </CardHeader>
                <CardFooter className="w-full">
                    <GoogleSignInButton />
                </CardFooter>
            </Card>
        </main>
    )
}
