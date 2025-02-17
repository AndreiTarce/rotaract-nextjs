interface Dictionary {
    home: {
        CTAtext: string;
        CTAbutton: string;
    };
}

type DictionaryLoader = () => Promise<Dictionary>;

const dictionaries: Record<string, DictionaryLoader> = {
    en: () => import('../locales/en.json').then((module) => module.default),
    ro: () => import('../locales/ro.json').then((module) => module.default),
};

export const getDictionary = async (locale: string): Promise<Dictionary> => dictionaries[locale]();
