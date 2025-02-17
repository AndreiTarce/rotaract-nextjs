import { IPartner, IPartnerDocument } from '@/interfaces/partner/IPartner';

export interface PartnerDto extends IPartner {
    id: string;
}

export function toPartnerDto(partner: IPartnerDocument | PartnerDto): PartnerDto {
    return {
        id: partner.id,
        name: partner.name,
        logoUrl: partner.logoUrl,
        link: partner.link,
    };
}
