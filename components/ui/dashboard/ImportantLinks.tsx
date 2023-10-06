import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '../card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowUpRightFromSquare,
    faLink,
} from '@fortawesome/free-solid-svg-icons'
import { faGoogleDrive } from '@fortawesome/free-brands-svg-icons'

export default function ImportantLinks() {
    return (
        <Card>
            <CardHeader className="pb-2 flex flex-row justify-between">
                <CardTitle>Important links</CardTitle>
                <FontAwesomeIcon
                    icon={faLink}
                    className="text-muted-foreground"
                />
            </CardHeader>
            <CardContent>
                <div className="flex flex-col">
                    <Link
                        href="https://drive.google.com/drive/folders/1ZWdkmv2vzPRoW67s1A-1xt5b_C0DxYZg"
                        target="_blank"
                        className="text-muted-foreground w-fit"
                    >
                        <FontAwesomeIcon
                            icon={faGoogleDrive}
                            className="mr-1"
                        />
                        Drive Visio
                        <FontAwesomeIcon
                            icon={faArrowUpRightFromSquare}
                            size="xs"
                            className="ml-1 opacity-50"
                        />
                    </Link>
                    <Link
                        href="https://membri.rotaract.ro/"
                        target="_blank"
                        className="text-muted-foreground w-fit"
                    >
                        membri.rotaract.ro
                        <FontAwesomeIcon
                            icon={faArrowUpRightFromSquare}
                            size="xs"
                            className="ml-1 opacity-50"
                        />
                    </Link>
                    <Link
                        href="https://drive.google.com/drive/folders/1Xedctsv1RLFWkKn-q3XaR9_-EdIA6ic3"
                        target="_blank"
                        className="text-muted-foreground w-fit"
                    >
                        Diverse
                        <FontAwesomeIcon
                            icon={faArrowUpRightFromSquare}
                            size="xs"
                            className="ml-1 opacity-50"
                        />
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
