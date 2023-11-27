import { IMeeting } from '@/models/meeting'
import { Card, CardDescription, CardHeader, CardTitle } from '../card'

export default function Sedinta({ meeting }: { meeting: IMeeting }) {
    const meetingDate = new Date(meeting.start_date)
    return (
        <Card>
            <CardHeader>
                <CardTitle>{meeting.type}</CardTitle>
                <CardDescription>
                    {meetingDate.toLocaleDateString('RO', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </CardDescription>
            </CardHeader>
        </Card>
    )
}
