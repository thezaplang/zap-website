import { readdirSync, readFileSync, statSync } from 'fs';
import { join } from 'path';

/**
 * Recursively collect all .md and .mdx files under a directory.
 * @param {string} dir - absolute or relative path to search
 * @returns {string[]} list of file paths
 */
export function collectMarkdownFiles(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...collectMarkdownFiles(full));
    } else if (entry.endsWith('.md') || entry.endsWith('.mdx')) {
      results.push(full);
    }
  }
  return results;
}

/**
 * Parse YAML frontmatter from a Markdown string.
 * Returns { title, description } or empty strings if missing.
 * @param {string} content
 * @returns {{ title: string, description: string }}
 */
export function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { title: '', description: '' };
  const block = match[1];
  const title = (block.match(/^title:\s*(.+)$/m) || [])[1]?.trim() ?? '';
  const description = (block.match(/^description:\s*(.+)$/m) || [])[1]?.trim() ?? '';
  return { title, description };
}

/**
 * Extract all fenced code blocks from a Markdown string.
 * @param {string} content
 * @returns {{ lang: string, code: string }[]}
 */
export function extractCodeBlocks(content) {
  const blocks = [];
  const re = /```(\w*)\r?\n([\s\S]*?)```/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    blocks.push({ lang: m[1], code: m[2] });
  }
  return blocks;
}

/**
 * Check whether a string contains at least one diagnostic code reference.
 * Matches patterns like S2001, P1001, W1001, N1001, E1001.
 * @param {string} content
 * @returns {boolean}
 */
export function hasDiagnosticCode(content) {
  return /[PSWNEpswen]\d{4}/.test(content);
}

/**
 * Read a file and return its content as a string.
 * @param {string} filePath
 * @returns {string}
 */
export function readDoc(filePath) {
  return readFileSync(filePath, 'utf-8');
}
