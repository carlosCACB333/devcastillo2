import type { MetadataRoute, Route } from 'next';
import { absoluteUrl } from './_config/seo';
import { getBlogPosts } from './_data/posts';

const lastModified = '2026-05-01';

const createUrl = (path: Route) => absoluteUrl(path);

export default function sitemap(): MetadataRoute.Sitemap {
  const blogRoutes: MetadataRoute.Sitemap = getBlogPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: post.metadata.publishedAt,
    changeFrequency: 'yearly',
    priority: 0.7,
  }));

  const latestPost = getBlogPosts()[0]?.metadata.publishedAt ?? lastModified;

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
      changeFrequency: 'monthly',
      priority: 0.8,
      lastModified: latestPost,
    },
  ];

  return [...routes, ...blogRoutes];
}
