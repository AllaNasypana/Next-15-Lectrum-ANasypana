import { URL_BASE_FOR_NEWS, NEWS_AMOUNT } from '@/config';
import { INews } from '@/types';


export const getNews = async () => {
    const res = await fetch(`${URL_BASE_FOR_NEWS}posts?_limit=${NEWS_AMOUNT}`, {cache: 'force-cache',});
    if (!res.ok) throw new Error(res.statusText);
    const news = await res.json() as unknown as INews[];
    return news;

}

export const getOneNews = async (id: string) => {
    const res = await fetch(`${URL_BASE_FOR_NEWS}posts/${id}`,  {cache: 'force-cache',});
    if (!res.ok) throw new Error(res.statusText);
    const news = await res.json() as unknown as INews;
    return news;

}