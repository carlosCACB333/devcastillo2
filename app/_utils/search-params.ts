import { z } from 'zod';

const searchParamsSchema = z.object({
  q: z.string().optional(),
  page: z.string().optional(),
});

export function parseSearchParams(raw: unknown) {
  const params = searchParamsSchema.parse(raw);
  return {
    page: Math.max(1, Number.parseInt(params.page || '1', 10) || 1),
    q: params.q?.trim() || '',
  };
}
