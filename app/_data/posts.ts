import fs from 'fs';
import path from 'path';
import { parseFrontmatter } from '../_utils/blog';

export type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
};

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  return parseFrontmatter(rawContent);
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export type BlogPost = ReturnType<typeof getMDXData>[number];

let postsCache: BlogPost[] | undefined;

/**
 * Lee los posts una sola vez por proceso y los devuelve ordenados del más reciente al más antiguo.
 */
export function getBlogPosts(): BlogPost[] {
  postsCache ??= getMDXData(path.join(process.cwd(), 'app', 'blog', '_posts')).sort(
    (a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
  );
  return postsCache;
}

export function getBlogPost(slug: string) {
  return getBlogPosts().find((post) => post.slug === slug);
}
