import { ReactNode } from 'react'
import {NextIntlClientProvider} from 'next-intl';
import {getTranslations} from 'next-intl/server';
import { supportedLocales } from '@/config';
import { builderLanguagesLinks } from '@/utils';
import { Header } from '@/components';

import "@/styles/globals.css";

type Props = {
    children: ReactNode;
    params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props) {
    const {locale} = await params;
    const t = await getTranslations({locale, namespace: 'metadata'});


    return {
        title: {
            default: t('title'),
            template: `Multilingual Demo Site | %s`
        },
        description: t('description'),
        keywords: t('keywords'),
        openGraph: {
            title: t('title'),
            description: t('description'),
            locale: locale,
            type: 'website',
            siteName: t('siteName'),
        },
        twitter: {
            card: 'summary_large_image',
            title: t('title'),
            description: t('description'),
        },
        alternates: {
            canonical: `/${locale}`,
            languages: {
                ...builderLanguagesLinks(supportedLocales),
                'x-default': '/en'

            }
        }
    };
}

export default async function LocaleLayout({children, params}: Props) {
    const {locale} = await params;

    let messages;
    if(supportedLocales.includes(locale)) {
        messages = (await import(`../../../messages/${locale}.json`)).default;
    }else {
        messages = (await import(`../../../messages/${locale[0]}.json`)).default;
    }


    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider messages={messages} locale={locale}>
                    <Header />
                    <main className={'p-6'}>
                        {children}
                    </main>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}