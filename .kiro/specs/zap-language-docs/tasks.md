# Implementation Plan: Zap Language Documentation

## Overview

Expand and create documentation pages for the Zap programming language integrated into the existing Astro Starlight site. The work involves rewriting stub guide pages, creating two new guide pages (`generics.md`, `error_handling.md`), expanding std pages, updating the sidebar, and adding property-based tests that verify structural invariants across all documentation files.

## Tasks

- [x] 1. Set up testing infrastructure
  - Install `fast-check` and a test runner (Vitest) as dev dependencies
  - Create `tests/` directory with a helper that reads all `.md` files from `src/content/docs/`
  - Write shared utilities: frontmatter parser, fenced-code-block extractor, diagnostic-code regex
  - _Requirements: 16.1, 16.2, 16.3, 16.4_

- [x] 2. Property tests for structural invariants
  - [x]* 2.1 Write property test for code block language tags (Property 1)
    - For every `.md` file in `src/content/docs/`, assert no fenced code block containing Zap source uses an empty or non-`zap` tag
    - **Property 1: All Zap code blocks have the correct language tag**
    - **Validates: Requirements 1.4, 16.2**
  - [x]* 2.2 Write property test for frontmatter validity (Property 2)
    - For every `.md` file in `guides/` and `std/`, assert `title` and `description` are present and non-empty
    - **Property 2: All guide pages have valid frontmatter**
    - **Validates: Requirements 16.1**
  - [x]* 2.3 Write property test for minimum code example count (Property 3)
    - For every `.md` file in `guides/`, assert at least two fenced ` ```zap ` blocks exist
    - **Property 3: All guide pages contain sufficient code examples**
    - **Validates: Requirements 2.7, 4.7, 16.3**
  - [x]* 2.4 Write property test for diagnostic code references (Property 4)
    - For every `.md` file in `guides/`, assert at least one match for pattern `[PSWNEpswen]\d{4}`
    - **Property 4: All guide pages contain at least one diagnostic code reference**
    - **Validates: Requirements 16.4**

- [ ] 3. Checkpoint — run all property tests against existing files
  - Ensure all tests pass on the current state of `src/content/docs/` before making content changes; note which existing pages already fail (expected) so regressions are visible. Ask the user if questions arise.

- [x] 4. Rewrite `getting-started/index.md`
  - Add installation section: compile from source steps and `install-latest.sh` script
  - Add complete Hello Zap example with `import "std/io"`, `fun main() Int`, `io.println(...)`, `return 0;`
  - Add compilation commands: `zapc hello.zp -o hello` and `zapc --allow-unsafe program.zp`
  - Add forward links to Variables, Functions, Control Flow pages
  - Use `bash` code blocks for shell commands and `zap` blocks for Zap code
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [x] 5. Rewrite `guides/declaring_variables.md`
  - List all 17 primitive types: `Int`, `Int8`, `Int16`, `Int32`, `Int64`, `UInt`, `UInt8`, `UInt16`, `UInt32`, `UInt64`, `Float`, `Float32`, `Float64`, `Bool`, `Char`, `String`, `Void`
  - Document `var` with explicit type annotation and declaration-before-assignment pattern
  - Document `const` with mandatory initialization and no-reassignment rule
  - Document `global var` as mutable module-level state
  - Document `alias` with example `alias UserId = Int`
  - Add pointer type mention (`*Type`) with link to Unsafe page
  - Add at least three `zap` code blocks per category (var, const, global var, alias)
  - Add "Common Diagnostics" table: `S2001`, `S2002`, `P1001`
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 16.1, 16.2, 16.4_

- [x] 6. Rewrite `guides/calling_functions.md`
  - Document `fun name(params) ReturnType { ... }` syntax with return type after parameter list
  - Document `Void` functions (no explicit return type or explicit `Void`)
  - Document `ref` parameters: required in both declaration and call site
  - Document overloading with disambiguation rules
  - Document named arguments with rule: positional args cannot follow named args
  - Document variadics `...T` with `.len` access and index access
  - Document generic functions `fun name<T>(param: T) T` with type inference
  - Add recursion example (factorial or Fibonacci)
  - Add cross-link to Classes page for methods
  - Add "Common Diagnostics" table: `S2012`, `S2013`, `S2002`, `W1001`
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 16.1, 16.2, 16.4_

- [x] 7. Rewrite `guides/control_flow.md`
  - Document `if`, `else if`, `else` with `Bool`-only condition requirement
  - Document `while` with optional parentheses around condition
  - Document `break` and `continue` with note that use outside a loop is a semantic error
  - Document ternary `?:` with type-compatibility requirement for both branches
  - Add example showing integers and strings are NOT implicitly truthy/falsy
  - Document block scope `{ ... }` and local variable visibility
  - Ensure at least four `zap` code blocks with complete, working examples
  - Add "Common Diagnostics" table: `S2003`, `S2005`, `P1001`
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 16.1, 16.2, 16.4_

- [x] 8. Rewrite `guides/arrays.md`
  - Document `[N]T` type syntax where `N` is a compile-time size
  - Document initialization with `{e1, e2, ...}` literal and type-homogeneity requirement
  - Document zero-based indexing with integer-only index requirement
  - Document nested arrays (e.g., `[2][2]Int`)
  - Add example of passing an array to a function
  - Add "Common Diagnostics" table: `S2007`, `S2008`, `S2009`
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 16.1, 16.2, 16.4_

- [x] 9. Rewrite `guides/structs_and_records.md`
  - Document `struct Name { field: Type, ... }` with comma separator
  - Document `record Name { field: Type, ... }` as alternative form
  - Document struct literal `Name{ field: value, ... }` with all-fields-required rule
  - Document field access via `.` operator
  - Add example of struct as function parameter and return value
  - Document generic structs `struct Name<T> { ... }` with instantiation example
  - Add "Common Diagnostics" table: `S2001`, `S2002`
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 16.1, 16.2, 16.4_

- [x] 10. Rewrite `guides/enums_and_aliases.md`
  - Document `enum Name { Variant1, Variant2, ... }` with optional trailing comma
  - Document variant access via `EnumName.Variant`
  - Document enum comparison with `==` operator
  - Document `@error` attribute for enums used in failable functions
  - Document `alias` with example `alias UserId = Int`
  - Add example of enum used in `if` branching logic
  - Add "Common Diagnostics" table: `S2001`, `S2004`
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 16.1, 16.2, 16.4_

- [x] 11. Rewrite `guides/classes.md`
  - Document class declaration with fields, methods, and `self`
  - Document `new ClassName(args)` allocation and `init(...)` method role
  - Document visibility modifiers `pub`, `priv`, `prot` with access rules
  - Document single inheritance `class Child : Parent` with dynamic dispatch
  - Document static methods `static fun`
  - Document `deinit()` as destruction hook
  - Add complete example class with `init`, `deinit`, private fields, and public methods
  - Add cross-link to ARC and Weak Refs page
  - Add "Common Diagnostics" table: `S2001`, `S2002`, `S2011`
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8, 16.1, 16.2, 16.4_

- [x] 12. Rewrite `guides/arc_and_weak_refs.md`
  - Document ARC model: reference count incremented on copy, decremented on scope exit
  - Document `weak ClassName` as non-owning reference
  - Document `alive(weakRef)` and `lock(weakRef)` for safe access
  - Document strong reference cycles and Zap's Cycle Collector mechanism
  - Add parent/child example with `weak` reference to parent
  - Add `deinit()` example demonstrating deterministic memory release
  - Document usage patterns: parent-child trees, observer registries, caches
  - Add "Common Diagnostics" table: `S2011`
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 16.1, 16.2, 16.4_

- [x] 13. Create `guides/generics.md` (new file)
  - Document generic functions `fun name<T>(param: T) T { ... }`
  - Document type inference at generic function call sites
  - Document generic structs and records `struct Name<T> { ... }`
  - Document generic classes `class Name<T> { ... }`
  - Document constraints `where T: InterfaceName` with example
  - Document `iftype T == ConcreteType { ... }` for compile-time branching
  - Add example with multiple type parameters `<A, B>`
  - Add "Common Diagnostics" table: `S2001`, `S2002`, `S2012`
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 10.8, 16.1, 16.2, 16.4_

- [x] 14. Create `guides/error_handling.md` (new file)
  - Document failable function syntax `fun name(params) ReturnType!ErrorEnum { ... }`
  - Document `fail ErrorEnum.Variant;` statement for signaling failure
  - Document `?` operator for propagating errors up the call stack
  - Document `or fallbackValue` expression for providing a default value
  - Document `or err { ... }` expression for local error handling with `err` access
  - Document `@error` attribute on error enums
  - Add complete example with a chain of failable functions using all three handling patterns
  - Add "Common Diagnostics" table: `S2001`, `S2002`
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7, 16.1, 16.2, 16.4_

- [x] 15. Rewrite `guides/modules_and_imports.md`
  - Document `import "module"` with access via `module.symbol`
  - Document `import "module" { sym1, sym2 }` selective import
  - Document `import "module" as alias` namespace alias import
  - Document `pub` as export modifier for functions, types, and aliases
  - Document folder imports as mechanism for loading multiple `.zp` files
  - Add two-file project example (`app.zp` + `math.zp`) with export and import
  - List all standard library modules with a short description of each
  - Add "Common Diagnostics" table: `S2001`, `P1003`
  - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7, 16.1, 16.2, 16.4_

- [x] 16. Rewrite `guides/unsafe.md`
  - Document `--allow-unsafe` compiler flag as prerequisite
  - Document `unsafe { ... }` block and `unsafe fun` declaration
  - Document pointer types `*Type`, `*Void`, address-of `&`, dereference `*ptr`, pointer arithmetic `ptr + i`
  - Document `as` cast between pointer types
  - Document `std/mem` with `malloc` and `free`
  - Document `ext fun` and `ext var` declarations for C symbol binding
  - Document `@repr("C")` attribute for C-ABI-compatible structs and enums
  - Add complete malloc/write/read/free example using `std/mem`
  - Add FFI example with `ext fun` and C function call
  - Add "Common Diagnostics" table: `S2006`, `S2010`, `P1003`
  - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 13.7, 13.8, 13.9, 16.1, 16.2, 16.4_

- [ ] 17. Checkpoint — run all property tests against updated guide pages
  - Ensure all property tests pass for all rewritten and new guide pages. Ask the user if questions arise.

- [x] 18. Expand std pages
  - [x] 18.1 Expand `std/io.md`
    - Verify all required functions are documented: `println`, `printInt`, `printFloat`, `printBool`, `printChar`, `eprintln`, `getLn`, `printf`, `printfln`
    - Add at least one complete working example if not already present
    - _Requirements: 14.1, 14.2, 14.3_
  - [x] 18.2 Expand `std/string.md`
    - Verify `len`, `at`, `slice`, `eq`, `fromChar`, `pushChar` are documented with full signatures
    - Add at least one complete working example
    - _Requirements: 14.1, 14.2, 14.4_
  - [x] 18.3 Expand `std/fs.md`
    - Verify `readFile`, `writeFile`, `mkdirAll` are documented
    - Add at least one complete working example
    - _Requirements: 14.1, 14.2, 14.5_
  - [x] 18.4 Expand `std/path.md`
    - Verify `join`, `basename`, `parent` are documented
    - Add at least one complete working example
    - _Requirements: 14.1, 14.2, 14.6_
  - [x] 18.5 Expand `std/math.md`
    - Verify all available math functions are documented with full signatures
    - Add at least one complete working example
    - _Requirements: 14.1, 14.2, 14.7_
  - [x] 18.6 Expand `std/convert.md`
    - Verify all type conversion function overloads are listed
    - Add at least one complete working example
    - _Requirements: 14.1, 14.2, 14.8_
  - [x] 18.7 Expand `std/mem.md`
    - Verify `malloc`, `free`, and related functions are documented
    - Add at least one complete working example
    - _Requirements: 14.1, 14.2, 14.9_
  - [x] 18.8 Expand `std/process.md`
    - Verify `argc`, `argv`, `cwd`, `exit` are documented
    - Add at least one complete working example
    - _Requirements: 14.1, 14.2, 14.10_
  - [x] 18.9 Expand `std/error.md`
    - Verify error mechanism and related types are documented
    - Add at least one complete working example
    - _Requirements: 14.1, 14.2, 14.11_
  - [x] 18.10 Expand `std/prelude.md`
    - Document all symbols automatically available without import
    - Add at least one complete working example
    - _Requirements: 14.1, 14.2, 14.12_

- [x] 19. Update sidebar in `astro.config.mjs`
  - Add new "Advanced" section between "Data model" and "Object model" with entries for `guides/generics` and `guides/error_handling`
  - Verify all existing sidebar entries still resolve to valid page slugs
  - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5_

- [x] 20. Final checkpoint — run full test suite and verify build
  - Run all property tests and unit tests; ensure all pass
  - Run `npm run build` to verify the Starlight build succeeds with no errors
  - Fix any broken links, malformed frontmatter, or missing sidebar entries found during build
  - Ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation after major content milestones
- Property tests (tasks 2.1–2.4) validate universal structural invariants across all documentation pages
- The `fast-check` library is used for property-based testing; Vitest is the recommended test runner for this Node.js/Astro project
- New files `guides/generics.md` and `guides/error_handling.md` must be created before the sidebar update in task 19
- All Zap code examples should be drawn from or inspired by the working examples in `zap/example/`
