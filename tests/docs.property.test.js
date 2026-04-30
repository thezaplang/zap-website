/**
 * Property-based tests for Zap language documentation structural invariants.
 *
 * These tests verify that ALL documentation pages in src/content/docs/ conform
 * to the quality standards defined in the design document.
 *
 * Properties:
 *   1. All Zap code blocks have the correct language tag
 *   2. All guide/std pages have valid frontmatter (title + description)
 *   3. All guide pages contain at least 2 zap code blocks
 *   4. All guide pages contain at least one diagnostic code reference
 */

import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { join } from 'path';
import {
  collectMarkdownFiles,
  parseFrontmatter,
  extractCodeBlocks,
  hasDiagnosticCode,
  readDoc,
} from './helpers/docs.js';

const DOCS_DIR = join(process.cwd(), 'src', 'content', 'docs');
const GUIDES_DIR = join(DOCS_DIR, 'guides');
const STD_DIR = join(DOCS_DIR, 'std');

// Collect file lists once
const allDocFiles = collectMarkdownFiles(DOCS_DIR);
const guideFiles = collectMarkdownFiles(GUIDES_DIR);
const stdFiles = collectMarkdownFiles(STD_DIR);

// ---------------------------------------------------------------------------
// Property 1: All Zap code blocks have the correct language tag
// Feature: zap-language-docs, Property 1: All Zap code blocks have the correct language tag
// Validates: Requirements 1.4, 16.2
// ---------------------------------------------------------------------------
describe('Property 1: All Zap code blocks have the correct language tag', () => {
  it('no fenced code block with Zap source uses an empty or non-zap tag', () => {
    // We use fast-check to pick arbitrary files from our corpus and verify the property.
    // The corpus is finite, so we use fc.constantFrom over the file list.
    if (allDocFiles.length === 0) return; // nothing to test yet

    fc.assert(
      fc.property(fc.constantFrom(...allDocFiles), (filePath) => {
        const content = readDoc(filePath);
        const blocks = extractCodeBlocks(content);

        // Heuristic: a block "looks like Zap" if it contains Zap keywords
        // (fun, var, const, import, class, struct, enum, return) but has no
        // language tag or a wrong tag.
        const zapKeywords = /\b(fun |var |const |import |class |struct |enum |return |global )/;

        for (const { lang, code } of blocks) {
          if (zapKeywords.test(code) && lang !== 'zap') {
            // Allow bash blocks that happen to contain zap-like words in comments
            if (lang === 'bash' || lang === 'sh') continue;
            return false; // violation
          }
        }
        return true;
      }),
      { numRuns: allDocFiles.length, seed: 42 }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 2: All guide/std pages have valid frontmatter
// Feature: zap-language-docs, Property 2: All guide pages have valid frontmatter
// Validates: Requirements 16.1
// ---------------------------------------------------------------------------
describe('Property 2: All guide/std pages have valid frontmatter', () => {
  it('every guide and std page has non-empty title and description', () => {
    const targetFiles = [...guideFiles, ...stdFiles];
    if (targetFiles.length === 0) return;

    fc.assert(
      fc.property(fc.constantFrom(...targetFiles), (filePath) => {
        const content = readDoc(filePath);
        const { title, description } = parseFrontmatter(content);
        return title.length > 0 && description.length > 0;
      }),
      { numRuns: targetFiles.length, seed: 42 }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 3: All guide pages contain sufficient code examples
// Feature: zap-language-docs, Property 3: All guide pages contain sufficient code examples
// Validates: Requirements 2.7, 4.7, 16.3
// ---------------------------------------------------------------------------
describe('Property 3: All guide pages contain sufficient code examples', () => {
  it('every guide page has at least 2 fenced zap code blocks', () => {
    if (guideFiles.length === 0) return;

    fc.assert(
      fc.property(fc.constantFrom(...guideFiles), (filePath) => {
        const content = readDoc(filePath);
        const zapBlocks = extractCodeBlocks(content).filter((b) => b.lang === 'zap');
        return zapBlocks.length >= 2;
      }),
      { numRuns: guideFiles.length, seed: 42 }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 4: All guide pages contain at least one diagnostic code reference
// Feature: zap-language-docs, Property 4: All guide pages contain at least one diagnostic code reference
// Validates: Requirements 16.4
// ---------------------------------------------------------------------------
describe('Property 4: All guide pages contain at least one diagnostic code reference', () => {
  it('every guide page references at least one compiler diagnostic code', () => {
    if (guideFiles.length === 0) return;

    fc.assert(
      fc.property(fc.constantFrom(...guideFiles), (filePath) => {
        const content = readDoc(filePath);
        return hasDiagnosticCode(content);
      }),
      { numRuns: guideFiles.length, seed: 42 }
    );
  });
});
