---
title: Thor build tool
description: Build, run, and manage Zap projects with Thor.
---

Thor is Zap's project build tool. It keeps the compiler command, import maps,
native linker flags, and dependencies in one `thor.toml` file. Thor lives in
the [`tools/thor`](https://github.com/thezaplang/zap/tree/main/tools/thor)
submodule of the Zap repository, but it can also be installed as its own
project.

## Create a project

Create a scaffold and enter it:

```text
thor new hello
cd hello
thor run
```

The generated project has an entry file, a `thor.toml`, and a `build/`
directory for outputs. Thor uses the compiler's normal prelude, so common
standard-library names such as `List` are available without a long
`collection.List` spelling.

## Build and run

```text
thor build
thor run
```

Useful command-line overrides are:

```text
thor build --compiler /path/to/zapc
thor build -o build/custom-app
thor build -O2
thor build -- --emit-ir
```

The `--` marker passes the remaining flags directly to `zapc`. `thor run`
builds first and then executes the selected output.

## Configure a project

Here is a small configuration:

```toml
name = "hello"
version = "0.1.0"
out = "build/"
entry = "src/main.zp"
optimization = "O2"
flags = "-Lnative -lm"

[imports]
"@shared" = "../shared/src"

[dependencies]
"zap-toml" = { url = "https://github.com/thezaplang/zap-toml", version = "0.1.0", commit = "..." }
```

`entry` is the source file passed to the compiler. `out` selects the output
directory, `flags` adds compiler or linker flags, and `optimization` accepts
`O0` through `O3`. Entries in `[imports]` become compiler import-map flags.

Dependencies are restored under `vendor/<name>` and their own build metadata
is used when present. Thor does not copy Zap's standard library into each
project: it invokes the selected `zapc`, which resolves the standard library
from that compiler installation.

## Add a dependency

```text
thor add https://github.com/example/widget
thor build
```

`thor add` records the dependency in `thor.toml`. The next build restores and
builds it before compiling the project.

## Build Thor from source

The repository version is bootstrapped with the Zap compiler, then rebuilt by
Thor:

```text
git clone https://github.com/thezaplang/thor
cd thor
./build.sh
./build/thor build
```

`zapc` must be available in `PATH`. The bootstrap build also restores Thor's
pinned `zap-toml` dependency.
