import Link from 'next/link';
import { ReactNode } from 'react'


interface IProps {
    children: ReactNode;
    href: string;
}


export const LinkButton = ({ href, children }: IProps) => {
    return (
        <Link
            href={href}
            className="inline-block mb-6 px-4 py-2 bg-white
            rounded-lg shadow hover:shadow-md transition-shadow
            hover:translate-y-1
            hover:text-blue-700 hover:border-blue-700 text-blue-500 border-2 border-blue-500"
        >
            {children}
        </Link>
    )
}