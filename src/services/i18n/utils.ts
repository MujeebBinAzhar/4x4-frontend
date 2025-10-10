// application
import { baseUrl } from '~/services/utils';
import { ILanguage } from '~/interfaces/language';
// data
import dataShopLanguages, { dataShopDefaultLocale } from '~/data/shopLanguages';
// translations
import enTranslations from '~/i18n/en.json';
import arTranslations from '~/i18n/ar.json';
import ruTranslations from '~/i18n/ru.json';

const translationsMap: Record<string, Record<string, string>> = {
    en: enTranslations,
    ar: arTranslations,
    ru: ruTranslations,
};

export function getDefaultLocale(): string {
    return dataShopDefaultLocale;
}

export function getAllLanguages(): ILanguage[] {
    return dataShopLanguages;
}

export function getDefaultLanguage(): ILanguage {
    const language = getAllLanguages().find((language) => language.locale === getDefaultLocale());

    if (!language) {
        throw new Error('Default language not found.');
    }

    return language;
}

export function getLanguageByPath(path: string): ILanguage | null {
    return getAllLanguages().find((language) => {
        const rg = new RegExp(`^\\/${language.locale}(\\/|$)`);

        return rg.test(path);
    }) || null;
}

export function getLanguageByLocale(locale: string): ILanguage | null {
    return getAllLanguages().find((language) => language.locale === locale) || null;
}

async function loadTranslation(locale: string): Promise<Record<string, string>> {
    if (process.browser) {
        return fetch(baseUrl(`/i18n/${locale}.json`)).then((response) => response.json());
    }

    return translationsMap[locale] || {};
}

export async function loadMessages(locale: string): Promise<Record<string, string>> {
    const baseMessages: ReturnType<typeof loadTranslation> = locale === getDefaultLocale()
        ? Promise.resolve({})
        : loadTranslation(getDefaultLocale());
    const mainMessages = loadTranslation(locale);

    return { ...await baseMessages, ...await mainMessages };
}
