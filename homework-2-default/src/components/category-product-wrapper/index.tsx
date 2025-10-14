'use client'
import {ProductsSchema} from "@/schems";
import {ProductCard} from "@/components";


interface IProps {
    products: ProductsSchema[];
    isLoggedIn: boolean;
    category: string;
    revalidatedByTag: (tag: string) => Promise<void>;
}

export const ProductWrapper = ({products, isLoggedIn, revalidatedByTag, category}: IProps) => {
    return (
        <div>
            <form className={'flex justify-end py-10 items-center'} action={() => revalidatedByTag(`products-${category}`)}>
                <button className={'inline-block mb-6 px-4 py-2 ' +
                    'bg-white rounded-lg shadow hover:shadow-md transition-shadow hover:translate-y-1 ' +
                    'hover:text-gray-800  text-gray-500 border-1 ' +
                    'border-gray-500'}>
                    Refresh list of product
                </button>
            </form>
            <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center '}>
                {products.map((product) => <ProductCard
                    isLoggedIn={isLoggedIn}
                    key={product.id.toString()}
                    product={product}  />)}
            </div>
        </div>

    )
}