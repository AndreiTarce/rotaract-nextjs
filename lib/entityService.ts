import { IProject } from "@/models/project";

const PROJECTS_PATH = '/api/projects';
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

export const getProject = async (projectUrl) => {
    const url = `${API_BASE_URL + PROJECTS_PATH}/${projectUrl}`;
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
}