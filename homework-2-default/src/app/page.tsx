import { getUser } from '@/app/(auth)/actions';
import { getPopularProducts } from '@/app/products/actions';
import { ProductCard} from "@/components";
import Link from 'next/link';

export default async function HomePage() {
    const user = await getUser();
    const products = await getPopularProducts();

    return (
        <div className="flex-col justify-center">
            <div className={'bg-blue-50 border-l-4 border-blue-500 p-6 mb-12 rounded-r-lg'}>
                <div className={'font-bold text-typography-black text-lg mb-6'}>
                    Example Pages Router:
                    <Link className={'text-blue-500 hover:text-blue-700 ml-2'} href={'/albums'}>GSSP + Cache-Control</Link>
                </div>
                <div className={'font-bold text-typography-black text-lg mb-6'}>
                    Example Pages Router: SSG + 404:
                    <Link className={'text-blue-500 hover:text-blue-700 mx-2'} href={'/albums/1'}>Existed Page</Link>
                    <Link className={'text-blue-500 hover:text-blue-700'} href={'/albums/16'}>Not Existed Page</Link>
                </div>
                <div className={'font-bold text-typography-black text-lg mb-6'}>
                    Example of implementing revalidateTag:
                    <Link className={'text-blue-500 hover:text-blue-700 ml-2'} href={'/products/jewelery'}>products/[category]</Link>
                </div>
            </div>
            <h2 className={'text-3xl font-bold text-center mb-6'}>Our leaders</h2>
            <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center '}>
                {products.map((product) =>
                    <ProductCard
                        product={product}
                        isLoggedIn={!!user}
                        key={product.id.toString()} />)}

            </div>
        </div>
    );

}
