import { NewsCard } from '@/components'
import { getNews } from './actions';

export default async function NewsPage() {
    const listNews = await getNews();
    return (
        <>
            <h2 className={'font-bold text-3xl pt-6 text-center text-blue-700'}>List of last news</h2>
            <div className={'flex-col py-6'}>
                {listNews.map((item) => <NewsCard key={item.id.toString()} news={item} />)}
            </div>
        </>
    );
}