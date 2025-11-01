'use client'
import {useTranslations} from 'next-intl';
import { ActiveLink } from '@/components/active-link';
import { Select } from '@/components/select';
import { supportedLocales } from '@/config';
import { useLanguage } from '../hooks';


const headersRoutes = [
    {
        key: 'home',
        href: '/',
        label: 'Home',
    },
    {
        key: 'about',
        href: '/about',
        label: 'About',
    },
    {
        key: 'contact',
        href: '/contact',
        label: 'Contact',
    },


]


export const Header = () => {
    const t = useTranslations('navigation');




    const { language, onSelectLanguage } = useLanguage();

    const links = [...headersRoutes].map(l => ({
        ...l,
        label: t(l.key)
    }))




    return (
        <header className="flex items-center justify-between p-6 bg-neutral-100 shadow-md">
            <nav className="flex items-center justify-between  w-full">
                <div className="flex items-center gap-2">
                    {links.map((l) =>
                        ( <ActiveLink key={`hl-${l.href}`} href={l.href as unknown as '/' | '/about' | '/contact'}>
                            {l.label}
                        </ActiveLink>))}
                </div>
                <div className="flex items-center gap-2">
                    <Select
                        value={language || ''}
                        onChange={(e) => {
                            onSelectLanguage(e.target.value);
                        }}
                        options={supportedLocales.map(l => ({label: l.toUpperCase(), value: l}))} />


                </div>
            </nav>
        </header>
    )
}
