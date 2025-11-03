import {getTranslations} from 'next-intl/server';
import {builderLanguagesLinks} from "@/utils";
import {supportedLocales} from "@/config";


type Props = {
    params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props) {
    const {locale} = await params;
    const t = await getTranslations({locale});


    return {
        title: t('contact.title'),
        description: t('contact.description'),
        keywords: t('metadata.keywords'),
        openGraph: {
            title: t('contact.title'),
            description: t('contact.description'),
            locale: locale,
            type: 'website',
            siteName: t('metadata.siteName'),
        },
        twitter: {
            card: 'summary_large_image',
            title: t('contact.title'),
            description: t('contact.description'),
        },
        alternates: {
            canonical: `/${locale}/contact`,
            languages: {
                ...builderLanguagesLinks(supportedLocales, '/contact'),
                'x-default': '/en/contact'
            }
        }
    };
}


export default async function ContactPage({params}: Props) {
    const {locale} = await params;
    const t = await getTranslations({locale, namespace: 'contact'});

    return (
        <div className={'flex flex-col items-center justify-center py-6'}>
            <h1 className={'text-blue-700 text-2xl font-bold text-center mb-6'}>{ t('title')}</h1>
            <div className="text-lg  font-bold text-center mb-4">{t('description')}</div>
            <div className="text-lg text-center mb-4">{t('content')}</div>
            <div className="text-lg text-center mb-4">{t('email')}</div>
            <div className="text-lg text-center mb-4">{t('phone')}</div>
        </div>
    );
}