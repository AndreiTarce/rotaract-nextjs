import { IMember } from '@/models/member'
import { Facebook, Linkedin } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../button'
import { Card } from '../card'
import { Badge } from '../badge'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faFacebook,
    faInstagram,
    faLinkedin,
} from '@fortawesome/free-brands-svg-icons'
import user_placeholder from '@/assets/images/user-placeholder.png'

const MemberCard = (props: IMember) => {
    return (
        <Card className="flex flex-col shadow-md border rounded-lg flex-[1_0_300px] max-w-full overflow-hidden">
            <Image
                src={props.picture || user_placeholder}
                alt={`${props.first_name}${props.last_name} photo`}
                height={500}
                width={500}
                loading="lazy"
            />
            <div className="p-5 h-full flex flex-col justify-between">
                <div>
                    <h5 className="text-gray-900 text-2xl leading-4 tracking-tight mb-1 dark:text-white">
                        <span className="font-bold">{props.first_name}</span>
                        {' ' + props.last_name}
                    </h5>
                    <p className="font-normal text-gray-700 mb-3 dark:text-gray-500 capitalize flex flex-col gap-2">
                        {props.role}
                        {props.start_mandate && (
                            <Badge className="w-fit text-[12px] font-semibold">
                                {props.start_mandate} -{' '}
                                {props.start_mandate + 1}
                            </Badge>
                        )}
                    </p>
                    <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
                        {props.description}
                    </p>
                </div>
                <div className="flex gap-3 items-center">
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
                </div>
            </div>
        </Card>
    )
}

export default MemberCard
