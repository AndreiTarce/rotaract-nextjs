import BoardMembersList from '@/components/ui/members/BoardMembers'
import MembersList from '@/components/ui/members/Members'
import PastPresidentsList from '@/components/ui/members/PastPresidents'
import { Separator } from '@/components/ui/separator'

export default function Members() {
    return (
        <main className="mt-5 md:mt-12 mx-16 max-md:mx-4 mb-8 xl:mx-48">
            <h1 className="text-5xl font-semibold leading-none mb-2">
                Meet our{' '}
                <span className="font-extrabold bg-gradient-to-r from-rotaract-cranberry to-rose-500 bg-clip-text text-transparent">
                    Board!
                </span>
            </h1>
            <Separator className="mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
                <BoardMembersList />
            </div>
            <h1 className="text-5xl font-semibold leading-none mb-2">
                Meet our{' '}
                <span className="font-extrabold bg-gradient-to-r from-rotaract-cranberry to-rose-500 bg-clip-text text-transparent">
                    members!
                </span>
            </h1>
            <Separator className="mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
                <MembersList />
            </div>
            <h1 className="text-5xl font-semibold leading-none mb-2">
                <span className="font-extrabold bg-gradient-to-r from-rotaract-cranberry to-rose-500 bg-clip-text text-transparent">
                    Past Presidents
                </span>
            </h1>
            <Separator className="mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
                <PastPresidentsList />
            </div>
        </main>
    )
}
