import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export default function Minuta(props: {
    type: string;
    date: Date;
    author: string;
    url: string;
    id: string;
}) {
    const formatDate = (date: Date) => {
        const newDate = new Date(date);
        const day = newDate.getDate();
        const monthIndex = newDate.getMonth();
        const months = [
            'Ianuarie',
            'Februarie',
            'Martie',
            'Aprilie',
            'Mai',
            'Iunie',
            'Iulie',
            'August',
            'Septembrie',
            'Octombrie',
            'Noiembrie',
            'Decembrie',
        ];

        const month = months[monthIndex];

        return `${day} ${month}`;
    };
    return (
        <Link
            href={props.url}
            target="_blank"
            className="rounded p-1 hover:cursor-pointer hover:bg-black/10 md:p-2 dark:hover:bg-white/10"
        >
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <h4 className="text-xl font-bold">{props.type}</h4>
                    <p className="text-sm font-semibold">
                        {formatDate(props.date)}{' '}
                        <span className="text-muted-foreground">
                            {new Date(props.date).getFullYear()}
                        </span>
                    </p>
                    <p className="text-muted-foreground text-sm">Autor: {props.author}</p>
                </div>
                <div className="text-muted-foreground flex items-center justify-between text-sm"></div>
                <FontAwesomeIcon
                    icon={faDownload}
                    className="text-muted-foreground h-8 w-8 self-center"
                />
            </div>
        </Link>
    );
}
