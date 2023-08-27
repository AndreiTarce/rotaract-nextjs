import MembersList from "@/components/ui/members/Members";
import { Separator } from "@/components/ui/separator";

export default function Members() {
    return (
        <main className="mt-28 mx-16 max-md:mx-4 mb-8">
            <h1 className="text-5xl font-semibold leading-none mb-2">Meet our{' '}
                <span className="font-extrabold text-rotaract-cranberry">
                    Board!
                </span>
            </h1>
            <Separator className="mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                <MembersList />
                <MembersList />
                <MembersList />
                <MembersList />
                <MembersList />
                <MembersList />
            </div>
            <h1 className="text-5xl font-semibold leading-none mb-2">Meet our{' '}
                <span className="font-extrabold text-rotaract-cranberry">
                    members!
                </span>
            </h1>
            <Separator className="mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                <MembersList />
            </div>
        </main>
    )
};