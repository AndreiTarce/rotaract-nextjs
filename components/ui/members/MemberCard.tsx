import user_placeholder from '@/assets/images/user-placeholder.png';
import { MemberDto } from '@/dtos/member.dto';
import { memberRoles } from '@/interfaces/member/IMember';
import {
    faFacebook,
    faInstagram,
    faLinkedin,
    faTiktok,
} from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '../badge';
import { Card } from '../card';

const MemberCard = (props: MemberDto) => {
    const personalLinks = (
        <>
            {props.urls?.facebook && (
                <Link
                    href={props.urls.facebook}
                    className="w-fit"
                    target="_blank"
                >
                    <FontAwesomeIcon icon={faFacebook} size="2x" />
                    <span className="sr-only">Facebook profile</span>
                </Link>
            )}
            {props.urls?.linkedin && (
                <Link
                    href={props.urls.linkedin}
                    className="w-fit"
                    target="_blank"
                >
                    <FontAwesomeIcon icon={faLinkedin} size="2x" />
                    <span className="sr-only">Linkedin profile</span>
                </Link>
            )}
            {props.urls?.instagram && (
                <Link
                    href={props.urls.instagram}
                    className="w-fit"
                    target="_blank"
                >
                    <FontAwesomeIcon icon={faInstagram} size="2x" />
                    <span className="sr-only">Instagram profile</span>
                </Link>
            )}
            {props.urls?.tiktok && (
                <Link
                    href={props.urls.tiktok}
                    className="w-fit"
                    target="_blank"
                >
                    <FontAwesomeIcon icon={faTiktok} size="2x" />
                    <span className="sr-only">Tiktok profile</span>
                </Link>
            )}
            {props.urls?.website && (
                <Link
                    href={props.urls.website}
                    className="w-fit"
                    target="_blank"
                >
                    <FontAwesomeIcon icon={faGlobe} size="2x" />
                    <span className="sr-only">Personal website</span>
                </Link>
            )}
        </>
    );

    return (
        <Card className="flex max-w-full flex-[1_0_300px] flex-col overflow-hidden rounded-lg border shadow-md">
            <Image
                src={props.picture || user_placeholder}
                alt={`${props.first_name}${props.last_name} photo`}
                height={500}
                width={500}
                loading="lazy"
            />
            <div className="flex h-full flex-col justify-between p-5">
                <div>
                    <h5 className="mb-1 text-2xl leading-4 tracking-tight text-gray-900 dark:text-white">
                        <span className="font-bold">{props.first_name}</span>
                        {' ' + props.last_name}
                    </h5>
                    <p className="mb-3 flex flex-col gap-2 font-normal capitalize text-gray-700 dark:text-gray-500">
                        {props.role}
                        {(props.isBoard ||
                            props.role === memberRoles.PAST_PRESIDENT) && (
                            <Badge className="w-fit text-[12px] font-semibold">
                                {props.start_mandate} -{' '}
                                {props.start_mandate + 1}
                            </Badge>
                        )}
                    </p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {props.description}
                    </p>
                </div>
                <div className="flex items-center gap-3">{personalLinks}</div>
            </div>
        </Card>
    );
};

export default MemberCard;
