import Link from "next/link";
import { Button } from "../button";
import { Card } from "../card";
import { IMember } from "@/models/member";

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
                        {props.first_name}
                    </h5>
                    <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
                        {props.role}
                    </p>
                </div>
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
            </div>
        </Card>
    );
};

export default MemberCard;