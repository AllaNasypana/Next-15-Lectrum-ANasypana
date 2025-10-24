"use server";

import {revalidatePath} from "next/cache";
import { currentUser} from '@clerk/nextjs/server';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';


export const fetchPosts = async (limit: number) => {
    const user = await currentUser();
    if (!user) {
        redirect('/');
    }
    const supabase = await createClient();
    const {data, error, count} =  await supabase
        .from('posts')
        .select('*', { count: 'exact' })
        .order("created_at", { ascending: false })
        .limit(limit);

    if(error) throw error;

    return {data,  count};
}

export const fetchPostById = async (id: string) => {
    const user = await currentUser();
    if (!user) {
        redirect('/');
    }
    const supabase = await createClient();
    const {data, error} =  await supabase
        .from('posts')
        .select('*')
        .eq("id", id)
        .single();

    if(error) throw error;

    return data
}

export const deletePostById = async (id: string, isPosts: boolean = true) => {
    const user = await currentUser();
    if (!user) throw new Error('Not authorized user')
    const supabase = await createClient();

    const { error} =  await supabase
        .from('posts')
        .delete()
        .eq("id", id);
    if(error) throw error;
    revalidatePath('posts', "page");
    if(!isPosts) {
        redirect('/posts');
    }

}

export const revalidateSpecificPath = async (path: string) => revalidatePath(path, "page");

