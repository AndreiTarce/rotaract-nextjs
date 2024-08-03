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
            className="rounded p-1 hover:cursor-pointer hover:bg-black hover:!bg-opacity-10 dark:hover:bg-white md:p-2"
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
                    <p className="text-sm text-muted-foreground">
                        Autor: {props.author}
                    </p>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground"></div>
                <FontAwesomeIcon
                    icon={faDownload}
                    className="h-8 w-8 self-center text-muted-foreground"
                />
            </div>
        </Link>
    );
}
