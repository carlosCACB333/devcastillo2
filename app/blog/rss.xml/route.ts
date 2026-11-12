import { appLocale } from '@/app/_config/app';
import { absoluteUrl, rssFeed, siteUrl } from '@/app/_config/seo';
import { profile } from '@/app/_data/portfolio';
import { getBlogPosts, getPostModifiedAt } from '@/app/_data/posts';

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const toRfc822 = (date: string) => new Date(date.includes('T') ? date : `${date}T00:00:00Z`).toUTCString();

export function GET() {
  const posts = getBlogPosts();
  const lastBuild = posts[0] ? getPostModifiedAt(posts[0]) : new Date().toISOString();

  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/blog/${post.slug}`);
      const categories = (post.metadata.tags ?? [])
        .map((tag) => `      <category>${escapeXml(tag)}</category>`)
        .join('\n');

      return `    <item>
      <title>${escapeXml(post.metadata.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.metadata.summary)}</description>
      <pubDate>${toRfc822(post.metadata.publishedAt)}</pubDate>
      <dc:creator>${escapeXml(profile.name)}</dc:creator>
${categories}
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(rssFeed.title)}</title>
    <link>${absoluteUrl('/blog')}</link>
    <description>Artículos, tutoriales y reflexiones sobre desarrollo web, programación y tecnología.</description>
    <language>${appLocale.toLowerCase()}</language>
    <lastBuildDate>${toRfc822(lastBuild)}</lastBuildDate>
    <atom:link href="${absoluteUrl(rssFeed.path)}" rel="self" type="application/rss+xml" />
    <image>
      <url>${absoluteUrl(profile.avatarUrl)}</url>
      <title>${escapeXml(rssFeed.title)}</title>
      <link>${siteUrl}</link>
    </image>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
