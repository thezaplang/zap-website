---
title: std/io
description: Write to standard output and error, read a line, or use C-style formatting.
---

```zap
import "std/io" as io;
```

## API

| Function | Result |
| --- | --- |
| `print(text: String)` | Writes text without a newline |
| `println(text: String)` | Writes text followed by a newline |
| `eprintln(text: String)` | Writes text and a newline to standard error |
| `printInt(value: Int)` | Writes an integer |
| `printFloat(value: Float)` | Writes a `Float` |
| `printFloat64(value: Float64)` | Writes a `Float64` |
| `printBool(value: Bool)` | Writes a boolean |
| `printChar(value: Char)` | Writes a character |
| `getln() String` | Reads one line from standard input |
| `printf(format: String, ...) Int` | C-style formatted output |
| `printfln(format: String, ...) Int` | Formatted output followed by a newline |

`print`, `println`, and `eprintln` are in the automatic prelude.

```zap
import "std/io" as io;

fun main() Int {
    io.print("Name: ");
    var name = io.getln();
    io.println("Hello, " + name);
    return 0;
}
```

The formatted functions follow the platform C runtime's format rules. The
compiler does not make a format string type-safe.
