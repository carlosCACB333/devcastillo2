import type { MetadataRoute, Route } from 'next';
import { envs } from './_config/envs';

const createUrl = (path: Route) => {
  return `${envs.SITE_URL}${path}`;
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: createUrl('/'),
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: createUrl('/certificates'),
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: createUrl('/projects'),
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
  ];
}
