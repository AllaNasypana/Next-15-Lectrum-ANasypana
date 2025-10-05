import {INews } from '@/types';


export const NewsCard = ({ news }: { news: INews }) => {
    return (
        <div className={'rounded-md p-3 shadow-lg flex flex-col w-full justify-center items-center text-typography-black'}>
            <p className={'font-bold text-lg mb-2 text-center'}>{news.title}</p>
            <p className={'text-base text-center'}>{news.body}</p>
        </div>

    )
}
