---
title: Install Zap
description: Install Zap with zapup, the Zap toolchain installer.
---

Install the latest Zap toolchain with zapup:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://zaplang.xyz/install.sh | sh
```

Check the compiler installation:

```bash
zapc --version
zapc --print-stdlib-path
```

The second command is useful when configuring an editor or diagnosing a custom
installation.

## Install Thor

Use Thor to create, build, and run Zap applications. Install it after `zapc`:

```bash
git clone https://github.com/thezaplang/thor
cd thor
./build.sh
sudo cp build/thor /usr/local/bin/thor
thor --version
```

Thor invokes the installed `zapc`; it does not keep a second copy of the Zap
standard library. See [Thor build tool](/guides/thor/) for project
configuration and dependencies.

## Build from source

A source build requires:

- a C++20 compiler
- LLVM development libraries
- CMake 3.20 or newer
- Git

Clone and build the repository:

```bash
git clone https://github.com/thezaplang/zap.git
cd zap
./build.sh
```

The compiler is written to `build/zapc`. Build Thor from the repository's
pinned submodule and use it for programs:

```bash
git submodule update --init tools/thor
cd tools/thor
PATH="../../build:$PATH" ./build.sh
./build/thor new hello
cd hello
../../build/thor run
```

For daily use, place both `build/zapc` and `tools/thor/build/thor` on your
`PATH`. `zapc` remains useful for editor configuration and low-level compiler
diagnostics; Thor is the normal application workflow.

## Verify a development build

Run both test suites before changing the compiler:

```bash
ctest --test-dir build --output-on-failure
./run_tests.py --zapc ./build/zapc
```

Continue with [Your first program](/guides/first_program/).
