# Design Document: Zap Language Documentation

## Overview

This design covers the creation and expansion of comprehensive documentation for the Zap programming language, integrated into the existing Astro Starlight site at `src/content/docs/`. The work involves rewriting and significantly expanding existing stub pages in `src/content/docs/guides/` and `src/content/docs/std/`, adding two new guide pages (`guides/generics.md` and `guides/error_handling.md`), and updating the sidebar configuration in `astro.config.mjs`.

The documentation targets two audiences:
- Developers coming from Go or Rust who want to learn Zap quickly
- Existing Zap users looking for a precise reference on specific language features

All content is authored in Markdown with Astro Starlight frontmatter and rendered by the existing Starlight pipeline. No new build tooling or dependencies are required.

### Research Summary

The following sources were analyzed to inform this design:

- **`zap/docs/`** — internal language reference docs (variables, functions, control flow, data structures, classes, memory, generics, diagnostic codes)
- **`zap/example/`** — ~40 working `.zp` example programs covering all major language features
- **`src/content/docs/`** — existing Starlight pages (current state, gaps identified)
- **`astro.config.mjs`** — current sidebar structure
- **`zap/README.md`** — language overview and feature highlights

Key findings:
- Existing guide pages are stubs (typically 30–60 lines) with minimal examples and no diagnostic code references
- `guides/generics.md` and `guides/error_handling.md` do not exist yet
- The sidebar is missing entries for Generics and Error Handling
- All std pages already have correct API signatures and at least one example; they need minor expansion
- The `zap/example/` directory contains rich, working examples that can be directly incorporated
- Diagnostic codes are stable and documented in `zap/docs/diagnostic_codes.md`

---

## Architecture

The documentation system is a static site built with Astro Starlight. The architecture is straightforward:

```
astro.config.mjs          ← sidebar navigation configuration
src/content/docs/
  getting-started/
    index.md              ← entry point page
  guides/
    declaring_variables.md
    constants_and_globals.md
    calling_functions.md
    overloads_and_named_args.md
    references_and_varargs.md
    control_flow.md
    arrays.md
    structs_and_records.md
    enums_and_aliases.md
    classes.md
    arc_and_weak_refs.md
    modules_and_imports.md
    unsafe.md
    generics.md           ← NEW
    error_handling.md     ← NEW
  std/
    index.md
    io.md
    string.md
    process.md
    fs.md
    path.md
    math.md
    convert.md
    error.md
    mem.md
    prelude.md
```

Each Markdown file is a self-contained documentation page. Starlight handles rendering, navigation, and search indexing automatically. The sidebar in `astro.config.mjs` controls the visible navigation structure.

There are no runtime components, APIs, or databases involved. The "system" being designed is a set of Markdown files and one configuration file.

---

## Components and Interfaces

### 1. Guide Pages (`src/content/docs/guides/`)

