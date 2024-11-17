import { RegistrationNotAvailableError } from '@/app/api/utils/errors';
import { CatrafusaleRegistrationWinter2024Dto } from '@/dtos/registration.dto';
import {
    CatrafusaleRegistrationInteractor,
    CatrafusaleRegistrationLimitInteractor,
} from '@/interactors/catrafusaleRegistrationInteractor';
import CatrafusaleRegistrationWinter2024Limit from '@/models/catrafusaleRegistrationWinter2024Limit';
import { Repository } from '@/repositories/repository';

const registrationInteractor = new CatrafusaleRegistrationInteractor();
const registrationLimitInteractor = new CatrafusaleRegistrationLimitInteractor(
    new Repository(CatrafusaleRegistrationWinter2024Limit)
);

export async function createRegistration(
    registration: CatrafusaleRegistrationWinter2024Dto
) {
    const packageStandersAndTables = getPackageStandersAndTables(
        registration.package
    );

    const shouldContinueToReservation =
        await checkStandersOrTablesAreAvailableForPurchase(
            packageStandersAndTables
        );

    if (!shouldContinueToReservation) {
        throw new RegistrationNotAvailableError(
            'There are not enough standers or tables for the chosen package'
        );
    }

    await reserveStandersOrTables(packageStandersAndTables);

    return await registrationInteractor.createRegistration(registration);
}

const getPackageStandersAndTables = (packageName: string) => {
    switch (packageName) {
        case 'single':
            return { standers: 1, tables: 0 };
        case 'double':
            return { standers: 2, tables: 0 };
        case 'table':
            return { standers: 0, tables: 1 };
        case 'mixt':
            return { standers: 1, tables: 1 };
        default:
            return { standers: 1, tables: 0 };
    }
};

const checkStandersOrTablesAreAvailableForPurchase =
    async (packageStandersAndTablesObject: {
        standers: number;
        tables: number;
    }) => {
        const registrationLimit =
            await registrationLimitInteractor.getRegistrationNumbers();

        if (
            !(
                packageStandersAndTablesObject.standers <=
                registrationLimit.maxStanders -
                    registrationLimit.currentStanders
            )
        ) {
            return false;
        }

        if (
            !(
                packageStandersAndTablesObject.tables <=
                registrationLimit.maxTables - registrationLimit.currentTables
            )
        ) {
            return false;
        }

        return true;
    };

const reserveStandersOrTables = async (packageStandersAndTablesObject: {
    standers: number;
    tables: number;
}) => {
    if (packageStandersAndTablesObject.standers) {
        await registrationLimitInteractor.incrementCurrentStanders(
            packageStandersAndTablesObject.standers
        );
    }

    if (packageStandersAndTablesObject.tables) {
        await registrationLimitInteractor.incrementCurrentTables(
            packageStandersAndTablesObject.tables
        );
    }
};
