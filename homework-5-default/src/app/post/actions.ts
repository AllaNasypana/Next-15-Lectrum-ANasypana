import { URL_BASE } from '../../config';
import { IPost, IUser } from '../../types'


export const getPosts = async () => {
    const res = await fetch(`${URL_BASE}posts`, {
        next: {
            revalidate: 600
        }
    });
    if (!res.ok) throw new Error(res.statusText);
    const posts = await res.json() as unknown as IPost[];
    return posts;

}

export const getPostById = async (id: string) => {
    const res = await fetch(`${URL_BASE}posts/${id}`, {

        next: {
            revalidate: 600
        }
    });
    if (!res.ok) throw new Error(res.statusText);
    const post = await res.json() as unknown as IPost;
    return post;

}

export const getUserById = async (id: number) => {
    const res = await fetch(`${URL_BASE}users/${id}`, {
        next: {
            revalidate: 600
        }
    });
    if (!res.ok) throw new Error(res.statusText);
    const user = await res.json() as unknown as IUser;
    return user;

}

