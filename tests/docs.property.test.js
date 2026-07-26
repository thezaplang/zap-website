import { describe, expect, it } from 'vitest';
import { existsSync } from 'fs';
import { dirname, join, resolve } from 'path';
import {
  collectMarkdownFiles,
  extractCodeBlocks,
  parseFrontmatter,
  readDoc,
} from './helpers/docs.js';

const docsDir = join(process.cwd(), 'src', 'content', 'docs');
const docFiles = collectMarkdownFiles(docsDir);

function resolveDocLink(sourceFile, href) {
  const cleanHref = href.replace(/[#?].*$/, '').replace(/\/$/, '');
  const base = cleanHref.startsWith('/')
    ? join(docsDir, cleanHref)
    : resolve(dirname(sourceFile), cleanHref);

  return [
    `${base}.md`,
    `${base}.mdx`,
    join(base, 'index.md'),
    join(base, 'index.mdx'),
  ].some(existsSync);
}

describe('documentation structure', () => {
  it('keeps distinct language concepts on dedicated guide pages', () => {
    const focusedGuides = [
      'primitive_types',
      'strings',
      'if',
      'while',
      'for',
      'records',
      'structs',
      'enums',
      'tagged_unions',
      'type_aliases',
      'ownership',
      'sink_parameters',
      'string_views',
      'weak_references',
      'inheritance',
      'modules',
      'imports',
      'constants',
      'global_variables',
      'overloads',
      'named_arguments',
      'ref_parameters',
      'varargs',
      'unsafe',
      'c_interop',
    ];

    for (const slug of focusedGuides) {
      expect(existsSync(join(docsDir, 'guides', `${slug}.md`)), slug).toBe(true);
    }
  });

  it('gives every page a title and description', () => {
    for (const file of docFiles) {
      const frontmatter = parseFrontmatter(readDoc(file));
      expect(frontmatter.title, file).not.toBe('');
      expect(frontmatter.description, file).not.toBe('');
    }
  });

  it('tags Zap source blocks as zap', () => {
    const zapSyntax = /\b(fun|var|const|global|import|class|struct|record|enum)\b/;

    for (const file of docFiles) {
      for (const block of extractCodeBlocks(readDoc(file))) {
        if (zapSyntax.test(block.code) && block.lang !== 'bash' && block.lang !== 'sh') {
          expect(block.lang, file).toBe('zap');
        }
      }
    }
  });

  it('does not use typographic dashes as sentence punctuation', () => {
    for (const file of docFiles) {
      expect(readDoc(file), file).not.toMatch(/[—–]/);
    }
  });

  it('does not restore known stale claims', () => {
    const staleClaims = [
      /unsafe features.+must pass.+--allow-unsafe/is,
      /getLn\(\)/,
      /writeFile.+returns? 0 on success/is,
      /records? and structs? are interchangeable/i,
    ];

    for (const file of docFiles) {
      const content = readDoc(file);
      for (const claim of staleClaims) {
        expect(content, `${file}: ${claim}`).not.toMatch(claim);
      }
    }
  });

  it('documents all supported error representations', () => {
    const content = readDoc(join(docsDir, 'guides', 'error_handling.md'));
    expect(content).toMatch(/@error\s+enum/);
    expect(content).toMatch(/@error\s+struct/);
    expect(content).toMatch(/@error\s+class/);
  });

  it('resolves internal documentation links', () => {
    const markdownLink = /\[[^\]]+\]\(([^)]+)\)/g;

    for (const file of docFiles) {
      const content = readDoc(file);
      for (const match of content.matchAll(markdownLink)) {
        const href = match[1];
        if (/^(https?:|mailto:|#)/.test(href)) continue;
        expect(resolveDocLink(file, href), `${file}: ${href}`).toBe(true);
      }
    }
  });
});
