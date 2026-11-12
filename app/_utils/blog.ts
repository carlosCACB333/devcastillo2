import GithubSlugger from 'github-slugger';
import { Metadata } from '../_data/posts';

export const calculateReadingTime = (content: string) => {
  const readingTime = Math.max(1, Math.round(content.split(/\s+/).filter(Boolean).length / 200));
  return readingTime;
};

const parseFrontmatterValue = (raw: string): string | string[] => {
  const value = raw.trim();
  // Listas en línea: tags: ['React', 'Next.js']
  if (value.startsWith('[') && value.endsWith(']')) {
    return value
      .slice(1, -1)
      .split(',')
      .map((item) => item.trim().replace(/^['"](.*)['"]$/, '$1'))
      .filter(Boolean);
  }
  return value.replace(/^['"](.*)['"]$/, '$1');
};

export const parseFrontmatter = (fileContent: string) => {
  const frontmatterRegex = /^---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  if (!match) {
    throw new Error('El post no tiene frontmatter');
  }
  const content = fileContent.replace(frontmatterRegex, '').trim();
  const metadata: Record<string, string | string[]> = {};

  for (const line of match[1].trim().split('\n')) {
    const separator = line.indexOf(':');
    if (separator === -1) continue;
    metadata[line.slice(0, separator).trim()] = parseFrontmatterValue(line.slice(separator + 1));
  }

  return { metadata: metadata as unknown as Metadata, content };
};

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

const EMOJI_REGEX = /[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu;

/** Texto de un título sin emojis ni espacios repetidos. Base común para ids e índice. */
export const cleanHeadingText = (text: string) => text.replace(EMOJI_REGEX, '').replace(/\s+/g, ' ').trim();

/** Convierte markdown inline en texto plano (el mismo texto que ve el plugin en el árbol HTML). */
const toPlainText = (markdown: string) =>
  markdown
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[`*_~]/g, '')
    .trim();

/**
 * Extrae los títulos h2/h3 del MDX para construir el índice.
 * Usa el mismo cálculo que el plugin `rehypeHeadingIds`, para que los ids coincidan.
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

    const text = cleanHeadingText(toPlainText(match[2]));
    // Se registran todos los niveles para que los sufijos de ids duplicados coincidan con el plugin.
    const id = slugger.slug(text);
    const level = match[1].length;
    if (level === 2 || level === 3) {
      items.push({ id, level, text });
    }
  }

  return items;
};
