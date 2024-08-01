import CatrafusaleRegistration from '@/models/catrafusaleRegistration';
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

const getEntity = async (url: string, cookies?: string) => {
    const headers = cookies ? { Cookie: cookies } : undefined;

    const response = await fetch(url, { cache: 'no-store', headers });

    if (!response.ok) {
        throw new Error('Bad response');
    }

    return response;
};

export const getProjects = async () => {
    const url = API_BASE_URL + PROJECTS_PATH;

    try {
        const projects = await getEntity(url);

        return projects.json();
    } catch (error) {
        console.log('Error loading projects: ', error);
    }
};

export const getProject = async (projectUrl: string) => {
    const url = `${API_BASE_URL + PROJECTS_PATH}/${projectUrl}`;

    try {
        const project = await getEntity(url);

        return project.json();
    } catch (error) {
        console.log('Error loading project: ', error);
    }
};

export const getMembers = async () => {
    const url = API_BASE_URL + MEMBERS_PATH;

    try {
        const members = await getEntity(url);

        return members.json();
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
        const member = await getEntity(url, cookie);

        return member.json();
    } catch (error) {
        console.log('Error loading member: ', error);
    }
};

export const getCauses = async () => {
    const url = API_BASE_URL + CAUSES_PATH;

    try {
        const causes = await getEntity(url);

        return causes.json();
    } catch (error) {
        console.log('Error loading causes: ', error);
    }
};

export const getMeetings = async () => {
    const url = API_BASE_URL + MEETINGS_PATH;

    try {
        const meetings = await getEntity(url);

        return meetings.json();
    } catch (error) {
        console.log('Error loading meetings: ', error);
    }
};

export const getCheckoutSession = async (session_id: string) => {
    const url = `${API_BASE_URL + CHECKOUT_PATH}?session_id=${session_id}`;

    try {
        const checkoutSession = await getEntity(url);

        return checkoutSession.json();
    } catch (error) {
        console.log('Error loading checkout session: ', error);
    }
};

export const getFeaturedProject = async () => {
    const url = `${API_BASE_URL + FEATURED_PROJECTS_PATH}`;

    try {
        const featuredProject = await getEntity(url);

        return featuredProject.json();
    } catch (error) {
        console.log('Error loading featured project: ', error);
    }
};

export const getCatrafusaleRegistrations = async () => {
    await connectMongoDB();
    const registrations = await CatrafusaleRegistration.find();
    return registrations;
};
