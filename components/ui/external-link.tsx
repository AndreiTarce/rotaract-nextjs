import { cn } from '@/lib/utils';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { LinkPreview, LinkPreviewProps } from './link-preview';

type ExternalLinkProps = LinkPreviewProps & {
    underline?: boolean;
    showIcon?: boolean;
    preview?: boolean;
};

export default function ExternalLinkWithPreview({
    children,
    url,
    className,
    underline = false,
    showIcon = false,
    target = '_blank',
    preview = true,
}: ExternalLinkProps) {
    if (preview)
        return (
            <LinkPreview
                className={cn(className, { ['underline underline-offset-4']: underline }, 'w-fit')}
                url={url}
                target={target}
            >
                {children}{' '}
                {showIcon ? <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="xs" /> : null}
            </LinkPreview>
        );

    return (
        <Link
            className={cn(className, { ['underline underline-offset-4']: underline }, 'w-fit')}
            href={url}
            target={target}
        >
            {children}{' '}
            {showIcon ? <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="xs" /> : null}
        </Link>
    );
}
