import { NotFoundError } from '@/app/api/utils/errors';
import {
    CatrafusaleRegistrationWinter2024Dto,
    CatrafusaleWorkshopRegistrationWinter2024Dto,
    toCatrafusaleRegistrationWinter2024Dto,
    toCatrafusaleRegistrationWinter2024LimitDto,
    toCatrafusaleWorkshopRegistrationWinter2024Dto,
    toCatrafusaleWorkshopRegistrationWinter2024LimitDto,
} from '@/dtos/registration.dto';
import { IRepository } from '@/interfaces/IRepository';
import {
    ICatrafusaleRegistrationWinter2024Document,
    ICatrafusaleRegistrationWinter2024LimitDocument,
    ICatrafusaleWorkshopRegistrationWinter2024Document,
    ICatrafusaleWorkshopRegistrationWinter2024LimitDocument,
} from '@/interfaces/registration/ICatrafusaleRegistration2024Winter';
import CatrafusaleRegistrationWinter2024 from '@/models/catrafusaleRegistrationWinter2024';
import CatrafusaleWorkshopRegistrationWinter2024 from '@/models/catrafusaleWorkshopRegistrationWinter2024';
import {
    incrementStanders,
    incrementTables,
} from '@/use-cases/registrations/CatrafusaleRegistration2024WinterLimit';
import {
    incrementCandles,
    incrementClay,
    incrementGlobes,
} from '@/use-cases/registrations/CatrafusaleWorkshopRegistration2024WinterLimit';
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

    async confirmRegistrationPayment(checkoutSessionId: string) {
        await this.repository.findOneAndUpdate(
            {
                checkout_session_id: checkoutSessionId,
            },
            {
                $set: {
                    payment_confirmed: true,
                },
            }
        );
    }
}

export class CatrafusaleRegistrationLimitInteractor {
    private repository: IRepository<ICatrafusaleRegistrationWinter2024LimitDocument>;

    constructor(repository: IRepository<ICatrafusaleRegistrationWinter2024LimitDocument>) {
        this.repository = repository;
    }

    async getRegistrationNumbers() {
        const registrationNumbers = await this.repository.findAll();
        return toCatrafusaleRegistrationWinter2024LimitDto(registrationNumbers[0]);
    }

    async getRemainingStanders() {
        const limitDocument = await this.repository.findOne();

        if (!limitDocument) {
            throw new NotFoundError();
        }

        const limitObject = toCatrafusaleRegistrationWinter2024LimitDto(limitDocument);

        return limitObject.maxStanders - limitObject.currentStanders;
    }

    async getRemainingTables() {
        const limitDocument = await this.repository.findOne();

        if (!limitDocument) {
            throw new NotFoundError();
        }

        const limitObject = toCatrafusaleRegistrationWinter2024LimitDto(limitDocument);

        return limitObject.maxTables - limitObject.currentTables;
    }

    async incrementCurrentStanders(number: number) {
        const limitDocument = await this.repository.findOne();

        if (!limitDocument) {
            throw new NotFoundError();
        }

        const limitObject = toCatrafusaleRegistrationWinter2024LimitDto(limitDocument);
        const newLimitObject = incrementStanders(limitObject, number);
        await this.repository.update(newLimitObject);
    }

    async incrementCurrentTables(number: number) {
        const limitDocument = await this.repository.findOne();

        if (!limitDocument) {
            throw new NotFoundError();
        }

        const limitObject = toCatrafusaleRegistrationWinter2024LimitDto(limitDocument);
        const newLimitObject = incrementTables(limitObject, number);
        await this.repository.update(newLimitObject);
    }
}

export class CatrafusaleWorkshopRegistrationInteractor extends RegistrationInteractor<
    ICatrafusaleWorkshopRegistrationWinter2024Document,
    typeof CatrafusaleWorkshopRegistrationWinter2024
> {
    constructor() {
        super(CatrafusaleWorkshopRegistrationWinter2024);
    }

    async getRegistrations(): Promise<CatrafusaleWorkshopRegistrationWinter2024Dto[]> {
        const registrations = await this.repository.findAll();
        return registrations.map((registration) =>
            toCatrafusaleWorkshopRegistrationWinter2024Dto(registration)
        );
    }

    async createRegistration(
        registration: Partial<ICatrafusaleWorkshopRegistrationWinter2024Document>
    ): Promise<CatrafusaleWorkshopRegistrationWinter2024Dto> {
        const newRegistration = await this.repository.create(registration);
        return toCatrafusaleWorkshopRegistrationWinter2024Dto(newRegistration);
    }

    async confirmRegistrationPayment(checkoutSessionId: string) {
        await this.repository.findOneAndUpdate(
            {
                checkout_session_id: checkoutSessionId,
            },
            {
                $set: {
                    payment_confirmed: true,
                },
            }
        );
    }
}

export class CatrafusaleWorkshopRegistrationLimitInteractor {
    private repository: IRepository<ICatrafusaleWorkshopRegistrationWinter2024LimitDocument>;

    constructor(repository: IRepository<ICatrafusaleWorkshopRegistrationWinter2024LimitDocument>) {
        this.repository = repository;
    }

    async getRegistrationNumbers() {
        const registrationNumbers = await this.repository.findAll();
        return toCatrafusaleWorkshopRegistrationWinter2024LimitDto(registrationNumbers[0]);
    }

    async incrementCurrentCandles(number: number) {
        const limitDocument = await this.repository.findOne();

        if (!limitDocument) {
            throw new NotFoundError();
        }

        const limitObject = toCatrafusaleWorkshopRegistrationWinter2024LimitDto(limitDocument);
        const newLimitObject = incrementCandles(limitObject, number);
        await this.repository.update(newLimitObject);
    }

    async incrementCurrentGlobes(number: number) {
        const limitDocument = await this.repository.findOne();

        if (!limitDocument) {
            throw new NotFoundError();
        }

        const limitObject = toCatrafusaleWorkshopRegistrationWinter2024LimitDto(limitDocument);
        const newLimitObject = incrementGlobes(limitObject, number);
        await this.repository.update(newLimitObject);
    }

    async incrementCurrentClay(number: number) {
        const limitDocument = await this.repository.findOne();

        if (!limitDocument) {
            throw new NotFoundError();
        }

        const limitObject = toCatrafusaleWorkshopRegistrationWinter2024LimitDto(limitDocument);
        const newLimitObject = incrementClay(limitObject, number);
        await this.repository.update(newLimitObject);
    }

    async getRemainingCandles() {
        const limitDocument = await this.repository.findOne();

        if (!limitDocument) {
            throw new NotFoundError();
        }

        const limitObject = toCatrafusaleWorkshopRegistrationWinter2024LimitDto(limitDocument);

        return limitObject.maxCandles - limitObject.currentCandles;
    }

    async getRemainingGlobes() {
        const limitDocument = await this.repository.findOne();

        if (!limitDocument) {
            throw new NotFoundError();
        }

        const limitObject = toCatrafusaleWorkshopRegistrationWinter2024LimitDto(limitDocument);

        return limitObject.maxGlobes - limitObject.currentGlobes;
    }

    async getRemainingClay() {
        const limitDocument = await this.repository.findOne();

        if (!limitDocument) {
            throw new NotFoundError();
        }

        const limitObject = toCatrafusaleWorkshopRegistrationWinter2024LimitDto(limitDocument);

        return limitObject.maxClay - limitObject.currentClay;
    }
}
