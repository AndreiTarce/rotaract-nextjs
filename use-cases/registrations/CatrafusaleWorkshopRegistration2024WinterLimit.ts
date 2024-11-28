import { CatrafusaleWorkshopRegistrationWinter2024LimitDto } from '@/dtos/registration.dto';

const incrementCandles = (
    limitObject: CatrafusaleWorkshopRegistrationWinter2024LimitDto,
    incrementBy: number
) => {
    const { currentCandles } = limitObject;
    const newCurrentCandles = currentCandles + incrementBy;
    const newLimitObject = {
        ...limitObject,
        currentCandles: newCurrentCandles,
    };
    return newLimitObject;
};

const incrementGlobes = (
    limitObject: CatrafusaleWorkshopRegistrationWinter2024LimitDto,
    incrementBy: number
) => {
    const { currentGlobes } = limitObject;
    const newCurrentGlobes = currentGlobes + incrementBy;
    const newLimitObject = {
        ...limitObject,
        currentGlobes: newCurrentGlobes,
    };
    return newLimitObject;
};

const incrementClay = (
    limitObject: CatrafusaleWorkshopRegistrationWinter2024LimitDto,
    incrementBy: number
) => {
    const { currentClay } = limitObject;
    const newCurrentClay = currentClay + incrementBy;
    const newLimitObject = {
        ...limitObject,
        currentClay: newCurrentClay,
    };
    return newLimitObject;
};

export { incrementCandles, incrementClay, incrementGlobes };
