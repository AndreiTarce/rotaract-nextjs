import { faDollar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, CardContent, CardHeader, CardTitle } from '../card'

export default function CotizatieMembru() {
    return (
        <Card className="flex flex-col justify-between">
            <CardHeader className="pb-2 flex flex-row justify-between">
                <CardTitle>Cotizatie</CardTitle>
                <FontAwesomeIcon
                    icon={faDollar}
                    className="text-muted-foreground"
                />
            </CardHeader>
            <CardContent>
                <div className="flex items-end justify-between">
                    <div className="flex flex-col">
                        <p className="text-muted-foreground w-fit">de platit</p>
                        <p className="text-3xl font-bold text-red-800">
                            30 RON
                        </p>
                    </div>
                    <div className="flex flex-col items-end">
                        <p className="text-muted-foreground font-semibold">
                            Restant din Iunie
                        </p>
                        <p className="text-xs text-muted-foreground">06.2023</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
