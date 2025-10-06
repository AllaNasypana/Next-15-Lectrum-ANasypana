"use server";

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { LoginSchema, loginSchema } from '@/schems';
import {z} from 'zod';
import { URL_BASE } from '@/config';
import {ActionResultLogin, IUser} from '@/types';


export const setCookie = async (data: LoginSchema): Promise<ActionResultLogin> => {
    try {
        const cookiesStore = await cookies();

        const validated = loginSchema.safeParse(data);

        if (!validated.success) {

            return { status: 'error', error: z.flattenError(validated.error).fieldErrors}
        }

        const res = await fetch(`${URL_BASE}/users/1`);
        if (!res.ok) throw new Error(res.statusText);
        const user = await res.json();
        if (!user) throw new Error('Something went wrong');
        cookiesStore.set('user', JSON.stringify(user));


        return { status: 'success' }


    }catch (error) {
        const err = error as unknown as Error;
        const errMessage = (err?.message || 'Something went wrong') as unknown as string;
        return { status: 'error', error: errMessage };

    }

}

export const loginAction = async () => {
    const cookiesStore = await cookies();
    const user = cookiesStore.get('user');
    if (!user || !user.value) {
       return  redirect('/login');
    }
    cookiesStore.delete('user');
    redirect(`/ news`);

}

export const logoutAction = async () => {
    const cookiesStore = await cookies();
    const user = cookiesStore.get('user');
    if (user) {
        cookiesStore.delete('user');
    }
    redirect(`/news`);
}

export const getUser = async (): Promise<IUser> => {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get('user');
    if (!userCookie || !userCookie.value) throw new Error('Could not find user');
    const user = JSON.parse(userCookie.value) as unknown as IUser;
    return user;
}