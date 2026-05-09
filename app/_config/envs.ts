import { z } from 'zod';

const envSchema = z.object({
  HYGRAPH_URL: z.string().url('HYGRAPH_URL must be a valid URL'),
  HYGRAPH_TOKEN: z.string().min(1, 'HYGRAPH_TOKEN is required'),
  SITE_URL: z.string().url('SITE_URL must be a valid URL'),
});

export const envs = envSchema.parse(process.env);
