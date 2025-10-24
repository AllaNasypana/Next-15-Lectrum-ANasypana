import { SignOutButton } from '@clerk/nextjs';
import Link from 'next/link';


interface IProps {
    isLoggedIn?: boolean;
}

export const LoginButton = ({ isLoggedIn}: IProps) => {


    return (
        <>
            {isLoggedIn ? (
                <SignOutButton>
                    <div className={'flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-4 hover:cursor-pointer'}>Logout</div>
                </SignOutButton>

            ) : (
                <Link className={'flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-4 hover:cursor-pointer'} href={'/sign-in'}>Login</Link>
            )}
        </>

    )
}