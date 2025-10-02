import { POSTS_AMOUNT } from '@/config';
import { getPost } from '../actions';

type Props = {
    params: Promise<{ id: string }>
}

export async function generateStaticParams() {

    return Array.from({ length: POSTS_AMOUNT }).map((_, i) => ({id: (i + 1).toString() }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

    const { id } = await params;
    const post = await getPost(id);

    return {
        title: post.title,
        description: post.body.slice(0,160)
    }
}



export default async function PostPage({ params }: Props){
    const { id } = await params;
    const post = await getPost(id);
    return (
        <div className={'flex flex-col justify-center items-center'}>
            <h1 className='text-xl font-bold text-center py-6 text-teal-700'>{post.title}</h1>
            <div className={'text-lg text-typography-black'}>{post.body}</div>
        </div>
    )
}