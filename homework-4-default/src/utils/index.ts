export const builderRouts = (path: string, locales: string[]) => {
    const res: {
        [key: string]: string;
    } = {};
    locales.forEach(lok => {
        res[lok] = path
    })
    return res
}

export const builderLanguagesLinks = (locales: string[], path: string = '') => {
    const res: {
        [key: string]: string;
    } = {};
    locales.forEach(locale => {
        res[locale] = `/${locale}${path}`
    })
    return res
}