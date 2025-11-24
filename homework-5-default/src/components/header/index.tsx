import { ActiveLink } from '../active-link';
import Image from 'next/image'

const headersRoutes = [
    {
        href: '/',
        label: 'Home',
    },
    {
        href: '/post',
        label: 'Posts',
    },

]


export const Header = () => {


    return (
        <header className="flex items-center justify-between p-6 bg-neutral-100 shadow-md">
            <nav className="flex items-center justify-between  w-full">
                <div className="flex items-center gap-2">
                    {headersRoutes.map((l) => ( <ActiveLink key={`hl-${l.href}`} href={l.href}>{l.label}</ActiveLink>))}
                </div>
                <div>
                    <Image src={'/images/sailing.jpg'} alt={'sailing'} width={60} height={60}  />
                </div>

            </nav>
        </header>
    )
}
