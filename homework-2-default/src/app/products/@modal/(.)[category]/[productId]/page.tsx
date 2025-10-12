'use client'

import {useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { getProductsById, revalidatedByTag } from '../../../actions';;
import { ProductsSchema } from '@/schems';
import {ProductItem } from "@/components";



export default function PostInModal({ params }: { params: Promise<{ category: string; productId: string }> }) {
    const { category, productId } = use(params);
    const router = useRouter();
    const [product, setProduct] = useState<null | ProductsSchema>(null);
    const [error, setError] = useState('');
    useEffect(() => {
        if(productId) {
            getProductsById(productId)
                .then(d => setProduct(d))
                .catch(err => setError('Something went wrong'));
        }

    }, [productId, router, category]);





    return (
        <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center"
        >
            <div className="absolute inset-0 bg-black/60" onClick={() => router.back()}/>
            <div className="relative card max-w-sm md:max-w-2xl lg:max-w-4xl  w-full bg-white rounded-2xl shadow-2xl p-8 max-h-full min-h-[600px] overflow-auto">

                <button
                    onClick={() => router.back()}
                    type={'button'} className={'inline-block mb-6 px-4 py-2 ' +
                    'bg-white rounded-lg shadow hover:shadow-md ' +
                    'transition-shadow hover:translate-y-1 hover:text-blue-700 ' +
                    'hover:border-blue-700 text-blue-500 border-2 border-blue-500'}>Go Back</button>
                {!!product && <ProductItem product={product} revalidatedByTag={revalidatedByTag} />}
                {!!error && <div className={'text-center text-red-500 text-lg font-bold'}>{error}</div>}


            </div>
        </div>
    );
}