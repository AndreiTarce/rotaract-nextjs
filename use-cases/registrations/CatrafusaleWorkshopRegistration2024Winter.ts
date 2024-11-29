import { getStripePrices } from '@/components/payments/constants';
import { CatrafusaleWorkshopRegistrationLimitInteractor } from '@/interactors/catrafusaleRegistrationInteractor';
import CatrafusaleWorkshopRegistrationWinter2024Limit from '@/models/catrafusaleWorkshopRegistrationWinter2024Limit';
import { Repository } from '@/repositories/repository';

export const reserveWorkshop = async (workshopPackageName: string) => {
    const { CATRAFUSALE_2024_WINTER_WORKSHOPS } = getStripePrices();

    const registrationLimitInteractor =
        new CatrafusaleWorkshopRegistrationLimitInteractor(
            new Repository(CatrafusaleWorkshopRegistrationWinter2024Limit)
        );

    switch (workshopPackageName) {
        case CATRAFUSALE_2024_WINTER_WORKSHOPS[0].name:
            return await registrationLimitInteractor.incrementCurrentCandles(1);
        case CATRAFUSALE_2024_WINTER_WORKSHOPS[1].name:
            return await registrationLimitInteractor.incrementCurrentGlobes(1);
        case CATRAFUSALE_2024_WINTER_WORKSHOPS[2].name:
            return await registrationLimitInteractor.incrementCurrentClay(1);
    }
};

export const getPackageNameFromProductId = (productId: string) => {
    const { CATRAFUSALE_2024_WINTER_WORKSHOPS } = getStripePrices();

    const packageName = CATRAFUSALE_2024_WINTER_WORKSHOPS.find(
        (pckg) => pckg.productId === productId
    );

    return packageName?.name;
};
