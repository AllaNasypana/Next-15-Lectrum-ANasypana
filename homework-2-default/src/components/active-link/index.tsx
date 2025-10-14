'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { reclaimForRedirectLinks } from '@/utils'

export const ActiveLink = ({
                                       href,
                                       children,
                                   }: {
    href: string;
    children: ReactNode;
}) => {
    const pathname = usePathname() ?? '';
    const router = useRouter();
    const mapHref = reclaimForRedirectLinks(href) ?? href;
    const active = (mapHref === '/' && pathname === mapHref) || mapHref !== '/' && (pathname.startsWith(mapHref));
    const generalClass = 'px-3 py-2 transition-colors text-xl font-bold ';
    const linkClass = active ? generalClass + 'text-blue-700'
        : generalClass + 'hover:text-blue-700  text-blue-500';

    return (
        <Link
            onMouseEnter={()=> router.prefetch(mapHref)}
            href={href}
            prefetch={false}
            aria-current={active ? 'page' : undefined}
            className={linkClass}
        >
            {children}
        </Link>
    );
}