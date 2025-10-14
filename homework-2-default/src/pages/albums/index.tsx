import Link from 'next/link';
import type { GetServerSideProps } from 'next';
import { LinkButton} from '@/components';

export interface IAlbum {
    userId: number;
    id: number;
    title: string;
}

const URL = 'https://jsonplaceholder.typicode.com/albums';

export const getAlbums = async () => {
    const dataRes = await fetch(`${URL}?_limit=10`);
    if(!dataRes.ok) throw new Error(`${dataRes.statusText}`);
    const albums = await dataRes.json() as unknown as IAlbum[];
    return albums;
}

export const getAlbum = async (id: string) => {
    const dataRes = await fetch(`${URL}/${id}`);
    if(!dataRes.ok) throw new Error(`${dataRes.statusText}`);
    const album = await dataRes.json() as unknown as IAlbum;
    return album;
}



export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const albums = await getAlbums();
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30');
    return { props: { ts: Date.now(), albums } };
};

export default function AlbumsPage({ ts, albums }: { ts: number, albums: IAlbum[] }) {

    return (
        <div className={'p-6 flex-col justify-center items-center'}>
            <div><LinkButton href={'/'}>Go to Home</LinkButton></div>
            <h2 className={'text-2xl font-bold text-blue-700 mb-6'}>Pages Router: </h2>
            <p className={'text-lg font-bold mb-6'}>Server time: {new Date(ts).toString()}</p>
            <h2 className={'text-2xl font-bold text-blue-700 mb-6'}>List of  dynamic pages</h2>
            <div className={'flex flex-col'}>
                {albums.map(al =>
                    <Link
                        className={'text-lg font-bold mb-4 text-typography-black hover:text-blue-700'}
                        key={al.id.toString()}
                        href={`/albums/${al.id}`}>
                        {al.title}
                    </Link>)}
           </div>

        </div>
    )

}