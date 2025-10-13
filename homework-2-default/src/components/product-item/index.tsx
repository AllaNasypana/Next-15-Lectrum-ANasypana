'use client'

import { FunctionComponent, useState} from 'react';
import { toast } from 'react-toastify';
import { ProductsSchema } from '@/schems';
import { toastOptions } from '@/config';
import Image from "next/image";


interface IProps {
    product: ProductsSchema;
}

export const ProductItem:FunctionComponent<IProps> = ({ product}) => {
    const [isLoading, setIsLoading] = useState(false);
    const handlerAddProductToCard = async () => {
        setIsLoading(true)
        try {
            const res = await fetch('/api/cart', {method: "POST", body: JSON.stringify(product)});
            if(res.status !== 201) throw new Error('Product was not added');
            await res.json();
            toast.success(`${product.title} was added`, toastOptions);

        }catch (_){
            toast.error(`${product.title} was not added`, toastOptions)

        }finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={'p-6 w-full rounded-md shadow-md flex-col justify-center max-w-[800px] mx-auto'}>
            <div className="size-50 shrink-0 overflow-hidden rounded-md md:size-80 lg:size-100 mb-6 mx-auto">
                <Image
                    width={0}
                    height={0}
                    sizes="100vw"
                    src={product.image}
                    alt={product.title}
                    className="size-full object-contain"/>
            </div>
            <div className="ml-8 flex flex-1 flex-col justify-center items-center">
                <h2 className={'text-gray-900 font-bold text-2xl mb-4 text-center'}>
                    {product.title}
                </h2>
                <div className={'text-gray-900 font-bold text-xl mb-8 text-center'}>${product.price.toFixed(2)}</div>
                <div className={'text-gray-900 text-md mb-4 text-center'}>{product.description}</div>
                <form action={handlerAddProductToCard}>
                    <button
                        type={'submit'}
                        disabled={isLoading}
                        className="bg-blue-500 hover:bg-blue-700 hover:cursor-pointer
                        text-white font-bold py-2 px-4 rounded mt-auto disabled:opacity-50 disabled:cursor-not-allowed">
                        Add to Cart
                    </button>
                </form>

            </div>
        </div>

    )
}