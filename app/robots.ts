import { envs } from './_config/envs';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
      },
    ],
    sitemap: `${envs.SITE_URL}/sitemap.xml`,
  };
}
