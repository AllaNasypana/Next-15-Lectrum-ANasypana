import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LinkButton } from '@/components'
import { getNews, getOneNews } from '../actions';

interface IProps {
    params: Promise<{ id: string }>
}

export const dynamicParams = false;

export async function generateStaticParams() {
    const news = await getNews();

    return news.map(n => ({
        id: n.id.toString(),
    }));

}


export const generateMetadata = async ({ params,}: IProps): Promise<Metadata> => {
    const { id } = await params;

    const news = await getOneNews(id);

    if (!news) {
        return {
            title: 'It is not found',
        };
    }

    return {
        title: news.title,
        description: news.body,
        openGraph: {
            type: 'article',
            title:news.title,
            description: news.body,
        },
        twitter: {
            card: 'summary_large_image',
            title: news.title,
            description: news.body,
        },
    };
};



export default async function NewsPage({params}: IProps) {
    const { id } = await params
    const news = await getOneNews(id);
    if (!news) {
        notFound();
    }

    return (
        <div className={'flex flex-col justify-center items-center'}>
            <h1 className='text-xl font-bold text-center py-6 text-blue-700'>{news.title}</h1>
            <div className={'text-lg text-typography-black mb-6'}>{news.body}</div>
            <LinkButton href={'/news'}>Go to List of Last News</LinkButton>
        </div>
    );
}