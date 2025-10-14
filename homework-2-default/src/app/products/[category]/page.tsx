import { Suspense } from "react";
import { notFound } from 'next/navigation';
import {ProductWrapper, LinkButton} from "@/components";
import { getProductsByCategory} from '../actions';
import { getUser, revalidatedByTag } from '@/app/(auth)/actions'


interface IProps  {
    params: Promise<{ category: string}>;
};



export default async function CategoryPage({ params }: IProps) {
    const { category } = await params;
    const user = await getUser();

    const products = await getProductsByCategory(category.replaceAll('%20', ' ').replaceAll('%7D', ''));

    if(!products.length) {
        notFound();
    }

    return (
        <div
            className="flex flex-col justify-center">
            <h1 className={'text-2xl font-bold text-blue-700 text-center'}>Category: {category.replaceAll('%20', ' ').replaceAll('%7D', '')}</h1>
            <div className={'py-6'}>
                <LinkButton href={'/products'}>Go to list of categories</LinkButton>
            </div>
            <Suspense fallback={null}>
                <ProductWrapper isLoggedIn={!user} products={products} category={category} revalidatedByTag={revalidatedByTag} />
            </Suspense>

        </div>
    );
}