'use client'
import { IFeaturedProject } from '@/models/featuredProject'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../card'
import Countdown from 'react-countdown'
import Image from 'next/image'
import { Separator } from '../separator'
import { Button } from '../button'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCircleInfo,
    faHandHoldingDollar,
    faMoneyCheck,
    faRibbon,
} from '@fortawesome/free-solid-svg-icons'

export default function ProjectCountdown({
    project,
}: {
    project: IFeaturedProject
}) {
    const renderer = ({
        days,
        hours,
        minutes,
        seconds,
        completed,
    }: {
        days: number
        hours: number
        minutes: number
        seconds: number
        completed: boolean
    }) => {
        if (completed) {
            // Render a completed state
            return <></>
        } else {
            return (
                <div className="grid grid-flow-col md:gap-4 max-md:justify-between text-center auto-cols-max">
                    <div className="flex flex-col p-2 bg-countdownbg rounded-box text-white rounded-lg">
                        <span className="countdown md:text-3xl text-3xl">
                            <span>{days}</span>
                        </span>
                        zile
                    </div>
                    <div className="flex flex-col p-2 bg-countdownbg rounded-box text-white rounded-lg">
                        <span className="countdown md:text-3xl text-3xl">
                            <span>{hours}</span>
                        </span>
                        ore
                    </div>
                    <div className="flex flex-col p-2 bg-countdownbg rounded-box text-white rounded-lg">
                        <span className="countdown md:text-3xl text-3xl">
                            <span>{minutes}</span>
                        </span>
                        minute
                    </div>
                    <div className="flex flex-col p-2 bg-countdownbg rounded-box text-white rounded-lg">
                        <span className="countdown md:text-3xl text-3xl">
                            <span>{seconds}</span>
                        </span>
                        secunde
                    </div>
                </div>
            )
        }
    }

    return (
        <Card className="mb-8 relative md:max-w-sm max-w-md h-fit">
            <Image
                src={project.coverImg}
                alt="Featured project background"
                className="rounded-lg"
                quality={100}
                width={1080}
                height={1080}
            />
            <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>Proiect în desfășurare</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="font-semibold text-muted-foreground mb-4">
                    Perioada de înscrieri se încheie în
                </div>
                <Countdown renderer={renderer} date={project.end_date} />
                <Separator className="my-4" />
                <div className="flex gap-4 flex-wrap">
                    <div className="flex justify-between w-full flex-wrap gap-4">
                        {project.cause_link && (
                            <Button className="font-semibold" asChild size="sm">
                                <Link
                                    href={{
                                        pathname: '/about',
                                        query: {
                                            cause: project.cause_link,
                                        },
                                    }}
                                >
                                    Vezi cauza proiectului{' '}
                                    <FontAwesomeIcon
                                        icon={faRibbon}
                                        className="ml-2"
                                    />{' '}
                                </Link>
                            </Button>
                        )}
                        <Button className="font-semibold" asChild size="sm">
                            <Link
                                href={{
                                    pathname: `/projects/${project.project_url}`,
                                }}
                            >
                                Vezi descrierea proiectului{' '}
                                <FontAwesomeIcon
                                    icon={faCircleInfo}
                                    className="ml-2"
                                />{' '}
                            </Link>
                        </Button>
                    </div>
                    <Button
                        size="lg"
                        asChild
                        className="font-semibold bg-rotaract-cranberry text-white hover:bg-rotaract-cranberry w-full"
                    >
                        <Link href={project.donation_link} target="_blank">
                            Către înscrieri
                            <FontAwesomeIcon
                                icon={faMoneyCheck}
                                className="ml-2"
                            />
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
