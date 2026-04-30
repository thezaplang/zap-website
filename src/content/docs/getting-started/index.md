---
title: Getting Started
description: Install Zap, compile your first program, and learn where to go next.
---

Zap is a compiled systems programming language with an LLVM backend, ARC memory management, modern syntax, and explicit `unsafe` escape hatches. It targets developers who want predictable performance without GC pauses — and error handling that doesn't look like noise.

> **Status:** Early Alpha. The language is usable but not all features are finalized.

## Installation

### Option 1 — Build from source

You need `clang 21+`, `llvm 21+`, `cmake 20+`, and `doxygen` installed.

```bash
git clone https://github.com/thezaplang/zap.git
cd zap
chmod +x build.sh
./build.sh
```

The compiler will be at `build/zapc`. Add it to your `PATH`:

```bash
# bash / zsh
export PATH="$PATH:/absolute/path/to/zap/build"
```

Verify the installation:

```bash
zapc --version
zapc --help
```

### Option 2 — Install script

```bash
curl -fsSL https://zaplang.xyz/install-latest.sh | bash
```

This downloads the latest pre-built binary and adds `zapc` to your `PATH` automatically.

---

## Your first program

Create a file called `hello.zp`:

```zap
import "std/io" { println };

fun main() Int {
    println("Hello, Zap!");
    return 0;
}
```

Compile and run it:

```bash
zapc hello.zp -o hello
./hello
```

Output:

```
Hello, Zap!
```

### What's happening here

- `import "std/io" { println }` — imports the `println` function from the standard library's I/O module.
- `fun main() Int` — the entry point. `main` must return `Int`.
- `println("Hello, Zap!")` — prints a string followed by a newline.
- `return 0;` — returns exit code 0 (success). Every statement ends with `;`.

---

## Compiler flags

| Flag | Description |
|------|-------------|
| `-o <name>` | Set the output binary name |
| `--allow-unsafe` | Enable unsafe blocks and raw pointer operations |
| `--help` | Show all available flags |

```bash
# Compile with a custom output name
zapc hello.zp -o hello

# Compile a program that uses unsafe features
zapc low_level.zp --allow-unsafe -o low_level
```

---

## A slightly bigger example

Here's a program that reads a name from stdin and greets the user:

```zap
import "std/io" { println, getLn };

fun greet(name: String) {
    println("Hello, " ~ name ~ "!");
}

fun main() Int {
    println("What's your name?");
    var name: String = getLn();
    greet(name);
    return 0;
}
```

Key things to notice:
- `~` is the string concatenation operator.
- `var name: String` declares a variable with an explicit type.
- Functions without a return type are `Void` — no `return` needed.
- `getLn()` reads a line from stdin (from `std/io`).

---

## What's in the docs

| Section | What you'll learn |
|---------|-------------------|
| [Variables](/guides/declaring_variables/) | Primitive types, `var`, `const`, `global`, `alias` |
| [Functions](/guides/calling_functions/) | Declarations, `ref` params, overloads, varargs, generics |
| [Control Flow](/guides/control_flow/) | `if`, `while`, `break`, ternary `?:` |
| [Arrays](/guides/arrays/) | Fixed-size arrays, indexing, nested arrays |
| [Structs & Records](/guides/structs_and_records/) | Named data types, field access, generics |
| [Enums & Aliases](/guides/enums_and_aliases/) | Closed value sets, `@error` enums, `alias` |
| [Classes](/guides/classes/) | Heap-allocated types, `init`, `deinit`, inheritance |
| [ARC & Weak Refs](/guides/arc_and_weak_refs/) | Memory model, reference cycles, `weak` |
| [Generics](/guides/generics/) | Generic functions, types, constraints, `iftype` |
| [Error Handling](/guides/error_handling/) | Failable functions, `fail`, `?`, `or`, `or err` |
| [Modules & Imports](/guides/modules_and_imports/) | `import`, `pub`, folder modules, stdlib list |
| [Unsafe](/guides/unsafe/) | Raw pointers, `ext fun`, FFI, `std/mem` |

## Recommended learning path

If you're new to Zap, follow this order:

1. [Variables](/guides/declaring_variables/) — types and declarations
2. [Functions](/guides/calling_functions/) — the building blocks
3. [Control Flow](/guides/control_flow/) — conditionals and loops
4. [Structs & Enums](/guides/structs_and_records/) — data modeling
5. [Classes](/guides/classes/) — object-oriented features
6. [Error Handling](/guides/error_handling/) — Zap's approach to failures
7. [Modules](/guides/modules_and_imports/) — organizing code
8. [Generics](/guides/generics/) — reusable, type-safe code
9. [Unsafe](/guides/unsafe/) — when you need to go low-level

## Doxygen reference

The full API reference is available at [docs.zaplang.xyz](https://docs.zaplang.xyz).
