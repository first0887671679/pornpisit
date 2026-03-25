/**
 * Server-side HTML sanitizer — strips dangerous tags/attributes
 * while keeping safe formatting tags for custom CMS sections.
 */

const ALLOWED_TAGS = new Set([
  'p', 'br', 'b', 'i', 'u', 'strong', 'em', 'a', 'ul', 'ol', 'li',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'div', 'img',
  'blockquote', 'pre', 'code', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'figure', 'figcaption', 'hr', 'section', 'article',
]);

const ALLOWED_ATTRS = new Set([
  'href', 'src', 'alt', 'title', 'class', 'id', 'target', 'rel',
  'width', 'height', 'loading', 'decoding',
]);

const DANGEROUS_PATTERNS = [
  /javascript\s*:/gi,
  /data\s*:/gi,
  /vbscript\s*:/gi,
  /on\w+\s*=/gi,
];

export function sanitizeHtml(html: string): string {
  if (!html) return '';

  let clean = html;

  // Remove script/iframe/object/embed/form tags entirely
  clean = clean.replace(/<\s*(script|iframe|object|embed|form|link|meta|base)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, '');
  clean = clean.replace(/<\s*(script|iframe|object|embed|form|link|meta|base)\b[^>]*\/?>/gi, '');

  // Remove event handlers (onclick, onerror, onload, etc.)
  clean = clean.replace(/\s+on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '');

  // Remove javascript: / vbscript: / data: URLs in href/src
  clean = clean.replace(/(href|src)\s*=\s*(?:"[^"]*(?:javascript|vbscript|data)\s*:[^"]*"|'[^']*(?:javascript|vbscript|data)\s*:[^']*')/gi, '');

  // Strip HTML comments (can hide payloads)
  clean = clean.replace(/<!--[\s\S]*?-->/g, '');

  // Add rel="noopener noreferrer" to all links with target="_blank"
  clean = clean.replace(/<a\s+([^>]*target\s*=\s*["']_blank["'][^>]*)>/gi, (match, attrs) => {
    if (/rel\s*=/.test(attrs)) return match;
    return `<a ${attrs} rel="noopener noreferrer">`;
  });

  return clean;
}
