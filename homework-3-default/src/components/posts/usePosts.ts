import {useRouter} from "next/navigation";
import {z} from 'zod';
import { useAuth } from '@clerk/nextjs';
import { createClient } from '@/utils/supabase/client';
import { useMutation } from '@tanstack/react-query';
import { revalidateSpecificPath } from '@/app/posts/actions';
import {toast} from 'react-toastify';
import {toastOptions} from '@/config';
import { postSchema, PostSchema } from '@/schems';
import { Tables } from '@/types/database.types'


export const usePosts = () => {
    const { getToken } = useAuth();
    const router = useRouter();

    const onAddPost = async (post: PostSchema): Promise<Tables<'posts'>> => {
        const token = await getToken({
            template: "supabase",
        });
        if (!token) throw new Error("No authorized user");
        const validated = postSchema.safeParse(post);
        if(!validated.success) throw new Error(Object
            .values(z.flattenError(validated.error).fieldErrors)
            .flat().join('; '));
        const supabase = createClient(token );

        const {  error, data } = await supabase
            .from("posts")
            .insert(post)
            .select()
            .single();
        if (error) throw error;

        return data

    };

    const onUpdatePost = async (id: string, post: PostSchema): Promise<Tables<'posts'>> => {
        const token = await getToken({
            template: "supabase",
        });

        if (!token) throw new Error("No authorized user");
        const validated = postSchema.safeParse(post);
        if(!validated.success) throw new Error(Object
            .values(z.flattenError(validated.error).fieldErrors)
            .flat().join('; '));
        const supabase = createClient(token );

        const {  error, data } = await supabase
            .from("posts")
            .update(post)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;


        return data
    };

    const mutation = useMutation({
        mutationFn: async (data: {post: PostSchema, id?: string}) => {
            if(!data.id) {
                return onAddPost(data.post)
            }
            return onUpdatePost(data.id, data.post);
        },
        onError: (err) => {
            const message = err?.message || 'Something went wrong' as unknown as string;
            toast.error(message, toastOptions);
        },
        onSuccess: async () => {
            await revalidateSpecificPath('/posts');
            router.push('/posts');
        }
    })

    return {
        onAddPost,
        onUpdatePost,
        mutation,
    }
}
