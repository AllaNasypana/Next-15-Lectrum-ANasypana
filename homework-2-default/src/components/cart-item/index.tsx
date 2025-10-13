'use client'

import { FunctionComponent, useState} from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { CartType } from '@/app/api/cart/route';
import { toastOptions } from '@/config';


import Image from "next/image";


interface IProps {
    product: CartType;
    onChangeKey: () => void
}

export const CartItem:FunctionComponent<IProps> = ({ product, onChangeKey }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handlerRemoveProduct = async () => {
        setIsLoading(true)
        try {
            const res = await fetch(`/api/cart/${product.id}`, {method: "DELETE"});

            if(!res.ok) throw new Error('Product was not deleted');
            await res.json();
            toast.success(`${product.title} was removed`, toastOptions);
            onChangeKey();

        }catch (_){
            toast.error(`${product.title} was not removed`, toastOptions)

        }finally {
            setIsLoading(false)
        }
    }


    return (
        <div className={'flex p-6 w-full rounded-md shadow-md'}>
            <div className=" size-24 shrink-0 overflow-hidden rounded-md  ">
                <Image
                    width={0}
                    height={0}
                    sizes="100vw"
                    src={product.image}
                    alt={product.title}
                    className="size-full object-contain"/>
            </div>

            <div className="ml-4 flex flex-1 flex-col">
                <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>
                        <Link href={`/products/${product.category}/${product.id}`}>{product.title}</Link>
                    </p>
                    <p className="ml-4">${(product.price * product.quantity).toFixed(2)}</p>
                </div>

                <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">Qty {product.quantity}</p>

                    <div className="flex">
                        <form action={handlerRemoveProduct}>
                            <button
                                disabled={isLoading}
                                type="submit"
                                className="font-medium
                                text-blue-500 hover:text-blue-700
                                hover:font-bold hover:cursor-pointer disabled:text-gray-500 disabled:cursor-not-allowed">Remove</button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}
