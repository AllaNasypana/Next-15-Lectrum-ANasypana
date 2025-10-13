'use client'

import { LuShoppingCart } from "react-icons/lu";
import {  useRouter,usePathname } from 'next/navigation';
import { ActiveLink } from '../active-link';
import { LoginButton } from './login-button';
import {authRoutes, notAllowedManager, notAllowedAdmin, publicRoutes} from '@/routes';
import { IntentionPrefetchLink } from '../intention-prefetch-link';
import { LoginSchema } from '@/schems';
import {addingNewLinks } from '@/utils';
import { ERole } from '@/types';

interface IProps {
    cartAmount: number;
    user: LoginSchema | null;
    revalidateRootPage: () => Promise<void>;
}


const headersRoutes = [
    {
        href: '/',
        label: 'Home',
    },
    {
        href: '/products',
        label: 'Catalog',
    },
    {
        href: '/news',
        label: 'Company news',
    },
    {
        href: '/setting',
        label: 'Setting',
    }
]


export const Header = ({cartAmount, user, revalidateRootPage}: IProps) => {

    const router = useRouter();
    const pathname = usePathname();
    let links = [...headersRoutes];

    const isLoggedIn = !!user;
    const isAuth = !!pathname  && authRoutes.includes(pathname);
    if(!isLoggedIn) {
        links = [...links].filter(l => addingNewLinks(publicRoutes).includes(l.href));
    }
    if(isLoggedIn && user?.role === ERole.superadmin){
        links = [...headersRoutes];
    }

    if(isLoggedIn && user?.role === ERole.admin){
        links = [...links].filter(l => !addingNewLinks(notAllowedAdmin).includes(l.href));
    }

    if(isLoggedIn && user?.role === ERole.manager){
        links = [...links].filter(l => !addingNewLinks(notAllowedManager).includes(l.href));
    }

    return (
        <header className="flex items-center justify-between p-4 bg-neutral-100 shadow-md">
            <nav className="flex items-center justify-between  w-full">
                <div className="flex items-center gap-2">
                    {links.map((l) => ( <ActiveLink key={`hl-${l.href}`} href={l.href}>{l.label}</ActiveLink>))}

                </div>
                <div className="flex items-center gap-2">
                    {
                        isLoggedIn && (
                            <IntentionPrefetchLink className='flex items-center pt-2.5 text-xl text-blue-500' href={'/cart'}>
                                {!!cartAmount ? cartAmount : ''}
                                <LuShoppingCart size={24} color={'oklch(62.3% 0.214 259.815)'}/>
                            </IntentionPrefetchLink>
                        )
                    }
                    {!isAuth && (
                        <LoginButton isLoggedIn={isLoggedIn} onClick={async () => {

                            if(isLoggedIn){
                                await fetch(`/api/cart/all`, {method: "DELETE"});
                                router.push('/logout');
                                await revalidateRootPage()
                            }else {
                                router.push('/login');
                            }

                        }}/>
                    )}
                </div>


            </nav>
        </header>
    )
}
