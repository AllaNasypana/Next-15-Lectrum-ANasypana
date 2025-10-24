"use client";

import {FC} from 'react'
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import {EAuthProvider} from '@/types';

interface IProps {
    provider: EAuthProvider;
    onClick: () => Promise<void>;
    isLoaded: boolean;

}

export const AuthButton: FC<IProps> = ({provider, onClick, isLoaded}) => {
    const baseStyles = 'font-bold py-2 px-4 rounded mt-4 w-full flex items-center justify-center gap-4 border text-gray-500 border-gray-500 '
    const styles = isLoaded ? baseStyles  + '': baseStyles + 'hover:shadow-md hover:cursor-pointer';
    let content = (
        <>
            <FcGoogle size={'24'} /> Google
        </>
    )
    if(provider === EAuthProvider.github) {
        content = (
            <>
                <FaGithub  size={'24'} /> GitHub
            </>
        )
    }

    return (
        <button className={styles} type={'button'} onClick={onClick} disabled={isLoaded}>
            {content}
        </button>
    )

}