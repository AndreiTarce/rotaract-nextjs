import { ProjectPartnerDto } from '@/dtos/project.dto';
import { PartnerInteractor } from '@/interactors/partnerInteractor';
import { PartnerRepository } from '@/repositories/partnerRepository';

const partnerInteractor = new PartnerInteractor(new PartnerRepository());

export async function getProjectPartners(projectPartners: ProjectPartnerDto[]) {
    const projectPartnerIds = projectPartners.map((projectPartner) => projectPartner.partnerId);

    const partners = await partnerInteractor.getPartnersByIds(projectPartnerIds);

    return partners;
}
