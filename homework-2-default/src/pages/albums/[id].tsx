import { LinkButton} from '@/components'
import {  IAlbum, getAlbums, getAlbum} from './index'

export const getStaticPaths = async () => {
    const albums = await getAlbums();
    const paths = albums.map((al) => ({
        params: { id: al.id.toString() },
    }));


    return { paths, fallback: false };
};

export const getStaticProps = async ({params}: {params: {id: string}}) => {
    const { id } = params;
    const albumData = await getAlbum(id);

    if (!albumData) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            album: albumData,
        },
        revalidate: 60
    };
};

export default function AlbumPage({ album }: { album: IAlbum }) {
    return (
        <div className={'p-6 flex-col justify-center items-center'}>
            <div className={'flex gap-4 py-6'}>
                <LinkButton href={'/'}>Go to Home</LinkButton>
                <LinkButton href={'/albums'}>Go to List of Albums</LinkButton>
            </div>
            <h2 className={'text-2xl font-bold text-blue-700 mb-6'}>{album.title}</h2>

        </div>
    )
}