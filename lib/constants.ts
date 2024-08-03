//API PATHS
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const PROJECTS_PATH = '/api/projects';
export const MEMBERS_PATH = '/api/members';
export const CAUSES_PATH = '/api/causes';
export const MEETINGS_PATH = '/api/meetings';
export const CHECKOUT_PATH = '/api/checkout_sessions';
export const FEATURED_PROJECTS_PATH = '/api/featured_project';
export const MEMBER_ATTENDANCE_PATH = '/api/members/attendance';

//SOCIAL MEDIA AND WEBSITE LINKS
export const ROTARY_VISIO_WEBSITE_URL = 'https://rotaryvisio.ro/';
export const ROTARACT_VISIO_INSTAGRAM_URL =
    'https://www.instagram.com/rotaractvisiocj/';
export const ROTARACT_VISIO_FACEBOOK_URL =
    'https://www.facebook.com/RotaractVisioClujNapoca';
export const ROTARACT_VISIO_LINKEDIN_URL =
    'https://www.linkedin.com/company/rotaract-cluj-napoca-visio';
export const ROTARACT_VISIO_TIKTOK_URL =
    'https://www.tiktok.com/@rotaractvisiocj';
export const FACULTY_OF_BUSINESS_WEBSITE_URL = 'https://tbs.ubbcluj.ro/';
export const MEMBRI_ROTARACT_URL = 'https://membri.rotaract.ro/';
export const ROTARACT_VISIO_EMAIL = 'rotaractvisiocluj@gmail.com';
export const ROTARACT_VISIO_CONTACT_EMAIL = 'contact@rotaractvisio.com';
export const ROTARACT_VISIO_DRIVE_URL =
    'https://drive.google.com/drive/folders/1ZWdkmv2vzPRoW67s1A-1xt5b_C0DxYZg';
export const ROTARACT_VISIO_DIVERSE_DRIVE_URL =
    'https://drive.google.com/drive/folders/1Xedctsv1RLFWkKn-q3XaR9_-EdIA6ic3';
export const ROTARACT_VISIO_MINUTE_DRIVE_URL =
    'https://drive.google.com/drive/folders/1jVd1i82MoMS16nNJGcphXd2rHUDPIeR8?usp=drive_link';

//DATES
const currentDate = new Date();
export const ROTARIAN_YEAR_START_DATE =
    currentDate.getMonth() < 6
        ? new Date(currentDate.getFullYear() - 1, 6, 1)
        : new Date(currentDate.getFullYear(), 6, 1);
export const ROTARIAN_YEAR_END_DATE =
    currentDate.getMonth() < 6
        ? new Date(currentDate.getFullYear(), 6, 1)
        : new Date(currentDate.getFullYear() + 1, 6, 1);
