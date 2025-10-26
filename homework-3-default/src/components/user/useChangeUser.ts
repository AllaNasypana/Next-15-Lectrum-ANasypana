"use client";
import { useAuth, useUser } from '@clerk/nextjs';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {  makeGQClient } from "@/lib/urql-client";
import {toast} from 'react-toastify';
import { toastOptions } from '@/config';
import {  GQL_GET_USER_BY_USER_ID, GQL_CREATE_USER, GQL_UPDATE_USER } from "@/lib/gql";

import { Tables,  } from '@/types/database.types';

export const useChangeUser = (onMutationSuccess?: () => void) => {
    const { getToken  } = useAuth();
    const { user } = useUser();
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ["users", {userId: user?.id}],
        queryFn: async () => {
            const token = await getToken({
                template: "supabase",
            });
            if (!token) throw new Error('No authorized user')
            const client = await makeGQClient(token);
            const data = await client.request(GQL_GET_USER_BY_USER_ID, {
                userId: user?.id
            });

            if(!!data?.usersCollection && !!data?.usersCollection.edges.length) {
                return data?.usersCollection.edges[0].node as unknown as Tables<'users'>;
            }
            const newUser = await client.request(GQL_CREATE_USER, {
                email: user?.emailAddresses[0].emailAddress,
                name: user?.username || user?.fullName || ''
            });
            if(!newUser.insertIntousersCollection.records.length) throw new Error('Something went wrong')

            return newUser.insertIntousersCollection.records[0] as unknown as Tables<'users'>;

        },
        enabled: !!user && !!getToken,
        staleTime: 360000
    });

    const mutation = useMutation({
        mutationFn: async (name: string) => {
            const token = await getToken({
                template: "supabase",
            });
            if (!token) throw new Error('No authorized user')
            const client = await makeGQClient(token);
            const data = await client.request(GQL_UPDATE_USER, {
                name
            })
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({queryKey: ['users']});
            queryClient.invalidateQueries({queryKey: ["users", {userId: user?.id}]});
            onMutationSuccess && onMutationSuccess();
        },
        onError: async (error) => {
            toast.error(error.message, toastOptions);

        }
    })

    return {
        query,
        mutation,
    }
}