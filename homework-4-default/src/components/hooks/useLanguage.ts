'use client';

import { useEffect, useState, useEffectEvent } from 'react';
import { useLocale} from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { supportedLocales, cookieLanguageKey } from '@/config';
const localStorageKey = 'preferred-language';



export const useLanguage = () => {
  const [language, setLanguage] = useState<string | null>(null);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const getBrowserLanguage = () => {
    if (typeof navigator === 'undefined') return null;
    const detectedLanguage = navigator.language || navigator.languages?.[0] as unknown as string;
    let language = detectedLanguage.split('-')[0]
    if(language === 'uk') {
      language = 'ua'
    }

    return language
  };

  const getLanguageFromLocalStorage = () => {
    if (typeof window === 'undefined') return null;

    try {
      return localStorage.getItem(localStorageKey);
    } catch (error) {
      return null;
    }
  };

  const saveLanguageToLocalStorage = (language: string) => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(localStorageKey, language);

    } catch (error) {

    }
  };

  const getLanguageFromCookie = () => {
    if (typeof document === 'undefined') return null;

    const cookies = document.cookie.split(';');
    const localeCookie = cookies.find(cookie =>
        cookie.trim().startsWith(cookieLanguageKey)
    );

    if (localeCookie) {
      return localeCookie.split('=')[1];
    }
    return null;
  };

  const saveLanguageToCookie = (language: string) => {
    if (typeof document === 'undefined') return;

    const expires = new Date();
    expires.setTime(expires.getTime() + (365 * 24 * 60 * 60 * 1000));

    document.cookie = `${cookieLanguageKey}=${language}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;

  };

  const onSetLanguage = useEffectEvent((language: string) => setLanguage(language))

  useEffect(() => {
    let language = getLanguageFromCookie() || getLanguageFromLocalStorage() || getBrowserLanguage() || supportedLocales[0];
    if(!supportedLocales.includes(language)) {
      language = supportedLocales[0]
    }
    if(language !== locale) {
      router.replace(pathname, { locale: language });
    }
    onSetLanguage(language);
  }, []);

  const onSelectLanguage = (languageSelect: string) => {
    if(languageSelect !== language && supportedLocales.includes(languageSelect)) {
      saveLanguageToCookie(languageSelect);
      saveLanguageToLocalStorage(languageSelect);
      setLanguage(languageSelect);
      router.replace(pathname, { locale: languageSelect});
    }
  }


  return {language, onSelectLanguage};
};
