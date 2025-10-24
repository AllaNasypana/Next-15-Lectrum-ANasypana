import { createClient } from '@/utils/supabase/server';


export const getUsers = async () => {
    const supabase = await createClient();
    const {data, error } =  await supabase.from('users').select('*');

    return {data, error};
}

export const createPost = async () => {
    const supabase = await createClient();
    const {data, error} =  await supabase.from('posts').insert({
        title: `Second post -${new Date().toISOString()}`,
    });
    console.log(data, error)
}

export const getPosts = async () => {
    const supabase = await createClient();
    const {data, error } =  await supabase.from('posts').select('*');

    return {data, error};
}