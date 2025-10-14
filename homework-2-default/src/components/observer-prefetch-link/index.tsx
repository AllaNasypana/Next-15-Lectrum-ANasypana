"use client"
import { FunctionComponent, useEffect, useRef, ReactNode } from 'react';
import { useRouter } from "next/navigation"
import Link , { LinkProps } from 'next/link';


interface IProps extends LinkProps {
    children: ReactNode
}


export const ObservePrefetchLink:FunctionComponent<IProps> = ({children, href, ...res}) => {
    const ref = useRef<HTMLAnchorElement>(null)
    const router = useRouter()

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const io = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                router.prefetch(href as unknown as string)
                io.disconnect()
            }
        })
        io.observe(el)
        return () => io.disconnect()
    }, [href, router]);


    return (
        <Link className={'flex w-full'} ref={ref} href={href} {...res} prefetch={false}>
            {children}
        </Link>

    )
}

