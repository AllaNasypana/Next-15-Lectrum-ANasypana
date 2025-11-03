import {cookies} from 'next/headers';
import {getRequestConfig} from 'next-intl/server';
import { supportedLocales, cookieLanguageKey } from '@/config';

export default getRequestConfig(async ({locale}) => {
  const store = await cookies();
  const cookieLocale = store.get(cookieLanguageKey)?.value || supportedLocales[0]
  const localeData = supportedLocales.includes(cookieLocale) ? cookieLocale : supportedLocales[0];
  const validLocale = !!locale && supportedLocales.includes(locale) ? locale : localeData;
  
  return {
    locale: validLocale,
    messages: (await import(`../../messages/${validLocale}.json`)).default
  };
});