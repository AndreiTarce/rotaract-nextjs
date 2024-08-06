import { MeetingDto } from '@/dtos/meeting.dto';
import { MemberDto } from '@/dtos/member.dto';
import { ProjectDto } from '@/dtos/project.dto';
import { IMemberAttendance } from '@/interfaces/meeting/IMemberAttendance';
import { ICause } from '@/models/causes';
import { IFeaturedProject } from '@/models/featuredProject';
import Stripe from 'stripe';
import {
    API_BASE_URL,
    CAUSES_PATH,
    CHECKOUT_PATH,
    FEATURED_PROJECTS_PATH,
    MEETINGS_PATH,
    MEMBERS_PATH,
    PROJECTS_PATH,
} from './constants';

const getEntity = async <T>(
    url: string,
    cookies?: string,
    tags?: string[]
): Promise<T> => {
    const headers = cookies ? { Cookie: cookies } : undefined;

    const response = await fetch(url, {
        cache: 'no-store',
        headers,
        next: { tags },
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    }

    throw new Error('Bad response');
};

const createEntity = async <T>(url: string, entity: T): Promise<T> => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(entity),
    });

    if (response.ok) {
        const data: T = await response.json();
        return data;
    }

    throw new Error('Bad response');
};

export const getProjects = async () => {
    const url = API_BASE_URL + PROJECTS_PATH;

    try {
        const projects = await getEntity<ProjectDto[]>(url);

        return projects;
    } catch (error) {
        console.log('Error loading projects: ', error);
    }
};

export const getProject = async (projectUrl: string) => {
    const url = `${API_BASE_URL + PROJECTS_PATH}/${projectUrl}`;

    try {
        const project = await getEntity<ProjectDto>(url);

        return project;
    } catch (error) {
        console.log('Error loading project: ', error);
    }
};

export const getMembers = async (cookie?: string) => {
    const url = API_BASE_URL + MEMBERS_PATH;

    try {
        const members = await getEntity<MemberDto[]>(url, cookie, ['members']);

        return members;
    } catch (error) {
        console.log('Error loading members: ', error);
    }
};

export const getMemberByEmail = async (
    memberEmail: string,
    cookie?: string
) => {
    const url = `${API_BASE_URL + MEMBERS_PATH}/?email=${memberEmail}`;

    try {
        const member = await getEntity<MemberDto>(url, cookie);

        return member;
    } catch (error) {
        console.log('Error loading member: ', error);
    }
};

export const getMemberById = async (
    memberId: string,
    cookie?: string,
    tags?: string[]
) => {
    const url = `${API_BASE_URL + MEMBERS_PATH}/${memberId}`;

    try {
        const member = await getEntity<MemberDto>(url, cookie, tags);

        return member;
    } catch (error) {
        console.log('Error loading member: ', error);
    }
};

export const createMember = async (member: FormData) => {
    const url = API_BASE_URL + MEMBERS_PATH;

    try {
        const createdMember = await fetch(url, {
            method: 'POST',
            body: member,
        });
        return createdMember.json();
    } catch (error) {
        console.log('Error creating member: ', error);
    }
};

export const updateMember = async (member: FormData) => {
    const url = API_BASE_URL + MEMBERS_PATH;

    try {
        const updatedMember = await fetch(url, {
            method: 'PUT',
            body: member,
        });
        return updatedMember.json();
    } catch (error) {
        console.log('Error updating member: ', error);
    }
};

export const deleteMember = async (memberId: string) => {
    const url = `${API_BASE_URL + MEMBERS_PATH}/${memberId}`;

    const response = await fetch(url, {
        method: 'DELETE',
    });

    return response;
};

export const getCauses = async () => {
    const url = API_BASE_URL + CAUSES_PATH;

    try {
        const causes = await getEntity<ICause[]>(url);

        return causes;
    } catch (error) {
        console.log('Error loading causes: ', error);
    }
};

export const getMeetings = async () => {
    const url = API_BASE_URL + MEETINGS_PATH;

    try {
        const meetings = await getEntity<MeetingDto[]>(url);

        return meetings;
    } catch (error) {
        console.log('Error loading meetings: ', error);
    }
};

export const createMeeting = async (meeting: Partial<MeetingDto>) => {
    const url = API_BASE_URL + MEETINGS_PATH;

    try {
        const createdMeeting = await createEntity(url, meeting);
        return createdMeeting;
    } catch (error) {
        console.log('Error creating meeting: ', error);
    }
};

export const deleteMeeting = async (meetingId: string) => {
    const url = `${API_BASE_URL + MEETINGS_PATH}/${meetingId}`;

    const response = await fetch(url, {
        method: 'DELETE',
    });

    return response;
};

export const getCheckoutSession = async (session_id: string) => {
    const url = `${API_BASE_URL + CHECKOUT_PATH}?session_id=${session_id}`;

    try {
        const checkoutSession = await getEntity<Stripe.Checkout.Session>(url);

        return checkoutSession;
    } catch (error) {
        console.log('Error loading checkout session: ', error);
    }
};

export const getFeaturedProjects = async () => {
    const url = `${API_BASE_URL + FEATURED_PROJECTS_PATH}`;

    try {
        const featuredProjects = await getEntity<IFeaturedProject[]>(url);

        return featuredProjects;
    } catch (error) {
        console.log('Error loading featured project: ', error);
    }
};

export const getMemberAttendance = async (
    filter: {
        memberId: string;
        type?: string;
        start_date?: string;
        end_date?: string;
    },
    cookie?: string
) => {
    const searchParams = new URLSearchParams({
        id: filter.memberId,
    });

    if (filter.type) {
        searchParams.append('type', filter.type);
    }

    if (filter.start_date) {
        searchParams.append('start_date', filter.start_date);
    }

    if (filter.end_date) {
        searchParams.append('end_date', filter.end_date);
    }

    const url = `${API_BASE_URL + MEMBERS_PATH}/attendance?${searchParams}`;

    try {
        const attendance = await getEntity<IMemberAttendance>(url, cookie);

        return attendance;
    } catch (error) {
        console.log('Error loading member attendance: ', error);
    }
};
