'use client';

import {  useRouter,   } from 'next/navigation';
import { LIMIT_FOR_POSTS } from '@/config';


interface IProps {
    currentLimit: number;
    total: number;
}

export const LoaderButton = ({ currentLimit, total,  }: IProps) => {
    const router = useRouter();
    const interest = Math.round((currentLimit / total) * 100)

    return (
        <>
            {(currentLimit < total) && (
                <button
                    className={`flex justify-center bg-gradient-to-r w-full  from-blue-700 from-${interest}% to-blue-200 to-${100 - interest}%  
            text-white font-bold py-3 px-4 rounded mt-4 hover:cursor-pointer hover:shadow-md disabled:cursor-not-allowed disabled:shadow-none`}
                    onClick={() => {
                        if(currentLimit < total) {
                            router.push(`/posts?limit=${currentLimit + LIMIT_FOR_POSTS}`);
                        }
                    }}
                    disabled={currentLimit >= total}>
                    {currentLimit < total ? `Load More (${currentLimit}/${total})` : "It`s all"}
                </button>
            )}
        </>

    )
}