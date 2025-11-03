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
        title: t('about.title'),
        description: t('about.description'),
        keywords: t('metadata.keywords'),
        openGraph: {
            title: t('about.title'),
            description: t('about.description'),
            locale: locale,
            type: 'website',
            siteName: t('metadata.siteName'),
        },
        twitter: {
            card: 'summary_large_image',
            title: t('about.title'),
            description: t('about.description'),
        },
        alternates: {
            canonical: `/${locale}/about`,
            languages: {
                ...builderLanguagesLinks(supportedLocales, '/about'),
                'x-default': '/en/about'

            }
        }
    };
}


export default async function AboutPage({params}: Props) {
    const {locale} = await params;

    const t = await getTranslations({locale, namespace: 'about'});

    return (
        <div className={'flex flex-col items-center justify-center py-6'}>
            <h1 className={'text-blue-700 text-2xl font-bold text-center mb-6'}>{ t('title')}</h1>
            <div className="text-lg  font-bold text-center mb-4">{t('description')}</div>
            <div className="text-lg text-center mb-4">{t('content')}</div>
        </div>
    );
}