Each guide page is a Markdown file with:
- **Frontmatter**: `title` and `description` fields (required by Starlight)
- **Sections**: organized by language feature sub-topics
- **Code blocks**: fenced with ` ```zap ` language identifier
- **Diagnostic section**: listing relevant compiler error codes
- **Cross-links**: links to related pages

Pages to rewrite (expand from stubs):
- `declaring_variables.md` — add all primitive types, pointer mention, diagnostic codes
- `constants_and_globals.md` — already decent; add diagnostic codes
- `calling_functions.md` — add ref params, overloads, named args, varargs, generics, recursion
- `overloads_and_named_args.md` — already decent; add disambiguation rules
- `references_and_varargs.md` — already decent; add diagnostic codes
- `control_flow.md` — add block scope, ternary rules, non-implicit truthiness, diagnostics
- `arrays.md` — add nested arrays, function params, diagnostic codes
- `structs_and_records.md` — add generic structs, all field rules, diagnostic codes
- `enums_and_aliases.md` — add `@error` attribute, diagnostic codes
- `classes.md` — add `deinit`, static methods, full lifecycle example, diagnostic codes
- `arc_and_weak_refs.md` — add cycle collector, ownership patterns, diagnostic codes
- `modules_and_imports.md` — add all import forms, std module list, diagnostic codes
- `unsafe.md` — add `@repr("C")`, `ext fun`/`ext var`, FFI example, diagnostic codes

Pages to create:
- `generics.md` — full generics guide (generic functions, structs, classes, `where`, `iftype`)
- `error_handling.md` — full failable functions guide (`!`, `fail`, `?`, `or`, `or err`)

### 2. Standard Library Pages (`src/content/docs/std/`)

Each std page already has correct API signatures. Minor expansions needed:
- `io.md` — already complete
- `string.md` — already complete
- `fs.md` — already complete; verify `mkdirAll` is documented
- `path.md` — already complete
- `math.md` — already complete
- `convert.md` — already complete; verify all overloads listed
- `error.md` — already complete
- `mem.md` — already complete
- `process.md` — already complete
- `prelude.md` — already complete

### 3. Getting Started Page (`src/content/docs/getting-started/index.md`)

Needs expansion to include:
- Installation section (source build + `install-latest.sh`)
- Complete Hello Zap example with `std/io` import
- Compilation command with `zapc`, `-o`, `--allow-unsafe` flags
- Links to Variables, Functions, Control Flow

### 4. Sidebar Configuration (`astro.config.mjs`)

The sidebar needs two new entries added to the existing structure:
- `guides/generics` under a new "Advanced" section or appended to "Basics"
- `guides/error_handling` under the same section

Proposed sidebar additions (inserted between "Data model" and "Object model"):

```js
{
  label: 'Advanced',
  items: [
    { label: 'Generics', slug: 'guides/generics' },
    { label: 'Error Handling', slug: 'guides/error_handling' },
  ],
},
```

---

## Data Models

### Frontmatter Schema

Every guide page and std page must conform to this frontmatter structure:

```yaml
---
title: <Page Title>
description: <One-sentence description of the page content>
---
```

Starlight uses `title` for the `<title>` tag and sidebar label (when not overridden), and `description` for meta description and OpenGraph tags.

### Code Block Convention

All Zap code examples use fenced code blocks with the `zap` language identifier:

````markdown
```zap
fun main() Int {
    return 0;
}
```
````

Shell commands use `bash`:

````markdown
```bash
./zap/build/zapc hello.zp -o hello
```
````

### Diagnostic Code Reference Format

Each guide page that describes a language feature includes a "Common Diagnostics" or "Diagnostic Codes" section listing relevant error codes in this format:

```markdown
## Common Diagnostics

