'use server';
import { redirect } from 'next/navigation';
import { POSTS_AMOUNT, POSTS_URL } from '@/config';
import { IPost } from '@/types';

export const getPosts = async (page: string): Promise<{pagesCount: number, posts: IPost[]}> => {
    if(!+page || +page < 1) redirect(`/posts?page=1`);

    const pageData = +page;
    const res = await fetch(`${POSTS_URL}?_page=${page}&_limit=${POSTS_AMOUNT}`);
    const amountPosts = +res.headers.get('x-total-count');

    if(!!amountPosts && pageData > amountPosts / POSTS_AMOUNT) redirect(`/posts?page=1`);

    if(!res.ok)  throw new Error(res.statusText);

    const posts = await res.json();
    return { pagesCount: Math.ceil(amountPosts / POSTS_AMOUNT), posts }
}

export const getPost = async (id: string): Promise<IPost> => {
    const res = await fetch(`${POSTS_URL}/${id}`);
    if (!res.ok) throw new Error(res.statusText);
    return await res.json();
}