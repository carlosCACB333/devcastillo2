import type { MetadataRoute, Route } from 'next';
import { envs } from './_config/envs';
import { getBlogPosts } from './_data/posts';

const createUrl = (path: Route) => {
  return `${envs.SITE_URL}${path}`;
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
    {
      url: createUrl('/blog'),
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
  ];

  return [...routes, ...blogRoutes];
}
