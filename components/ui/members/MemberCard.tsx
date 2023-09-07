import { IMember } from '@/models/member'
import { Facebook, Linkedin } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../button'
import { Card } from '../card'
import { Badge } from '../badge'

const MemberCard = (props: IMember) => {
    return (
        <Card className="flex flex-col shadow-md border rounded-lg flex-[1_0_300px] max-w-full">
            <img
                className="rounded-t-lg"
                src={props.picture}
                alt="Profile picture"
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
                <div className="flex gap-2">
                    {props.urls.facebook && (
                        <Link
                            href={props.urls.facebook}
                            className="w-fit"
                            target="_blank"
                        >
                            <Button size="icon">
                                <Facebook />
                            </Button>
                        </Link>
                    )}
                    {props.urls.linkedin && (
                        <Link
                            href={props.urls.linkedin}
                            className="w-fit"
                            target="_blank"
                        >
                            <Button size="icon">
                                <Linkedin />
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </Card>
    )
}

export default MemberCard
