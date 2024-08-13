import { Document } from 'mongoose';

export interface IPartner {
    name: string;
    logoUrl: string;
    link: string;
}

export interface IPartnerDocument extends IPartner, Document {}
