'use client'

import { FunctionComponent, useState} from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { ProductsSchema } from '@/schems';
import { toastOptions } from '@/config';


import Image from "next/image";


interface IProps {
    product: ProductsSchema;
    isLoggedIn: boolean;
}


export const ProductCard: FunctionComponent<IProps> = ({product, isLoggedIn}) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handlerAddProductToCard = async () => {
        setIsLoading(true)
        try {
            const res = await fetch('/api/cart', {method: "POST", body: JSON.stringify(product)});
            if(res.status !== 201) throw new Error('Product was not added');
            await res.json();
            toast.success(`${product.title} was added`, toastOptions)

        }catch (_){
            toast.error(`${product.title} was not added`, toastOptions)

        }finally {
            setIsLoading(false)
        }
    }


    return (
            <div
                onMouseEnter={() => router.prefetch(`/products/${product.category}/${product.id}`)}
                onClick={() => router.push(`/products/${product.category}/${product.id}`)}
                className="max-w-sm rounded overflow-hidden shadow-lg p-4 hover:cursor-pointer h-[600px]">
                <Image className={'object-contain rounded-md'}
                       width={0}
                       height={0}
                       sizes="100vw"
                       style={{width: '100%', height: '70%'}}
                       src={product.image} alt={product.title}/>
                <div className="px-6 py-4 h-[100px]">
                    <div className="font-bold text-xl line-clamp-3">{product.title}</div>
                </div>
                <div className="px-6 pt-4 pb-2 mt-auto">
                    <span className="text-lg font-semibold">${product.price.toFixed(2)}</span>
                    {isLoggedIn && (
                        <button
                            type={'button'}
                            onClick={ (event) => {
                                event.stopPropagation();
                                handlerAddProductToCard()

                            }}
                            disabled={isLoading}
                            className="bg-blue-500 hover:bg-blue-700 hover:cursor-pointer
                        text-white font-bold py-2 px-4 rounded ml-4 disabled:opacity-50 disabled:cursor-not-allowed">
                            Add to Cart
                        </button>
                    )}

                </div>
            </div>
    )
}