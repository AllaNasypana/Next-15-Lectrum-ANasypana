import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
import { builderRouts } from '@/utils'
import { supportedLocales} from '@/config';


export const routing = defineRouting({
  locales: [...supportedLocales],
  defaultLocale: supportedLocales[0],
  pathnames: {
    '/': '/',
    '/about': {
      ...builderRouts('/about', supportedLocales)
    },
    '/contact': {
      ...builderRouts('/contact', supportedLocales)
    },
  }
});

export const {Link, redirect, usePathname, useRouter} = createNavigation(routing);
