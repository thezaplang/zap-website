---
title: Compiler reference
description: Low-level zapc options for tooling and compiler diagnostics.
---

Thor is the normal way to build applications. This page documents `zapc` for
editor integration, custom tooling, and compiler diagnostics. For a project,
start with [Thor build tool](/guides/thor/).

The compiler itself accepts one source entry point:

```bash
zapc main.zp -o app
./app
```

Run `zapc --help` to see the options supported by the installed version. In a
Thor project, pass a one-off compiler option with `thor build -- <option>`.

## Common options

| Option | Effect |
| --- | --- |
| `-o path` | Set the output path |
| `-O0`, `-O1`, `-O2`, `-O3` | Set the optimization level |
| `-c` | Compile and assemble without linking |
| `-S` | Compile without assembling or linking |
| `-emit-llvm` | Emit LLVM IR |
| `-emit-zir` | Emit Zap IR |
| `--target=triple` | Select an LLVM target triple |
| `-l name` | Link a library |
| `-L path` | Add a library search directory |

## Imports and the standard library

| Option | Effect |
| --- | --- |
| `--import-map alias=path` | Map an import prefix to a path; may be repeated |
| `--print-stdlib-path` | Print the resolved standard library directory |
| `--print-core-path` | Print the resolved core library directory |
| `-noprelude` | Disable the automatic prelude import |
| `-nostdlib` | Do not link the standard library |
| `--freestanding` | Compile without host OS runtime assumptions |

`-noprelude` removes convenient names such as `println`, `List`, and
`StringView` from the automatic scope. It does not by itself make a program
freestanding.

## Inspect intermediate output

```bash
zapc main.zp -emit-zir -o main.zir
zapc main.zp -emit-llvm -o main.ll
```

These forms are useful when reporting a compiler bug. Include the smallest
source file that reproduces the problem, the exact command, the compiler
version from `zapc --version`, and the emitted diagnostic.

`--allow-unsafe` is deprecated. Unsafe language features are enabled without
that flag.
