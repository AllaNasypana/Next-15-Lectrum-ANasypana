import { Suspense } from 'react';
import dynamic from "next/dynamic";
import { notFound } from 'next/navigation';
import { getPostById} from '../actions';
import { LinkButton, LazyButton} from '../../../components';
import UserCard from './user-card';

const DynamicComments = dynamic(() => import('./comments'))

interface IProps {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: IProps ) {
    const { id } = await params;
    const post = await getPostById(id);

    if (!post) {
        return {
            title: "Post not found",
            description: "This post does not exist.",
        };
    }

    return {
        title: post.title,
        description: post.body,
        openGraph: {
            title: post.title,
            description: post.body

        },
        alternates: {
            canonical: `/post/${post.id}`,
        },
    };
}

export default async function PostPage({params}: IProps) {
    const { id } = await params;
    const post = await getPostById(id);

    if (!post) {
        notFound();
    }

    return (
        <div className={'flex flex-col justify-center items-center w-full'}>
            <div className={'flex justify-end w-full '}><LinkButton href={'/post'}>Go to Posts</LinkButton></div>
            <h1 className='text-xl font-bold text-center py-6 text-blue-700 text-center'>{post.title}</h1>
            <div className={'text-lg text-typography-black mb-6 text-center'}>{post.body}</div>
            <Suspense fallback={<div className="text-blue-700 text-lg">Loading... </div>}>
                <UserCard userId={post.userId} />
                <LazyButton text={'Show All Comments'} activeText={'Hide All Comments'} >
                    <Suspense fallback={<div className="text-blue-700 text-lg">Loading... </div>}>
                        <DynamicComments postId={post.id} />
                    </Suspense>
                </LazyButton>

            </Suspense>

        </div>
    );
}