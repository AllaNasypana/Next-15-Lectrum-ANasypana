import {ProductCard, LinkButton} from "@/components";
import { getProductsByCategory} from '../actions';
import { getUser } from '@/app/(auth)/actions'


interface IProps  {
    params: Promise<{ category: string}>;
};


export default async function CategoryPage({ params }: IProps) {
    const { category } = await params;
    const user = await getUser();

    const products = await getProductsByCategory(category.replaceAll('%20', ' ').replaceAll('%7D', ''));
    return (
        <div
            className="flex flex-col justify-center">
            <h1 className={'text-2xl font-bold text-blue-700 text-center'}>Category: {category.replaceAll('%20', ' ').replaceAll('%7D', '')}</h1>
            <div className={'py-6'}>
                <LinkButton href={'/products'}>Go to list of categories</LinkButton>
            </div>
            <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center '}>
                {products.map((product) => <ProductCard
                    isLoggedIn={!!user}
                    key={product.id.toString()}
                    product={product}  />)}
            </div>
        </div>
    );
}