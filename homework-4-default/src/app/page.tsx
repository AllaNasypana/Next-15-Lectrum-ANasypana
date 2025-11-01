import {redirect} from 'next/navigation';
import {cookies} from 'next/headers';
import { supportedLocales, cookieLanguageKey}  from '@/config'

export default async function RootPage() {
  const store = await cookies();
  const cookieLocale = store.get(cookieLanguageKey)?.value || supportedLocales[0]
  const localeData = supportedLocales.includes(cookieLocale) ? cookieLocale : supportedLocales[0];

  redirect(`/${localeData}`);
}
