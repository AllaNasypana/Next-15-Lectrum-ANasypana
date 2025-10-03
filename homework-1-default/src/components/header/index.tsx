import Link from 'next/link';
import { ActiveLink } from '../active-link';


export const Header = () => {
    return (
        <header className="flex items-center justify-between p-4 bg-neutral-200 shadow-md">
            <nav className="flex items-center justify-between  w-full">
                <Link href="/" className="font-bold text-3xl text-teal-700">SDOOG</Link>
                <div className="flex items-center gap-2">
                    <ActiveLink href="/">Home</ActiveLink>
                    <ActiveLink href="/posts">Posts</ActiveLink>
                    <ActiveLink href="/support">Support</ActiveLink>
                </div>
            </nav>
        </header>
    )
}


