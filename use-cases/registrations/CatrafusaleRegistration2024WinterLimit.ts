import { CatrafusaleRegistrationWinter2024LimitDto } from '@/dtos/registration.dto';

const incrementStanders = (
    limitObject: CatrafusaleRegistrationWinter2024LimitDto,
    incrementBy: number
) => {
    const { currentStanders } = limitObject;
    const newCurrentStanders = currentStanders + incrementBy;
    const newLimitObject = {
        ...limitObject,
        currentStanders: newCurrentStanders,
    };
    return newLimitObject;
};

const incrementTables = (
    limitObject: CatrafusaleRegistrationWinter2024LimitDto,
    incrementBy: number
) => {
    const { currentTables } = limitObject;
    const newCurrentTables = currentTables + incrementBy;
    const newLimitObject = {
        ...limitObject,
        currentTables: newCurrentTables,
    };
    return newLimitObject;
};

export { incrementStanders, incrementTables };
