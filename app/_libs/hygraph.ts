import { GraphQLClient } from 'graphql-request';
import { getSdk } from '@/graphql/generated/graphql';
import { envs } from '@/app/_config/envs';

const client = new GraphQLClient(envs.HYGRAPH_URL, {
  headers: {
    Authorization: `Bearer ${envs.HYGRAPH_TOKEN}`,
  },
});

export const hygraph = getSdk(client);
