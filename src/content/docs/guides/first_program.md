---
title: First Program
description: Compile and run your first Zap program.
---

Create a file called `hello.zp`:

```zap
import "std/io" { println };

fun main() Int {
    println("Hello, Zap!");
    return 0;
}
```

Compile it with the compiler built from `zap/`:

```bash
./zap/build/zapc hello.zp
```

By default, `zapc` builds an executable. On Unix-like systems, if you did not pass `-o`, the output is `a.out`:

```bash
./a.out
```

## Notes

- `main` usually returns `Int`.
- Statements end with `;`.
- Import functions from `std/io` for console output.
- If you use raw pointers or manual allocation later, compile with `--allow-unsafe`.
