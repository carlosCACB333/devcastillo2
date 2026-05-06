import { envs } from './_config/envs';

const url = new URL('/sitemap.xml', envs.SITE_URL);

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
      },
    ],
    sitemap: url,
  };
}
