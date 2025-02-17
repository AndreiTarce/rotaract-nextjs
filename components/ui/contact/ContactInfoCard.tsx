import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../card';

export default function ContactInfoCard(props: {
    title: string;
    icon: IconDefinition;
    children: ReactNode;
}) {
    return (
        <Card className="rounded-lg border shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg">{props.title}</CardTitle>
                <FontAwesomeIcon icon={props.icon} className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>{props.children}</CardContent>
        </Card>
    );
}
