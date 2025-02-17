import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    IconDefinition,
    faUserCheck,
    faUserClock,
    faUserGraduate,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MemberStatistic = (props: {
    type: 'activi' | 'pasivi' | 'aspiranți';
    amount: number;
    icon: IconDefinition;
}) => (
    <div className="flex w-full gap-2">
        <div>
            <FontAwesomeIcon icon={props.icon} className="text-muted-foreground h-full! w-auto" />
        </div>
        <div className="flex w-fit flex-col">
            <p className="text-muted-foreground text-xs capitalize md:text-sm">{props.type}</p>
            <p className="text-xs font-semibold md:text-sm">{props.amount}</p>
        </div>
    </div>
);

export default function MemberStatistics() {
    return (
        <Card className="rounded-lg border shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-rotaract-cranberry from-rotaract-cranberry bg-linear-to-r to-rose-500 bg-clip-text text-2xl font-extrabold text-transparent">
                    Membri curenți
                </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-flow-col-dense grid-cols-[repeat(5,auto)]">
                <MemberStatistic type="activi" icon={faUserCheck} amount={16} />
                <div className="flex h-full justify-center max-md:invisible">
                    <div className="bg-border w-[2px] rounded-lg"></div>
                </div>
                <MemberStatistic type="pasivi" icon={faUserClock} amount={11} />
                <div className="flex h-full justify-center max-md:invisible">
                    <div className="bg-border w-[2px] rounded-lg"></div>
                </div>
                <MemberStatistic type="aspiranți" icon={faUserGraduate} amount={24} />
            </CardContent>
        </Card>
    );
}
