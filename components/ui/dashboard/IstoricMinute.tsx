import { Calendar } from '../calendar'
import { Card, CardContent, CardHeader, CardTitle } from '../card'
import { ScrollArea } from '../scroll-area'

export default function IstoricMinute() {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle>Istoric minute</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="border rounded">asd</ScrollArea>
                <Calendar mode="default" />
            </CardContent>
        </Card>
    )
}
