import type { GetServerSidePropsContext } from 'next';
import { INews} from '@/types';
import {URL_BASE, NEWS_AMOUNT } from '@/config';
import { NewsCard, Pagination } from '@/components'


type Props = { news: INews[], pageAmount: number, page: number };

export default function Page({ news, page, pageAmount }: Props) {
    return (
        <div className="">
            <h1 className="text-2xl font-bold text-center mb-4 text-blue-700">News</h1>
            <div>
                {news.map(n => <NewsCard key={n.id.toString()} news={n} />)}
                {pageAmount > 1 && (
                    <div className={'w-full p-4'}>
                        <Pagination currentPage={page} pagesCount={pageAmount} path={'news/?page='} />
                    </div>) }
            </div>


        </div>
    );
}

export async function getServerSideProps(con: GetServerSidePropsContext) {
    const query = con?.query;
    let page = !!query.page && (+query?.page > 0) ? +query?.page : 1;

    let res = await fetch(`${URL_BASE}posts?_page=${page}&_limit=${NEWS_AMOUNT}`, {});
    const amountNews = (res?.headers?.get('x-total-count') || 0) as unknown as number;
    const pageAmount = Math.ceil(amountNews / NEWS_AMOUNT);
    if(pageAmount < page) {
        page = 1
        res = await fetch(`${URL_BASE}posts?_page=${page}&_limit=${NEWS_AMOUNT}`, {});
    }

    const news = await res.json();

    return {
        props: {
            news,
            page,
            pageAmount,

        }
    };
}
