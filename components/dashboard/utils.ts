import { IMemberLinks } from '@/interfaces/member/IMember';

export const removeUndefinedLinkKeys = (obj: IMemberLinks) => {
    for (let key in obj) {
        if (obj[key as keyof IMemberLinks] === undefined) {
            // Remove the key with undefined value
            delete obj[key as keyof IMemberLinks];
        }
    }
};
