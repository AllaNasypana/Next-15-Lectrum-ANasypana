import {getTranslations} from 'next-intl/server';
import { supportedLocales} from '@/config'

type Props = {
    params: Promise<{locale: string}>;
};

/*export const dynamicParams = false;*/

export async function generateStaticParams() {
    return supportedLocales.map(l => ({
        locale: l
    }));
}

export default async function HomePage({params}: Props) {
    const {locale} = await params;

    const t = await getTranslations({locale, namespace: 'home'});

    return (
        <div className={'flex flex-col items-center justify-center py-6'}>
            <h1 className={'text-blue-700 text-2xl font-bold text-center mb-6'}>{ t('title')}</h1>
            <div className="text-lg  font-bold text-center mb-4">{t('description')}</div>
            <div className="text-lg text-center">{t('paragraph1')}</div>
            <div className="text-lg text-center">{t('paragraph2')}</div>
        </div>
    );
}