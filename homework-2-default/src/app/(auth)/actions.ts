"use server";

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { LoginSchema, loginSchema,  } from '@/schems';
import {z} from 'zod';
import {ActionResultLogin, } from '@/types';


export const setCookie = async (data: LoginSchema): Promise<ActionResultLogin> => {
    try {
        const cookiesStore = await cookies();

        const validated = loginSchema.safeParse(data);

        if (!validated.success) {

            return { status: 'error', error: z.flattenError(validated.error).fieldErrors}
        }


        cookiesStore.set('user', JSON.stringify(validated.data));


        return { status: 'success' }


    }catch (error) {
        const err = error as unknown as Error;
        const errMessage = (err?.message || 'Something went wrong') as unknown as string;
        return { status: 'error', error: errMessage };

    }

}


export const getUser = async (): Promise<LoginSchema | null> => {
    const cookieStore = await cookies();
    const userCookie = cookieStore?.get('user');
    if (!userCookie || !userCookie.value) return null;
    const user = JSON.parse(userCookie.value) as unknown as LoginSchema;
    return user;
}