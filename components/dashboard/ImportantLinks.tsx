import {
    MEMBRI_ROTARACT_URL,
    ROTARACT_VISIO_DIVERSE_DRIVE_URL,
    ROTARACT_VISIO_DRIVE_URL,
} from '@/lib/constants';
import { faGoogleDrive } from '@fortawesome/free-brands-svg-icons';
import {
    faArrowUpRightFromSquare,
    faLink,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function ImportantLinks() {
    return (
        <Card>
            <CardHeader className="flex flex-row justify-between pb-2">
                <CardTitle>Important links</CardTitle>
                <FontAwesomeIcon
                    icon={faLink}
                    className="text-muted-foreground"
                />
            </CardHeader>
            <CardContent>
                <div className="flex flex-col">
                    <Link
                        href={ROTARACT_VISIO_DRIVE_URL}
                        target="_blank"
                        className="w-fit text-muted-foreground"
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
                        href={MEMBRI_ROTARACT_URL}
                        target="_blank"
                        className="w-fit text-muted-foreground"
                    >
                        membri.rotaract.ro
                        <FontAwesomeIcon
                            icon={faArrowUpRightFromSquare}
                            size="xs"
                            className="ml-1 opacity-50"
                        />
                    </Link>
                    <Link
                        href={ROTARACT_VISIO_DIVERSE_DRIVE_URL}
                        target="_blank"
                        className="w-fit text-muted-foreground"
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
    );
}
