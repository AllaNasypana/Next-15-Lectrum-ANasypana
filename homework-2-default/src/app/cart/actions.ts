"use server";
import { revalidatePath } from 'next/cache';


export const revalidateRootPage = async () => {
    revalidatePath('/', 'page');
};

export const revalidateCartPage = async () => {
    revalidatePath('/cart', 'page');
};
