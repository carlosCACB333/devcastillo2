import GithubSlugger from 'github-slugger';
import { Metadata } from '../_data/posts';

export const calculateReadingTime = (content: string) => {
  const readingTime = Math.max(1, Math.round(content.split(/\s+/).filter(Boolean).length / 200));
  return readingTime;
};

export const parseFrontmatter = (fileContent: string) => {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  const frontMatterBlock = match![1];
  const content = fileContent.replace(frontmatterRegex, '').trim();
  const frontMatterLines = frontMatterBlock.trim().split('\n');
  const metadata: Partial<Metadata> = {};

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(': ');
    let value = valueArr.join(': ').trim();
    value = value.replace(/^['"](.*)['"]$/, '$1'); // Remove quotes
    metadata[key.trim() as keyof Metadata] = value;
  });

  return { metadata: metadata as Metadata, content };
};

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

const EMOJI_REGEX = /[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu;

/** Convierte markdown inline en texto plano (igual que el texto que verá rehype-slug). */
const toPlainText = (markdown: string) =>
  markdown
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[`*_~]/g, '')
    .trim();

/**
 * Extrae los títulos h2/h3 del MDX para construir el índice.
 * Usa github-slugger, el mismo algoritmo que rehype-slug, para que los ids coincidan.
 */
export const extractToc = (content: string): TocItem[] => {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  let inCodeBlock = false;

  for (const line of content.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;

    const text = toPlainText(match[2]);
    // Se registran todos los niveles para que los sufijos de ids duplicados coincidan con rehype-slug.
    const id = slugger.slug(text);
    const level = match[1].length;
    if (level === 2 || level === 3) {
      items.push({
        id,
        level,
        text: text
          .replace(EMOJI_REGEX, '')
          .replace(/\s{2,}/g, ' ')
          .trim(),
      });
    }
  }

  return items;
};
