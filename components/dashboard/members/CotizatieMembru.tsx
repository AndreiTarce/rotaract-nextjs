import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { faDollar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function CotizatieMembru() {
    return (
        <Card className="flex flex-col justify-between">
            <CardHeader className="flex flex-row justify-between pb-2">
                <CardTitle>Cotizatie - coming soon</CardTitle>
                <FontAwesomeIcon
                    icon={faDollar}
                    className="text-muted-foreground"
                />
            </CardHeader>
            <CardContent></CardContent>
        </Card>
    );
}
