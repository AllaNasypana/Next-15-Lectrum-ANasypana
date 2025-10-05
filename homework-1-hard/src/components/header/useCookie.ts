import {useEffect, useState} from 'react';
import { usePathname } from 'next/navigation';

export const useCookie =(name: string) => {
    const pathname = usePathname();
    const [cookie, setCookie] = useState<undefined | string>(undefined)
    const getClientSideCookie = (name: string) => {
        const cookieValue = document.cookie
            .split('; ')
            .find((row) => row.startsWith(`${name}=`))
            ?.split('=')[1];
        return cookieValue;
    };
    useEffect(() => {
        const cookieValue = getClientSideCookie(name);
        if(cookieValue!== cookie){
            setCookie(cookieValue)
        }
    }, [pathname])

    return {cookie, pathname};
}