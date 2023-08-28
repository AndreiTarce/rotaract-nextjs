import Link from "next/link";
import { Button } from "../button";
import { Card } from "../card";
import { IMember } from "@/models/member";
import { Facebook, Linkedin } from "lucide-react";
import { navigationMenuTriggerStyle } from "../navigation-menu";

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
                        <span className="font-bold">
                            {props.first_name}
                        </span>
                        {' ' + props.last_name}
                    </h5>
                    <p className="font-normal text-gray-700 mb-3 dark:text-gray-500">
                        {props.role}
                    </p>
                    <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
                        {props.description}
                    </p>
                </div>
                <div className="flex gap-2">
                    <Link href={props.urls.facebook} className="w-fit">
                        <Button size='icon'>
                            <Facebook />
                        </Button>
                    </Link>
                    <Link href={props.urls.linkedin} className="w-fit">
                        <Button size='icon'>
                            <Linkedin />
                        </Button>
                    </Link>
                </div>
            </div>
        </Card >
    );
};

export default MemberCard;