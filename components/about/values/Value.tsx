import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { IconDefinition, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Value(props: {
    title: string
    icon: IconDefinition
    text: string
}) {
    return (
        <div className="flex flex-col items-center justify-center gap-4 w-fit ">
            <div className="dark:bg-white bg-[hsl(var(--primary))] rounded-full h-24 w-24 flex justify-center items-center">
                <FontAwesomeIcon
                    icon={props.icon}
                    size="3x"
                    className="text-[hsl(var(--card))]"
                />
            </div>
            <div className="text-lg font-bold">{props.title}</div>
            <div className="text-xs text-center ">{props.text}</div>
        </div>
    )
}
