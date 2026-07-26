---
title: Your First Program
description: Build a small Zap program with Thor and understand each part.
---

Create a project:

```bash
thor new hello
cd hello
```

Then replace `src/main.zp` with:

```zap
fun main() Int {
    println("Hello, Zap!");
    return 0;
}
```

Build and run it:

```bash
thor run
```

The program prints:

```text
Hello, Zap!
```

`main` is the executable entry point. Its `Int` result becomes the process exit
code. `println` is already in scope through the prelude.

Functions that do not return a value omit the return type:

```zap
fun announce(message: String) {
    println(message);
}

fun main() Int {
    announce("compiled and running");
    return 0;
}
```

Statements end with semicolons. Blocks use braces. Zap does not require a
package declaration for a single-file program. Thor reads the project's
`thor.toml`; its default entry point is `src/main.zp`.

Next, read [Variables](/guides/variables/).
