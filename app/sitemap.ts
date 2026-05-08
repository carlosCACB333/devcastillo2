import type { MetadataRoute, Route } from 'next';
import { envs } from './_config/envs';
import { getBlogPosts } from './_data/posts';

export const dynamic = 'force-static';

const lastModified = '2026-05-01';

const createUrl = (path: Route) => {
  const url = new URL(path, envs.SITE_URL);
  return url.href;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const blogRoutes: MetadataRoute.Sitemap = getBlogPosts().map((post) => ({
    url: `${createUrl('/blog')}/${post.slug}`,
    lastModified: post.metadata.publishedAt,
    changeFrequency: 'yearly',
    priority: 0.7,
  }));

  const routes: MetadataRoute.Sitemap = [
    {
      url: createUrl('/'),
      changeFrequency: 'yearly',
      priority: 1,
      lastModified,
    },
    {
      url: createUrl('/certificates'),
      changeFrequency: 'yearly',
      priority: 0.8,
      lastModified,
    },
    {
      url: createUrl('/projects'),
      changeFrequency: 'yearly',
      priority: 0.8,
      lastModified,
    },
    {
      url: createUrl('/blog'),
      changeFrequency: 'yearly',
      priority: 0.8,
      lastModified,
    },
  ];

  return [...routes, ...blogRoutes];
}
