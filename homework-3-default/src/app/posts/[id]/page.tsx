import {Suspense} from 'react';
import { currentUser, User } from '@clerk/nextjs/server';
import { fetchPostById, deletePostById } from '../actions';
import { notFound } from 'next/navigation';

import { PostForm, LinkButton, Loader } from '@/components';

interface IProps {
    params: Promise<{ id: string }>
}

export default async function PostPage({params}: IProps) {
    const { id } = await params;
    const user = await currentUser();
    const post = await fetchPostById(id);

    if (!post) {notFound()}

    return (
        <div className="w-full">
            <div className={'w-full flex justify-end py-6'}>
                <LinkButton href={'/posts'}>Go to list of posts</LinkButton>
            </div>
            <Suspense fallback={<Loader size={12} />}>
                <PostForm post={post} isOwner={user?.id === post.user_id} deleteAction={deletePostById} />
            </Suspense>

        </div>
    );
}