'use client'
import {  useRouter,  } from 'next/navigation';
import { getPaginationPages } from './utils'

type Props = {
    currentPage: number,
    pagesCount: number,
    siblingCount?: number,
    path: string
}


export const Pagination = ({ currentPage, pagesCount, path, siblingCount = 1}: Props) => {
    const pages = getPaginationPages(currentPage, pagesCount, siblingCount);

    const router = useRouter()

    const onChange = (page: number) => router.push(path + page)

    return (
        <div className={'flex justify-center items-center gap-2'}>
            {pages.map((item, idx) =>
                item === '...' ? (
                    <span className={'p-1'} key={`ellipsis-${idx}`}>...</span>
                ) : (
                    <button
                        key={item}
                        className={item === currentPage ? 'text-blue-700 font-bold text-lg ' : 'text-blue-500 text-lg  hover:text-blue-700 hover:cursor-pointer'}
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