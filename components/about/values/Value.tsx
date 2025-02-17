import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Value(props: { title: string; icon: IconDefinition; text: string }) {
    return (
        <div className="flex w-fit flex-col items-center justify-center gap-4">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[var(--primary)] dark:bg-white">
                <FontAwesomeIcon icon={props.icon} size="3x" className="text-[var(--card)]" />
            </div>
            <div className="text-lg font-bold">{props.title}</div>
            <div className="md:text-muted-foreground text-center text-xs">{props.text}</div>
        </div>
    );
}
