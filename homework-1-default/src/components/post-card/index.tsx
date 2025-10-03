import Link from 'next/link';
import { IPost } from '@/types';
import { POSTS_AMOUNT } from '@/config'

export const PostCard = ({ post }: { post: IPost }) => {
    return (
        <Link href={`/posts/${post.id}`} prefetch={+post.id > POSTS_AMOUNT} className={'flex w-full'}>
            <div className={'rounded-md p-3 shadow-lg flex flex-col w-full justify-center items-center text-typography-black'}>
                <p className={'font-bold text-lg mb-2 text-center'}>{post.title}</p>
                <p className={'text-base text-center'}>{post.body}</p>
            </div>
        </Link>
    )
}
