import {getPosts} from "./actions";
import { PostList } from '../../components'
import type {Metadata} from "next";


export const metadata: Metadata = {
    title: 'List of posts',
    description: "List of posts",
};


export const revalidate = 600;

export default async function PostsPage() {

    const posts = await getPosts();


    return (
        <div className={'flex flex-col justify-center items-center w-full'}>
            <h1 className={'text-blue-700 text-2xl font-bold mb-6 text-center'}>Total amount of posts: {posts.length}</h1>
            <PostList posts={posts} />
        </div>
    );
}