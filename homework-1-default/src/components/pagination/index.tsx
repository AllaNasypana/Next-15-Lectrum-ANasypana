'use client'
import {  useRouter,  } from 'next/navigation';
import { getPaginationPages } from './utils'

type Props = {
    currentPage: number,
    pagesCount: number,
    siblingCount?: number,
}


export const Pagination = ({ currentPage, pagesCount, siblingCount = 1}: Props) => {
    const pages = getPaginationPages(currentPage, pagesCount, siblingCount);

    const router = useRouter()

    const onChange = (page: number) => router.push('/posts?page=' + page)

    return (
        <div className={'flex justify-center items-center gap-2'}>
            {pages.map((item, idx) =>
                item === '...' ? (
                    <span className={'p-1'} key={`ellipsis-${idx}`}>...</span>
                ) : (
                    <button
                        key={item}
                        className={item === currentPage ? 'text-teal-700 font-bold text-lg ' : 'text-teal-950 text-lg  hover:text-teal-700 hover:cursor-pointer'}
                        onClick={() =>  item !== currentPage && onChange(Number(item))}
                        disabled={item === currentPage}
                        type="button"
                    >
                        {item}
                    </button>
                ),
            )}
        </div>

    )
}