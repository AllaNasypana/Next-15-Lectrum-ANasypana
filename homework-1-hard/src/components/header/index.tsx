'use client'
import {  useRouter,  } from 'next/navigation';
import { ActiveLink } from '../active-link';
import { LoginButton } from './login-button';
import { useCookie } from './useCookie'


export const Header = () => {

    const router = useRouter();
    const { cookie} = useCookie('user');
    const isLoggedIn = !!cookie;

    return (
        <header className="flex items-center justify-between p-4 bg-neutral-100 shadow-md">
            <nav className="flex items-center justify-between  w-full">
                <div className="flex items-center gap-2">
                   {/* <ActiveLink href="/">Home</ActiveLink>*/}
                    <ActiveLink href="/news">News</ActiveLink>
                    {isLoggedIn && <ActiveLink href="/todos">My Tasks</ActiveLink>}
                    {isLoggedIn && <ActiveLink href="/profile">Profile</ActiveLink>}
                </div>
                <LoginButton isLoggedIn={isLoggedIn} onClick={() => {

                    if(isLoggedIn){
                        router.push('/logout');
                    }else {
                        router.push('/login');
                    }

                }}/>

            </nav>
        </header>
    )
}
