"use server";
import { revalidatePath } from 'next/cache';
import { revalidateTag } from 'next/cache';
import { CartType } from '@/app/api/cart/route';
import { ProductsSchema } from "@/schems";
import { headers } from 'next/headers';


export const getCarts = async () => {
    const headersList = await headers();
    const proto = headersList.get("x-forwarded-proto") || 'http';
    const host = headersList.get('host');
    const res = await fetch(    `${proto}://${host}/api/cart`, {
        next: {tags: ['carts'], revalidate: 60}
    });

    if(res.status !== 200) throw new Error('Something went wrong');
    const data = await res.json() as unknown as {carts: CartType[]; sum: number };
    return data;

}

export const revalidatedByTag = async (tag: string) => {

    await revalidateTag(tag);

}

export const revalidateRootPage = async () => {
    revalidatePath('/', 'page');
};
