'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter,  } from 'next/navigation';

export const ActiveLink = ({
                                       href,
                                       children,
                                       prefetch = true,
                                   }: {
    href: string;
    children: ReactNode;
    prefetch?: boolean;
}) => {
    const pathname = usePathname() ?? '';

    const active = (href === '/' && pathname === href) || href !== '/' && (pathname.startsWith(href));
    const generalClass = 'px-3 py-2 transition-colors text-xl font-bold ';
    const linkClass = active ? generalClass + 'text-teal-700'
        : generalClass + 'hover:text-teal-700 text-teal-950';

    return (
        <Link
            href={href}
            prefetch={prefetch}
            aria-current={active ? 'page' : undefined}
            className={linkClass}
        >
            {children}
        </Link>
    );
}