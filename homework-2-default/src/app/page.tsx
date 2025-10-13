import { getUser } from '@/app/(auth)/actions';
import { getPopularProducts } from '@/app/products/actions';
import { ProductCard} from "@/components"

export default async function HomePage() {
    const user = await getUser();
    const products = await getPopularProducts();

    return (
        <div className="flex-col justify-center">
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
