"use client"
import { useState } from 'react';
import Link from 'next/link';
import { RiDeleteBin6Line } from "react-icons/ri";
import { Tables } from '@/types/database.types';
import { Loader } from '../loader';
import {useRouter} from "next/navigation";


interface IProps {
    isOwner: boolean;
    deleteAction: (id: string, isPosts: boolean) => Promise<void>;
    post: Tables<'posts'>
};

export const PostItem = ({post, isOwner, deleteAction}: IProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    return (
        <Link
            onMouseEnter={() => router.prefetch(isLoading ? '/posts' : `/posts/${post.id}`)}
            className={'flex  w-full mb-3'} href={`/posts/${post.id}`}>
            <div className={'flex w-full justify-between items-center gap-2 border-2 border-blue-100 rounded-xl p-6 bg-blue-50 mt-4 min-h-[110px] hover:border-blue-300 hover:translate-y-1'}>
                <p className={'font-bold text-lg mr-4'}>{post.title}</p>
                {isOwner && (
                    <button
                        className={'hover:cursor-pointer flex p-4 rounded-full hover:shadow-lg' }
                        onClick={async (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsLoading(true);
                            await deleteAction(post.id, true).then(() => setIsLoading(false));
                        }}>
                        {isLoading ? <Loader size={6} /> : <RiDeleteBin6Line size={24} color={'oklch(62.3% 0.214 259.815)'}/>}
                    </button>)}


            </div>
        </Link>

    )
}

