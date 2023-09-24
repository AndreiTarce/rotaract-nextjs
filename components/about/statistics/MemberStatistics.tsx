import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
    IconDefinition,
    faUserCheck,
    faUserClock,
    faUserGraduate,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const section = (
    <div className="flex justify-between w-full">
        <div className="flex flex-col">
            <span className="text-rotaract-cranberry font-semibold">
                Activi
            </span>
            <span className="text-xl font-extrabold text-muted-foreground">
                30
            </span>
        </div>
        <FontAwesomeIcon
            icon={faUserCheck}
            size="3x"
            className="text-muted-foreground"
        />
    </div>
)

// const section2 = (
//     // <div>
//     //     <div className="flex flex-row items-center justify-between space-y-0 pb-2">
//     //         <div className="text-lg font-semibold">Activi</div>
//     //         <FontAwesomeIcon
//     //             icon={faUserCheck}
//     //             className="h-8 w-8  text-muted-foreground"
//     //         />
//     //     </div>
//     //     <p className="text-muted-foreground">30</p>
//     // </div>
// )

const MemberStatistic = (props: {
    type: 'activi' | 'pasivi' | 'aspiranti'
    amount: number
    icon: IconDefinition
}) => (
    <div className="flex h-fit gap-5">
        <div>
            <FontAwesomeIcon
                icon={props.icon}
                size="3x"
                className="text-muted-foreground"
            />
        </div>
        <div className="flex flex-col h-fit">
            <h4 className="text-lg text-muted-foreground capitalize">
                {props.type}
            </h4>
            <p className="font-semibold">{props.amount}</p>
        </div>
    </div>
)

export default function MemberStatistics() {
    return (
        <Card className="md:w-fit">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl text-rotaract-cranberry font-extrabold bg-gradient-to-r from-rotaract-cranberry to-rose-500 bg-clip-text text-transparent">
                    Membri curenti
                </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-flow-row md:grid-flow-col gap-8 h-fit">
                <MemberStatistic type="activi" icon={faUserCheck} amount={30} />
                <div className="h-full w-[2px] bg-border rounded-lg"></div>
                <MemberStatistic type="pasivi" icon={faUserClock} amount={7} />
                <div className="h-full w-[2px] bg-border rounded-lg"></div>
                <MemberStatistic
                    type="aspiranti"
                    icon={faUserGraduate}
                    amount={10}
                />
            </CardContent>
        </Card>
    )
}
