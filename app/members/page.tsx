import BoardMembersList from '@/components/ui/members/BoardMembers';
import MembersList from '@/components/ui/members/Members';
import PastPresidentsList from '@/components/ui/members/PastPresidents';
import { Separator } from '@/components/ui/separator';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Membri | Rotaract Visio Cluj-Napoca',
};

export default function Members() {
    return (
        <main className="mx-16 mt-5 mb-8 max-md:mx-4 md:mt-12 xl:mx-48">
            <h1 className="mb-2 text-5xl leading-none font-semibold">
                Meet our{' '}
                <span className="from-rotaract-cranberry bg-linear-to-r to-rose-500 bg-clip-text font-extrabold text-transparent">
                    Board!
                </span>
            </h1>
            <Separator className="mb-4" />
            <div className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <BoardMembersList />
            </div>
            <h1 className="mb-2 text-5xl leading-none font-semibold">
                Meet our{' '}
                <span className="from-rotaract-cranberry bg-linear-to-r to-rose-500 bg-clip-text font-extrabold text-transparent">
                    members!
                </span>
            </h1>
            <Separator className="mb-4" />
            <div className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <MembersList />
            </div>
            <h1 className="mb-2 text-5xl leading-none font-semibold">
                <span className="from-rotaract-cranberry bg-linear-to-r to-rose-500 bg-clip-text font-extrabold text-transparent">
                    Past Presidents
                </span>
            </h1>
            <Separator className="mb-4" />
            <div className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <PastPresidentsList />
            </div>
        </main>
    );
}
