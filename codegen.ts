import type { CodegenConfig } from '@graphql-codegen/cli';
import { envs } from './app/_config/envs';

const config: CodegenConfig = {
  schema: {
    [envs.HYGRAPH_URL]: {
      headers: {
        Authorization: `Bearer ${envs.HYGRAPH_TOKEN}`,
      },
    },
  },
  documents: ['graphql/**/*.graphql'],
  generates: {
    './graphql/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-graphql-request'],
    },
  },
};

export default config;
