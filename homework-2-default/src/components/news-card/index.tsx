'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {INews } from '@/types';


export const NewsCard = ({ news }: { news: INews }) => {
    const router = useRouter();

    return (
        <Link
            className="flex  w-full mb-6"
            href={`/news/${news.id}`}
            prefetch={false}
            onMouseEnter={()=> router.prefetch(`/news/${news.id}`)}>
            <div className={'border-2 border-blue-100 rounded-xl p-6 bg-blue-50 mt-4 w-full hover:border-blue-300 hover:translate-y-1'}>
                <p className={'font-bold text-lg mb-2 text-center'}>{news.title}</p>
                <p className={'text-base text-center'}>{news.body}</p>
            </div>
        </Link>
    )
}
