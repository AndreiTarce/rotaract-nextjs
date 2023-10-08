import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

export default function Cotizatie() {
    return (
        <Link
            href="https://docs.google.com/document/d/1Bile9hKM4HnXgnvJwO4RdS3r9fyDsEeW/edit"
            target="_blank"
            className="hover:cursor-pointer rounded hover:bg-black dark:hover:bg-white hover:!bg-opacity-10 p-1 md:p-2"
        >
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <h4 className="font-bold text-xl">Sedinta Club</h4>
                    <p className="font-semibold text-sm">
                        14 Octombrie{' '}
                        <span className="text-muted-foreground">2023</span>
                    </p>
                    <p className="text-muted-foreground text-sm">
                        Autor: Ioana Ciucioiu
                    </p>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex text-muted-foreground text-sm"></div>
                </div>
                <FontAwesomeIcon
                    icon={faDownload}
                    className="self-center h-8 w-8 text-muted-foreground"
                />
            </div>
        </Link>
    )
}
