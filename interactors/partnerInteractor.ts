import { PartnerDto, toPartnerDto } from '@/dtos/partner.dto';
import { IPartnerRepository } from '@/interfaces/partner/IPartnerRepository';

export class PartnerInteractor {
    private repository: IPartnerRepository;

    constructor(repository: IPartnerRepository) {
        this.repository = repository;
    }

    async getPartners() {
        const partners = await this.repository.findAll();
        return partners.map((partner) => toPartnerDto(partner));
    }

    async getPartnersByIds(ids: string[]) {
        const result = await this.repository.findByIds(ids);

        const projectPartners = result.map((partner) => toPartnerDto(partner));
        return projectPartners;
    }

    async getPartnersByName(name: string) {
        const partners = await this.repository.findByName(name);

        if (partners) {
            return partners.map((partner) => toPartnerDto(partner));
        }
    }

    async createPartner(partner: Partial<PartnerDto>) {
        const createdPartner = await this.repository.create(partner);
        return toPartnerDto(createdPartner);
    }
}
