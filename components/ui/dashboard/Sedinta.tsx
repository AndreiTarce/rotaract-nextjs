import { IMeeting } from '@/models/meeting'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faLocationPin } from '@fortawesome/free-solid-svg-icons'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../dialog'
import { Button } from '../button'
import { Label } from '../label'
import { Input } from '../input'

export default function Sedinta({ meeting }: { meeting: IMeeting }) {
    const meetingDate = new Date(meeting.start_date)
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Card className="hover:scale-105 hover:bg-opacity-10 hover:bg-dark hover:cursor-pointer max-w-[300px] min-h-fit">
                    <CardHeader>
                        <CardTitle>{meeting.type}</CardTitle>
                        <CardDescription className="flex flex-col">
                            <div>
                                <FontAwesomeIcon
                                    icon={faCalendar}
                                    className="mr-2"
                                />
                                {meetingDate.toLocaleDateString('RO', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                })}
                            </div>
                            <div>
                                <FontAwesomeIcon
                                    icon={faLocationPin}
                                    className="mr-2"
                                />
                                {meeting.location}
                            </div>
                        </CardDescription>
                    </CardHeader>
                </Card>
            </DialogTrigger>
            <DialogContent className="h-[80%] w-[80%] max-w-[80%] max-md:h-[90%] max-md:max-w-[90%] max-md:w-[90%] rounded-lg">
                <DialogHeader>
                    <DialogTitle>{meeting.type}</DialogTitle>
                    <DialogDescription>
                        {meetingDate.toLocaleDateString('RO', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                        })}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            defaultValue="Pedro Duarte"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input
                            id="username"
                            defaultValue="@peduarte"
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
