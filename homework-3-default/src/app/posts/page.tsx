import { Suspense } from "react";
import Link from 'next/link';
import { FaPlus } from "react-icons/fa6";
import { currentUser} from '@clerk/nextjs/server';
import { deletePostById, fetchPosts } from './actions';
import { PostsWrapper, Loader, RefreshButton} from '@/components';
import { LIMIT_FOR_POSTS } from '@/config'

export const revalidate = 600;

export default async function PostsPage({ searchParams  }: { searchParams : Promise<{limit: string}> }) {

    const { limit } = await searchParams ;
    const dataLimit = +limit > 0 ? +limit : LIMIT_FOR_POSTS;
    const { data, count } = await fetchPosts(dataLimit);
    const user = await currentUser();
    return (
        <div className="w-full flex flex-col justify-center">
            <h1 className={'text-2xl text-gray-800 text-center font-bold m-6' }>List of Posts</h1>
            <div className={'flex justify-between py-4 items-center'}>
                <RefreshButton path={'/posts'}/>
                <Link
                    className={'flex items-center text-blue-500 gap-1 hover:font-bold p-2'}
                    href="/posts/add-new-post">
                    <FaPlus size={20} /> Add New Post
                </Link>
            </div>

            <Suspense fallback={<Loader size={10} />}>
                <PostsWrapper
                    deleteAction={deletePostById}
                    posts={data}
                    userId={user?.id || ''} total={count || 0} currentLimit={dataLimit} />
            </Suspense>

        </div>
    );
}