| Code | Meaning |
|------|---------|
| `S2001` | Undefined identifier |
| `S2002` | Type mismatch in assignment |
| `P1001` | Missing semicolon |
```

### Cross-Link Convention

Links to other documentation pages use Starlight's root-relative slug format:

```markdown
[Classes](/guides/classes/)
[Diagnostic Codes reference](https://docs.zaplang.xyz)
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

This feature is a documentation authoring project. The "code" being produced is Markdown files. Property-based testing applies here in a limited but meaningful way: several acceptance criteria express universal properties that should hold across **all** documentation pages, not just specific ones. These are amenable to property-based testing because:

- The input space is the set of all Markdown files in `src/content/docs/`
- The properties are structural invariants (frontmatter presence, code block language tags, minimum code block counts, cross-link presence)
- Running tests against all pages (or a generated sample) finds violations that example-based tests on individual files would miss

**Property Reflection:**

After reviewing all prework items:
- Properties 1 and 2 both concern code block language tags — they can be unified into one property covering all pages
- Properties 3 and 4 both concern minimum code block counts — they can be unified
- Property 5 (frontmatter) and Property 6 (cross-links) are independent and non-redundant
- Property 7 (diagnostic codes) is independent

After consolidation, 4 distinct properties remain.

---

### Property 1: All Zap code blocks have the correct language tag

*For any* documentation page in `src/content/docs/`, every fenced code block that contains Zap source code SHALL use the `zap` language identifier (not an empty tag, `plaintext`, or any other identifier).

**Validates: Requirements 1.4, 16.2**

---

### Property 2: All guide pages have valid frontmatter

*For any* Markdown file in `src/content/docs/guides/` and `src/content/docs/std/`, the file SHALL contain a YAML frontmatter block with non-empty `title` and `description` fields.

**Validates: Requirements 16.1**

---

### Property 3: All guide pages contain sufficient code examples

*For any* Markdown file in `src/content/docs/guides/`, the file SHALL contain at least two fenced code blocks with the `zap` language identifier.

**Validates: Requirements 2.7, 4.7, 16.3**

---

### Property 4: All guide pages contain at least one diagnostic code reference

*For any* Markdown file in `src/content/docs/guides/`, the file SHALL contain at least one reference to a compiler diagnostic code matching the pattern `[PSWNEpswen]\d{4}` (e.g., `S2001`, `P1001`, `W1001`).

**Validates: Requirements 16.4**

---

## Error Handling

Since this project produces static Markdown files, "errors" are authoring mistakes rather than runtime failures. The following categories of errors are addressed:

### Authoring Errors

| Error | Detection | Resolution |
|-------|-----------|------------|
| Missing frontmatter | Property test / Starlight build warning | Add `title` and `description` |
| Wrong code block language tag | Property test | Change to `zap` or `bash` |
| Broken internal link | Starlight build warning | Fix slug path |
| Missing diagnostic section | Property test | Add "Common Diagnostics" section |
| Outdated API signature | Manual review against `zap/src/` | Update signature |

### Build Errors

Starlight will emit build errors or warnings for:
- Malformed frontmatter YAML
- Invalid MDX syntax (for `.mdx` files)
- Broken image references

These are caught by running `npm run build` or `npm run dev` during authoring.

### Content Gaps

If a language feature is added to Zap after documentation is written, the documentation will be incomplete. This is addressed by:
- Linking to the Doxygen reference (`https://docs.zaplang.xyz`) as the authoritative API reference
- Noting "Early Alpha" status on the Getting Started page

---

## Testing Strategy

This project produces documentation files, not executable application code. The testing strategy is therefore documentation-focused.

### Unit Tests (Example-Based)

Example-based tests verify that specific required content exists in specific files. These are implemented as simple file-reading assertions:

- Getting Started page contains installation section, Hello Zap example, `zapc` command
- Variables page lists all 17 primitive types
- Error handling page contains `fail`, `?`, `or`, `or err` syntax
- Sidebar config contains entries for `guides/generics` and `guides/error_handling`
- Each std page contains its required API functions

These tests are fast, deterministic, and directly validate the acceptance criteria.

### Property-Based Tests

Property-based tests verify structural invariants that should hold across **all** documentation pages. These are implemented using a property-based testing library (e.g., `fast-check` for TypeScript/Node.js, which is already available in the project via the Astro/Node.js ecosystem).

The test runner:
1. Reads all `.md` and `.mdx` files from `src/content/docs/`
2. For each file, checks the structural properties defined above
3. Reports violations with the file path and specific failure

**Property Test Configuration:**
- Each property test runs against all files in `src/content/docs/` (currently ~25 files, growing to ~27)
- For property-based testing with generated inputs, minimum 100 iterations per property
- Tag format: **Feature: zap-language-docs, Property {number}: {property_text}**

**Property 1 test**: For each `.md` file, parse all fenced code blocks and assert none use an empty or non-`zap` language tag for Zap code.
- **Feature: zap-language-docs, Property 1: All Zap code blocks have the correct language tag**

**Property 2 test**: For each `.md` file in `guides/` and `std/`, parse frontmatter and assert `title` and `description` are present and non-empty.
- **Feature: zap-language-docs, Property 2: All guide pages have valid frontmatter**

**Property 3 test**: For each `.md` file in `guides/`, count fenced code blocks with `zap` tag and assert count >= 2.
- **Feature: zap-language-docs, Property 3: All guide pages contain sufficient code examples**

**Property 4 test**: For each `.md` file in `guides/`, search for diagnostic code pattern `[PSWNEpswen]\d{4}` and assert at least one match exists.
- **Feature: zap-language-docs, Property 4: All guide pages contain at least one diagnostic code reference**

### Integration Tests

Run `npm run build` to verify the full Starlight build succeeds with no errors. This catches:
- Broken internal links
- Malformed frontmatter
- Missing page slugs referenced in sidebar

### Manual Review Checklist

Before marking documentation complete, perform a manual review pass:
- [ ] All code examples compile with `zapc` (spot-check 3–5 examples per page)
- [ ] Terminology is consistent with the Glossary in `requirements.md`
- [ ] Cross-links between related pages are present and correct
- [ ] Sidebar navigation order is logical for a new learner
- [ ] Getting Started page can be followed by a new user end-to-end
