import {
    MEMBRI_ROTARACT_URL,
    ROTARACT_VISIO_DIVERSE_DRIVE_URL,
    ROTARACT_VISIO_DRIVE_URL,
} from '@/lib/constants';
import { faGoogleDrive } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import ExternalLinkWithPreview from '../ui/external-link';

export default function ImportantLinks() {
    return (
        <Card>
            <CardHeader className="flex flex-row justify-between pb-2">
                <CardTitle>Important links</CardTitle>
                <FontAwesomeIcon icon={faLink} className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-muted-foreground flex flex-col">
                    <ExternalLinkWithPreview
                        url={ROTARACT_VISIO_DRIVE_URL}
                        showIcon
                        preview={false}
                    >
                        <FontAwesomeIcon icon={faGoogleDrive} className="mr-1" />
                        Drive Visio
                    </ExternalLinkWithPreview>
                    <ExternalLinkWithPreview url={MEMBRI_ROTARACT_URL} showIcon>
                        membri.rotaract.ro
                    </ExternalLinkWithPreview>
                    <ExternalLinkWithPreview
                        url={ROTARACT_VISIO_DIVERSE_DRIVE_URL}
                        showIcon
                        preview={false}
                    >
                        Diverse
                    </ExternalLinkWithPreview>
                </div>
            </CardContent>
        </Card>
    );
}
