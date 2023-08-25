import Link from "next/link";
import { Button } from "../button";
import Image from "next/image";

export interface ProjectCardProps {
    id: number,
    title: string,
    description: string,
    img: string
}

const ProjectCard = (props: ProjectCardProps) => {
    return (
        <div className="bg-white shadow-md border border-gray-200 rounded-lg flex-[1_0_300px] max-w-full dark:bg-gray-800 dark:border-gray-700">
            <Link href={`projects/${props.id}`}>
                <img
                    className="rounded-t-lg"
                    src={props.img}
                    alt=""
                />
            </Link>
            <div className="p-5">
                <Link href={`projects/${props.id}`}>
                    <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">
                        {props.title}
                    </h5>
                </Link>
                <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
                    {props.description}
                </p>
                <Link href={`projects/${props.id}`}>
                    <Button size='sm'>
                        Read more
                        <svg
                            className="-mr-1 ml-2 h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </Button>
                </Link>
            </div>
        </div>

    );
};

export default ProjectCard;