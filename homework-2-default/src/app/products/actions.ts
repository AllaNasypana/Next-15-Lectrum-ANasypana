"use server";

import { ProductsSchema } from '@/schems';
import { URL_BASE_FOR_PRODUCTS} from '@/config';
import { revalidateTag } from 'next/cache';

export const getAllCategories = async () => {
    const res = await fetch(`${URL_BASE_FOR_PRODUCTS}products`,  {
        next: {revalidate: 600}
    });
    if (!res.ok) throw new Error(res.statusText);
    const products = await res.json() as unknown as ProductsSchema[];
    return Array.from(new Set(products.map(p => p.category)));
};

export const getProductsByCategory = async (category: string) => {

    const res = await fetch(`${URL_BASE_FOR_PRODUCTS}products`,  {
        next: {revalidate: 60}
    });

    if (!res.ok) throw new Error(res.statusText);

    const products = await res.json() as unknown as ProductsSchema[];
    return products.filter(p => p.category === category);
};

export const getPopularProducts = async () => {
    const res = await fetch(`${URL_BASE_FOR_PRODUCTS}products?limit=3`,  {
        next: {revalidate: 360}
    });

    if (!res.ok) throw new Error(res.statusText);

    const products = await res.json() as unknown as ProductsSchema[];
    return products;
}

export const getProductsById = async (id: string) => {
    try {
        const res = await fetch(`${URL_BASE_FOR_PRODUCTS}products/${id}`, {
            next: {revalidate: 60}
        });

        if (!res.ok) throw new Error(res.statusText);

        const products = await res.json() as unknown as ProductsSchema;
        if(!products) throw new Error('Product not found');
        return products;
    }catch (error) {
        return null;
    }

};

export const revalidatedByTag = async (tag: string) => {

    await revalidateTag(tag);

}

