import type { Metadata } from "next";
import { PostCard, Pagination } from '@/components';
import { getPosts } from './actions';

export const metadata: Metadata = {
    title: 'List of popular questions',

};



export default async function PostsPage({ searchParams  }: { searchParams : Promise<{page: string}> }){
    const {page} = await searchParams ;
    const {posts, pagesCount} = await getPosts(page);

    return (
        <>
            <h1 className='text-xl font-bold text-center mb-4'>Posts</h1>
            <div className={'flex flex-col justify-center items-center gap-6 px-10 '}>
                {posts.map(p => <PostCard  key= {p.id} post={p} />)}
                {pagesCount > 1 && <Pagination currentPage={+page || 1} pagesCount={pagesCount} />}
            </div>

        </>
    )
}