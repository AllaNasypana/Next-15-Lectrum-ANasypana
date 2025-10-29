import { PostForm, LinkButton} from '@/components'

export default async function PostPage() {

    return (
        <div className="w-full">
            <div className={'w-full flex justify-end py-6'}>
                <LinkButton href={'/posts'}>Go to list of posts</LinkButton>
            </div>
            <h1 className={'text-2xl text-gray-800 text-center font-bold m-6'}>Please fill fields to add your new post</h1>
            <PostForm post={null} isOwner={false} />
        </div>
    );
}