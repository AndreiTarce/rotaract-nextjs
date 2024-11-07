import { IFeaturedProjectDocument } from '@/interfaces/project/IProject';
import FeaturedProject from '@/models/featuredProject';
import { Repository } from './repository';

export class FeaturedProjectRepository extends Repository<IFeaturedProjectDocument> {
    constructor() {
        super(FeaturedProject);
    }
}
