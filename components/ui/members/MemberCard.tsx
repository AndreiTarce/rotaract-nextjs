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
                // src={props.picture}
                src='https://lh3.googleusercontent.com/a/AAcHTtc_jNMttn9PiXX2Gv5C-18_tK9YsVoMiUom9wmLh05MTnBl=s360-c-no'
                alt=""
            />
            <div className="p-5 h-full flex flex-col justify-between">
                <div>
                    <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">
                        {props.first_name} {props.last_name}
                    </h5>
                    <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
                        {props.description}
                    </p>
                    <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
                        {props.role}
                    </p>
                </div>
                <Link href={props.urls.facebook}>
                    <Button size='icon'>
                        <Facebook />
                    </Button>
                </Link>
                <Link href={props.urls.linkedin}>
                    <Button size='icon'>
                        <Linkedin />
                    </Button>
                </Link>
            </div>
        </Card >
    );
};

export default MemberCard;