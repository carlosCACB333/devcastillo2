import type { MetadataRoute, Route } from 'next';
import { absoluteUrl } from './_config/seo';
import { getBlogPosts, getPostModifiedAt } from './_data/posts';

const lastModified = '2026-05-01';

const createUrl = (path: Route) => absoluteUrl(path);

export default function sitemap(): MetadataRoute.Sitemap {
  const blogRoutes: MetadataRoute.Sitemap = getBlogPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: getPostModifiedAt(post),
    changeFrequency: 'yearly',
    priority: 0.7,
  }));

  const latestPost = getBlogPosts().reduce(
    (latest, post) => (getPostModifiedAt(post) > latest ? getPostModifiedAt(post) : latest),
    lastModified
  );

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
