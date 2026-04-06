---
title: Installing from Source
description: Build the Zap compiler from source and add zapc to your PATH.
---

## Requirements

Before building Zap, install:

- `clang` `21.1.8`
- `llvm` `21.1.8`
- `doxygen`
- `cmake` `20+`

## Clone and build

Clone the repository, enter the project directory, make the build script executable, and run it:

```bash
git clone https://github.com/thezaplang/zap.git
cd zap
chmod +x build.sh
./build.sh
```

## Compiler location

After a successful build, the compiler will be available at:

```bash
build/zapc
```

You can verify it with:

```bash
./build/zapc --version
./build/zapc --help
```

## Add `zapc` to PATH

### zsh

Add this line to `~/.zshrc`:

```bash
export PATH="$PATH:/absolute/path/to/zap/build"
```

Then reload your shell:

```bash
source ~/.zshrc
```

### bash

Add this line to `~/.bashrc`:

```bash
export PATH="$PATH:/absolute/path/to/zap/build"
```

Then reload your shell:

```bash
source ~/.bashrc
```

### fish

Add the path with:

```fish
fish_add_path /absolute/path/to/zap/build
```

Or make it universal:

```fish
set -Ux fish_user_paths /absolute/path/to/zap/build $fish_user_paths
```

## Example

If the repository is in `~/dev/zap`, then the compiler path is:

```bash
~/dev/zap/build/zapc
```

and the directory you add to `PATH` is:

```bash
~/dev/zap/build
```
