import { createServerClient, } from "@supabase/ssr";
import { SupabaseClient } from '@supabase/supabase-js';
import { cookies } from "next/headers";
import { Database } from '@/types/database.types';
import { auth } from '@clerk/nextjs/server';

export async function createClient(): Promise<SupabaseClient<Database>> {
    const cookieStore = await cookies();
    const { getToken } = await auth();
    const clerkToken = await getToken({
        template: "supabase",
    });

    // Create a server's supabase client with newly configured cookie,
    // which could be used to maintain user's session
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        );
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
            global: {
                fetch: async (url, options = {}) => {

                    // Insert the Clerk Supabase token into the headers
                    const headers = new Headers(options?.headers);
                    headers.set("Authorization", `Bearer ${clerkToken}`);

                    // Call the default fetch
                    return fetch(url, {
                        ...options,
                        headers,
                    });
                },
            }

        },

    );
}