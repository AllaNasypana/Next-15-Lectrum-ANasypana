'use client'
import { useUser } from '@clerk/nextjs';
import {  usePathname } from 'next/navigation';
import { ActiveLink } from '../active-link';
import { LoginButton } from './login-button';
import {authRoutes,  publicRoutes} from '@/routes';


const headersRoutes = [
    {
        href: '/',
        label: 'Home',
    },
    {
        href: '/profile',
        label: 'Profile',
    },
    {
        href: '/posts',
        label: 'Posts',
    },

]


export const Header = () => {
    const pathname = usePathname();
    const { user } = useUser();
    let links = [...headersRoutes]

    const isLoggedIn = !!user;

    const isAuth = !!pathname  && authRoutes.some((route) => {
        const index = route.indexOf('(.');
        return pathname.startsWith(route.slice(0, index));
    });

    if(!isLoggedIn) {
        links = links.filter((link) => {
            if(link.href === '/' && publicRoutes.includes(link.href)) {
                return true;
            }
            return publicRoutes.some(r => r.startsWith(link.href));
        })
    }


    return (
        <header className="flex items-center justify-between p-4 bg-neutral-100 shadow-md">
            <nav className="flex items-center justify-between  w-full">
                <div className="flex items-center gap-2">
                    {links.map((l) => ( <ActiveLink key={`hl-${l.href}`} href={l.href}>{l.label}</ActiveLink>))}
                </div>
                <div className="flex items-center gap-2">

                    {!isAuth && (
                        <LoginButton isLoggedIn={isLoggedIn} />
                    )}
                </div>
            </nav>
        </header>
    )
}
