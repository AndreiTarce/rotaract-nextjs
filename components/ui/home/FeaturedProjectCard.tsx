'use client';
import { FeaturedProjectDto, ProjectDto } from '@/dtos/project.dto';
import { FeaturedProjectActionType } from '@/interfaces/project/IProject';
import { faCircleInfo, faMoneyCheck, faRibbon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import Countdown from 'react-countdown';
import { Button } from '../button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../card';
import { Separator } from '../separator';

interface FeaturedProjectCardProps extends FeaturedProjectDto, ProjectDto {}

export default function FeaturedProjectCard({ project }: { project: FeaturedProjectCardProps }) {
    const renderer = ({
        days,
        hours,
        minutes,
        seconds,
        completed,
    }: {
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
        completed: boolean;
    }) => {
        if (completed) {
            // Render a completed state
            return <></>;
        } else {
            return (
                <div className="grid auto-cols-max grid-flow-col text-center max-md:justify-between md:gap-4">
                    <div className="rounded-box bg-countdownbg flex flex-col rounded-lg p-2 text-white">
                        <span className="countdown text-3xl md:text-3xl">
                            <span>{days}</span>
                        </span>
                        zile
                    </div>
                    <div className="rounded-box bg-countdownbg flex flex-col rounded-lg p-2 text-white">
                        <span className="countdown text-3xl md:text-3xl">
                            <span>{hours}</span>
                        </span>
                        ore
                    </div>
                    <div className="rounded-box bg-countdownbg flex flex-col rounded-lg p-2 text-white">
                        <span className="countdown text-3xl md:text-3xl">
                            <span>{minutes}</span>
                        </span>
                        minute
                    </div>
                    <div className="rounded-box bg-countdownbg flex flex-col rounded-lg p-2 text-white">
                        <span className="countdown text-3xl md:text-3xl">
                            <span>{seconds}</span>
                        </span>
                        secunde
                    </div>
                </div>
            );
        }
    };

    return (
        <Card className="relative mb-8 h-fit max-w-md md:max-w-sm">
            <Image
                src={project.thumbnailImg}
                alt="Featured project background"
                className="rounded-lg"
                quality={100}
                width={1080}
                height={1080}
            />
            <CardHeader>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>Proiect în desfășurare</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-muted-foreground mb-4 font-semibold">
                    Perioada de{' '}
                    {project.type === FeaturedProjectActionType.DONATION ? 'donații' : 'înscrieri'}{' '}
                    se încheie în
                </div>
                <Countdown renderer={renderer} date={project.end_date} />
                <Separator className="my-4" />
                <div className="flex flex-wrap gap-4">
                    <div className="flex w-full flex-wrap justify-between gap-4">
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
                                    <FontAwesomeIcon icon={faRibbon} className="ml-2" />{' '}
                                </Link>
                            </Button>
                        )}
                        <Button className="font-semibold" asChild size="sm">
                            <Link
                                href={{
                                    pathname: `/projects/${project.url}`,
                                }}
                            >
                                Vezi descrierea proiectului{' '}
                                <FontAwesomeIcon icon={faCircleInfo} className="ml-2" />{' '}
                            </Link>
                        </Button>
                    </div>
                    <Button
                        size="lg"
                        asChild
                        className="bg-rotaract-cranberry hover:bg-rotaract-cranberry w-full font-semibold text-white"
                    >
                        <Link href={project.CTA_link} target="_blank">
                            Către{' '}
                            {project.type === FeaturedProjectActionType.DONATION
                                ? 'donații'
                                : 'înscrieri'}
                            <FontAwesomeIcon icon={faMoneyCheck} className="ml-2" />
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
