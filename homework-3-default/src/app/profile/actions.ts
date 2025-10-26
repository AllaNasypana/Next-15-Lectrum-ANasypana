"use server";

import { createClient } from '@/utils/supabase/server';
import { currentUser} from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';


export const getUser = async () => {
    const user = await currentUser();
    if(!user){
        redirect('/')
    }
    const supabase = await createClient();

    const { data } =  await supabase.from('users').select('*')
        .eq("user_id", user.id);

    if(!!data && !!data.length) {
        return data[0]
    }
    const res = await supabase.from('users').insert({
        email: user.emailAddresses[0].emailAddress,
        name: user.username || user.fullName || ''
    }).select().single();

    if(res.error) throw res.error;

    return res.data
}
