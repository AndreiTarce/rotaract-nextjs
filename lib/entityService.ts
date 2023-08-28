import Member, { IMember } from "@/models/member";
import connectMongoDB from "./mongodb";

const PROJECTS_PATH = '/api/projects';
const MEMBERS_PATH = '/api/members';
const API_BASE_URL = process.env.API_BASE_URL;

export const getProjects = async () => {
    const url = API_BASE_URL + PROJECTS_PATH;
    try {
        const res = await fetch(url, {
            cache: "no-store",
        });

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
        const res = await fetch(url, {
            cache: "no-store",
        });

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
        const res = await fetch(url, {
            cache: "no-store",
        });

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
            cache: "no-store",
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
    const boardMembers: IMember[] = await Member.find({ role: { $ne: 'member' } }).lean();
    return (boardMembers);
};