import { createBrowserClient } from "@supabase/ssr";


export function createClient(clerkToken: string) {
    // Create a supabase client on the browser with project's credentials
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            global: {
                fetch: async (url, options = {}) => {

                    // Insert the Clerk Supabase token into the headers
                    const headers = new Headers(options?.headers);
                    headers.set("Authorization", `Bearer ${clerkToken}`);


                    return fetch(url, {
                        ...options,
                        headers,
                    });
                },
            }
        }
    );
}