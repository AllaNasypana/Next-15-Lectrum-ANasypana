"use client"
import {FunctionComponent, ReactNode} from 'react';
import { useRouter } from "next/navigation"
import Link , { LinkProps } from 'next/link';

interface IProps extends LinkProps {
    children: ReactNode,
    className?: string,
}

export const IntentionPrefetchLink: FunctionComponent<IProps> = ({children, className, href, ...res}) => {
    const router = useRouter();

    return (
        <Link
            href={href}
            {...res}
            className={className}
            prefetch={false}
            onMouseEnter={() => router.prefetch(href as unknown as string)}
        >
            {children}
        </Link>
    )
}