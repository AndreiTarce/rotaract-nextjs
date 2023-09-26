import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    IconDefinition,
    faUserCheck,
    faUserClock,
    faUserGraduate,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const MemberStatistic = (props: {
    type: 'activi' | 'pasivi' | 'aspiranti'
    amount: number
    icon: IconDefinition
}) => (
    <div className="flex gap-2 w-full">
        <div>
            <FontAwesomeIcon
                icon={props.icon}
                className="h-full w-auto text-muted-foreground"
            />
        </div>
        <div className="flex flex-col w-fit">
            <p className="md:text-sm text-xs text-muted-foreground capitalize">
                {props.type}
            </p>
            <p className="md:text-sm text-xs font-semibold">{props.amount}</p>
        </div>
    </div>
)

export default function MemberStatistics() {
    return (
        <Card className="shadow-md border rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl text-rotaract-cranberry font-extrabold bg-gradient-to-r from-rotaract-cranberry to-rose-500 bg-clip-text text-transparent">
                    Membri curenti
                </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-[repeat(5,_auto)] grid-flow-col-dense">
                <MemberStatistic type="activi" icon={faUserCheck} amount={30} />
                <div className="h-full flex justify-center max-md:invisible">
                    <div className="w-[2px] bg-border rounded-lg"></div>
                </div>
                <MemberStatistic type="pasivi" icon={faUserClock} amount={7} />
                <div className="h-full flex justify-center max-md:invisible">
                    <div className="w-[2px] bg-border rounded-lg"></div>
                </div>
                <MemberStatistic
                    type="aspiranti"
                    icon={faUserGraduate}
                    amount={10}
                />
            </CardContent>
        </Card>
    )
}
