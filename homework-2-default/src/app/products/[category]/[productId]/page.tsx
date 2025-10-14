import { Suspense } from "react";
import { getProductsById } from '../../actions';
import {ProductItem, LinkButton,} from '@/components';
import { notFound } from 'next/navigation';

interface IProps  {
    params: Promise<{ category: string; productId: string}>;
};



export default async function ProductPage({ params }: IProps) {
    const {  productId, category } = await params;
    const product =  await getProductsById(productId);
    if (!product) {
        notFound()
    }
    return (
        <div>
            <div className={'py-6 flex gap-4'}>
                <LinkButton href={'/products'}>Go to list of categories</LinkButton>
                <LinkButton href={`/products/${category}`}>Go to  category {category.replaceAll('%20', ' ').replaceAll('%7D', '')}</LinkButton>
            </div>
            <Suspense fallback={<div className={'text-blue-500 text-lg text-center'}>Loading...</div>}>
                < ProductItem product={product} />
            </Suspense>



        </div>
    );
}