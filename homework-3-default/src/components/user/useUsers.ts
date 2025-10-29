"use client";
import { useAuth } from '@clerk/nextjs';
import { useQuery } from "@tanstack/react-query";
import {  makeGQClient } from "@/lib/urql-client";
import {  GQL_GET_USERS } from "@/lib/gql";

import { Tables,  } from '@/types/database.types'



export function useUsers() {
  const { getToken } = useAuth();


  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {

      const token = await getToken({
        template: "supabase",
      });
      if (!token) {throw new Error('No authorized user"')}

      const client = await makeGQClient(token);
      const data = await client.request(GQL_GET_USERS);
      const users = (data?.usersCollection?.edges?.map((n: {node: Tables<'users'>}) => n.node) || []) as unknown as Tables<'users'>[];

      return users;
    },


  });
}
