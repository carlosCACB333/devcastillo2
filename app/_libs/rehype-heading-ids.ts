import GithubSlugger from 'github-slugger';
import { cleanHeadingText } from '../_utils/blog';

interface HastNode {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
}

const HEADING_TAG = /^h[1-6]$/;

const toText = (node: HastNode): string =>
  node.type === 'text' ? (node.value ?? '') : (node.children ?? []).map(toText).join('');

/**
 * Asigna ids a los títulos (sin emojis, sin dobles guiones) con el mismo cálculo que `extractToc`.
 */
export default function rehypeHeadingIds() {
  return (tree: HastNode) => {
    const slugger = new GithubSlugger();

    const walk = (node: HastNode) => {
      if (node.type === 'element' && node.tagName && HEADING_TAG.test(node.tagName)) {
        node.properties ??= {};
        node.properties.id = slugger.slug(cleanHeadingText(toText(node)));
      }
      node.children?.forEach(walk);
    };

    walk(tree);
  };
}
