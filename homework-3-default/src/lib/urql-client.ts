import { Client, cacheExchange, fetchExchange } from "@urql/core";
import { GraphQLClient} from 'graphql-request'


export const makeUrqlClient = (token: string) => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_GRAPHQL_URL!;

  return new Client({
    url,
    exchanges: [ fetchExchange],

    fetchOptions: () => ({
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        Authorization: `Bearer ${token}`,
      },
    }),
  });
};

export const makeGQClient = async (token: string) => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_GRAPHQL_URL!;

  return new GraphQLClient(url, {
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      Authorization: `Bearer ${token}`,
    }
  })
}