import Member, { IMember } from "@/models/member";
import connectMongoDB from "./mongodb";
import WhitelistedMember, { IWhitelistedMember } from "@/models/whitelistedMember";

const PROJECTS_PATH = '/api/projects';
const MEMBERS_PATH = '/api/members';
const API_BASE_URL = process.env.API_BASE_URL;
const CAUSES_PATH = '/api/causes';

export const getProjects = async () => {
    const url = API_BASE_URL + PROJECTS_PATH;
    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error("Failed to fetch projects");
        }

        return res.json();
    } catch (error) {
        console.log("Error loading projects: ", error);
    }
};

export const getProject = async (projectUrl: string) => {
    const url = `${API_BASE_URL + PROJECTS_PATH}/${projectUrl}`;
    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error("Failed to fetch project");
        }

        return res.json();
    } catch (error) {
        console.log("Error loading project: ", error);
    }
};

export const getMembers = async () => {
    const url = API_BASE_URL + MEMBERS_PATH;
    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error("Failed to fetch members");
        }
        return res.json();
    } catch (error) {
        console.log("Error loading members: ", error);
    }
};

export const getMember = async (memberId: string) => {
    const url = `${API_BASE_URL + PROJECTS_PATH}/${memberId}`;
    try {
        const res = await fetch(url, {
            // cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch member");
        }

        return res.json();
    } catch (error) {
        console.log("Error loading member: ", error);
    }
};

export const getBoardMembers = async () => {
    await connectMongoDB();
    const boardMembers: IMember[] = await Member.find({ role: { $nin: ['member', 'past president'] } }).lean();
    return boardMembers;
};

export const getMemberWhitelist = async () => {
    await connectMongoDB();
    const whitelistedMembers: IWhitelistedMember[] = await WhitelistedMember.find().lean();
    return whitelistedMembers;
};

export const getPastPresidents = async () => {
    await connectMongoDB();
    const pastPresidents: IMember[] = await Member.find({ role: 'past president' }).sort({ start_mandate: -1 }).lean();
    return pastPresidents;
};

export const getCauses = async () => {
    const url = API_BASE_URL + CAUSES_PATH;
    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error("Failed to fetch members");
        }
        return res.json();
    } catch (error) {
        console.log("Error loading members: ", error);
    }
};