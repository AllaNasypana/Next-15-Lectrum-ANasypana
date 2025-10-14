import { Suspense } from "react";
import { getAllCategories } from './actions';
import { CategoryCard } from '@/components';


const CategoriesWrapper = ({categories}: {categories: string[]}) => {
    return (
        <div>
            {categories.map((category) => <CategoryCard key={category} name={category} />)}
        </div>
    )
}

export default async function ProductPage() {
    const categories = await getAllCategories();

    return (
        <div className={'flex-col justify-center'}>
            <h1 className={'text-3xl font-bold text-center mb-6'}>Product Catalog</h1>
            <div className={'text-xl font-bold text-center mb-4'}>We provides products in categories:</div>
            <Suspense fallback={<div className={'text-blue-500 text-lg text-center'}>Loading...</div>}>
                <CategoriesWrapper categories={categories} />
            </Suspense>
        </div>

    );
}