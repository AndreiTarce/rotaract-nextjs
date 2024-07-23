import { MEETING_TYPES } from '@/components/ui/dashboard/constants';
import { MemberDto } from '@/dtos/member.dto';
import CatrafusaleRegistration from '@/models/catrafusaleRegistration';
import Meeting from '@/models/meeting';
import Member from '@/models/member';
import WhitelistedMember, {
    IWhitelistedMember,
} from '@/models/whitelistedMember';
import { ObjectId } from 'mongodb';
import {
    API_BASE_URL,
    CAUSES_PATH,
    CHECKOUT_PATH,
    FEATURED_PROJECTS_PATH,
    MEETINGS_PATH,
    MEMBERS_PATH,
    PROJECTS_PATH,
} from './constants';
import connectMongoDB from './mongodb';

export const getProjects = async () => {
    const url = API_BASE_URL + PROJECTS_PATH;
    try {
        const res = await fetch(url, { cache: 'no-store' });

        if (!res.ok) {
            throw new Error('Failed to fetch projects');
        }

        return res.json();
    } catch (error) {
        console.log('Error loading projects: ', error);
    }
};

export const getProject = async (projectUrl: string) => {
    const url = `${API_BASE_URL + PROJECTS_PATH}/${projectUrl}`;
    try {
        const res = await fetch(url, { cache: 'no-store' });

        if (!res.ok) {
            throw new Error('Failed to fetch project');
        }

        return res.json();
    } catch (error) {
        console.log('Error loading project: ', error);
    }
};

export const getMembers = async () => {
    const url = API_BASE_URL + MEMBERS_PATH;
    try {
        const res = await fetch(url, { cache: 'no-store' });

        if (!res.ok) {
            throw new Error('Failed to fetch members');
        }
        return res.json();
    } catch (error) {
        console.log('Error loading members: ', error);
    }
};

export const getMember = async (memberEmail: string) => {
    const url = `${API_BASE_URL + MEMBERS_PATH}/?email=${memberEmail}`;
    try {
        const res = await fetch(url, {
            cache: 'no-store',
        });

        if (!res.ok) {
            throw new Error('Failed to fetch member');
        }

        return res.json();
    } catch (error) {
        console.log('Error loading member: ', error);
    }
};

export const getBoardMembers = async () => {
    await connectMongoDB();
    const boardMembers: MemberDto[] = await Member.find({
        role: { $nin: ['member', 'past president'] },
    }).lean();
    return boardMembers;
};

export const getMemberWhitelist = async () => {
    await connectMongoDB();
    const whitelistedMembers: IWhitelistedMember[] =
        await WhitelistedMember.find().lean();
    return whitelistedMembers;
};

export const getPastPresidents = async () => {
    await connectMongoDB();
    const pastPresidents: MemberDto[] = await Member.find({
        role: 'past president',
    })
        .sort({ start_mandate: -1 })
        .lean();
    return pastPresidents;
};

export const getCauses = async () => {
    const url = API_BASE_URL + CAUSES_PATH;
    try {
        const res = await fetch(url, { cache: 'no-store' });

        if (!res.ok) {
            throw new Error('Failed to fetch causes');
        }
        return res.json();
    } catch (error) {
        console.log('Error loading causes: ', error);
    }
};

export const getMeetings = async () => {
    const url = API_BASE_URL + MEETINGS_PATH;

    try {
        const res = await fetch(url, { cache: 'no-store' });

        if (!res.ok) {
            throw new Error('Failed to fetch meetings');
        }

        return res.json();
    } catch (error) {
        console.log('Error loading meetings: ', error);
    }
};

export const getCheckoutSession = async (session_id: string) => {
    const url = `${API_BASE_URL + CHECKOUT_PATH}?session_id=${session_id}`;

    try {
        const res = await fetch(url, { cache: 'no-store' });

        if (!res.ok) {
            throw new Error('Failed to fetch checkout session');
        }

        return res.json();
    } catch (error) {
        console.log('Error fetching checkout session', error);
    }
};

export const getFeaturedProject = async () => {
    const url = `${API_BASE_URL + FEATURED_PROJECTS_PATH}`;
    try {
        const res = await fetch(url, { cache: 'no-store' });

        if (!res.ok) {
            throw new Error('Failed to fetch project');
        }

        return res.json();
    } catch (error) {
        console.log('Error loading project: ', error);
    }
};

export const getAttendance = async (memberId: ObjectId) => {
    const memberIdToSearch = new ObjectId(memberId);
    await connectMongoDB();
    const currentDate = new Date();
    const rotarianYearStartDate =
        currentDate.getMonth() < 6
            ? new Date(currentDate.getFullYear() - 1, 6, 1)
            : new Date(currentDate.getFullYear(), 6, 1);
    const rotarianYearEndDate =
        currentDate.getMonth() < 6
            ? new Date(currentDate.getFullYear(), 6, 1)
            : new Date(currentDate.getFullYear() + 1, 6, 1);

    const presences = await Meeting.aggregate()
        .unwind('$presentMembers')
        .match({
            'presentMembers._id': memberIdToSearch,
            type: MEETING_TYPES[0].name,
            start_date: {
                $gte: rotarianYearStartDate,
                $lte: rotarianYearEndDate,
            },
        })
        .group({ _id: null, totalPresences: { $sum: 1 } });

    const meetings = await Meeting.aggregate()
        .match({
            type: MEETING_TYPES[0].name,
            start_date: {
                $gte: rotarianYearStartDate,
                $lte: rotarianYearEndDate,
            },
        })
        .group({ _id: null, totalMeetings: { $sum: 1 } });

    let totalAbsences: number = meetings[0]?.totalMeetings;
    let totalPresences = 0;
    if (presences && presences.length) {
        totalPresences = presences[0].totalPresences;
        totalAbsences -= totalPresences;
    }

    const attendance = { totalPresences, totalAbsences };
    return attendance;
};

export const getCatrafusaleRegistrations = async () => {
    await connectMongoDB();
    const registrations = await CatrafusaleRegistration.find();
    return registrations;
};
