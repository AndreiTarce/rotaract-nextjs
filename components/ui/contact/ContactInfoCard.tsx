import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../card'

export default function ContactInfoCard(props: {
    title: string
    icon: IconDefinition
    children: ReactNode
}) {
    return (
        <Card className="shadow-md border rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg">{props.title}</CardTitle>
                <FontAwesomeIcon
                    icon={props.icon}
                    className="h-4 w-4 text-muted-foreground"
                />
            </CardHeader>
            <CardContent>{props.children}</CardContent>
        </Card>
    )
}
