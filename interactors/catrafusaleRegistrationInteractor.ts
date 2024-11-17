import { NotFoundError } from '@/app/api/utils/errors';
import {
    CatrafusaleRegistrationWinter2024Dto,
    toCatrafusaleRegistrationWinter2024Dto,
    toCatrafusaleRegistrationWinter2024LimitDto,
} from '@/dtos/registration.dto';
import { IRepository } from '@/interfaces/IRepository';
import {
    ICatrafusaleRegistrationWinter2024Document,
    ICatrafusaleRegistrationWinter2024LimitDocument,
} from '@/interfaces/registration/ICatrafusaleRegistration2024Winter';
import CatrafusaleRegistrationWinter2024 from '@/models/catrafusaleRegistrationWinter2024';
import {
    incrementStanders,
    incrementTables,
} from '@/use-cases/registrations/CatrafusaleRegistration2024WinterLimit';
import { RegistrationInteractor } from './registrationInteractor';

export class CatrafusaleRegistrationInteractor extends RegistrationInteractor<
    ICatrafusaleRegistrationWinter2024Document,
    typeof CatrafusaleRegistrationWinter2024
> {
    constructor() {
        super(CatrafusaleRegistrationWinter2024);
    }

    async getRegistrations(): Promise<CatrafusaleRegistrationWinter2024Dto[]> {
        const registrations = await this.repository.findAll();
        return registrations.map((registration) =>
            toCatrafusaleRegistrationWinter2024Dto(registration)
        );
    }

    async createRegistration(
        registration: Partial<ICatrafusaleRegistrationWinter2024Document>
    ): Promise<CatrafusaleRegistrationWinter2024Dto> {
        const newRegistration = await this.repository.create(registration);
        return toCatrafusaleRegistrationWinter2024Dto(newRegistration);
    }
}

export class CatrafusaleRegistrationLimitInteractor {
    private repository: IRepository<ICatrafusaleRegistrationWinter2024LimitDocument>;

    constructor(
        repository: IRepository<ICatrafusaleRegistrationWinter2024LimitDocument>
    ) {
        this.repository = repository;
    }

    async getRegistrationNumbers() {
        const registrationNumbers = await this.repository.findAll();
        return toCatrafusaleRegistrationWinter2024LimitDto(
            registrationNumbers[0]
        );
    }

    async getRemainingStanders() {
        const limitDocument = await this.repository.findOne();

        if (!limitDocument) {
            throw new NotFoundError();
        }

        return toCatrafusaleRegistrationWinter2024LimitDto(limitDocument)
            .currentStanders;
    }

    async getRemainingTables() {
        const limitDocument = await this.repository.findOne();

        if (!limitDocument) {
            throw new NotFoundError();
        }

        return toCatrafusaleRegistrationWinter2024LimitDto(limitDocument)
            .currentTables;
    }

    async incrementCurrentStanders(number: number) {
        const limitDocument = await this.repository.findOne();

        if (!limitDocument) {
            throw new NotFoundError();
        }

        const limitObject =
            toCatrafusaleRegistrationWinter2024LimitDto(limitDocument);
        const newLimitObject = incrementStanders(limitObject, number);
        await this.repository.update(newLimitObject);
    }

    async incrementCurrentTables(number: number) {
        const limitDocument = await this.repository.findOne();

        if (!limitDocument) {
            throw new NotFoundError();
        }

        const limitObject =
            toCatrafusaleRegistrationWinter2024LimitDto(limitDocument);
        const newLimitObject = incrementTables(limitObject, number);
        await this.repository.update(newLimitObject);
    }
}
