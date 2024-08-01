export const PROJECTS_PATH = '/api/projects';
export const MEMBERS_PATH = '/api/members';
export const API_BASE_URL = process.env.API_BASE_URL;
export const CAUSES_PATH = '/api/causes';
export const MEETINGS_PATH = '/api/meetings';
export const CHECKOUT_PATH = '/api/checkout_sessions';
export const FEATURED_PROJECTS_PATH = '/api/featured_project';
export const MEMBER_ATTENDANCE_PATH = '/api/members/attendance';

const currentDate = new Date();
export const ROTARIAN_YEAR_START_DATE =
    currentDate.getMonth() < 6
        ? new Date(currentDate.getFullYear() - 1, 6, 1)
        : new Date(currentDate.getFullYear(), 6, 1);
export const ROTARIAN_YEAR_END_DATE =
    currentDate.getMonth() < 6
        ? new Date(currentDate.getFullYear(), 6, 1)
        : new Date(currentDate.getFullYear() + 1, 6, 1);
