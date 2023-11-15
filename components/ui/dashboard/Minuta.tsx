import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

export default function Minuta(props: {
    type: string
    date: Date
    author: string
    url: string
}) {
    const formatDate = (date: Date) => {
        const newDate = new Date(date)
        const day = newDate.getDay()
        const monthIndex = newDate.getMonth()
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
        ]

        const month = months[monthIndex]

        return `${day} ${month}`
    }
    return (
        <Link
            href={props.url}
            target="_blank"
            className="hover:cursor-pointer rounded hover:bg-black dark:hover:bg-white hover:!bg-opacity-10 p-1 md:p-2"
        >
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <h4 className="font-bold text-xl">{props.type}</h4>
                    <p className="font-semibold text-sm">
                        {formatDate(props.date)}{' '}
                        <span className="text-muted-foreground">
                            {new Date(props.date).getFullYear()}
                        </span>
                    </p>
                    <p className="text-muted-foreground text-sm">
                        Autor: {props.author}
                    </p>
                </div>
                <div className="flex justify-between items-center text-muted-foreground text-sm"></div>
                <FontAwesomeIcon
                    icon={faDownload}
                    className="self-center h-8 w-8 text-muted-foreground"
                />
            </div>
        </Link>
    )
}
