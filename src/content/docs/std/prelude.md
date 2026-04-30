---
title: std/prelude
description: Symbols available in every Zap program without an explicit import.
---

`std/prelude` re-exports the most commonly used functions from the standard library. These symbols are available in every Zap program without any `import` statement.

## Automatically available symbols

The following functions work without any import:

```zap
// From std/io
println(s: String) Void
printInt(i: Int) Void
printFloat(f: Float) Void
printBool(b: Bool) Void
printChar(c: Char) Void
eprintln(s: String) Void
getLn() String
```

That's why simple programs like this work without any imports:

```zap
fun main() Int {
    println("Hello, Zap!");
    printInt(42);
    return 0;
}
```

## Importing prelude explicitly

You can also import `std/prelude` to get additional re-exported symbols:

```zap
import "std/prelude" { println, printInt, cwd, join, toString };

fun main() Int {
    println(cwd());
    println(join("/tmp", "output.txt"));
    println(toString(42));
    printInt(42);
    return 0;
}
```

## Re-exported modules

`std/prelude` pulls in APIs from:

| Source module | What's re-exported |
|--------------|-------------------|
| `std/io` | `println`, `printInt`, `printFloat`, `printBool`, `printChar`, `eprintln`, `getLn` |
| `std/process` | `cwd`, `exit`, `argc`, `argv` |
| `std/path` | `join`, `basename`, `parent` |
| `std/string` | `len`, `fromChar`, `pushChar`, `eq` |
| `std/convert` | `toString`, `toInt`, `toFloat`, `toBool`, `toChar` |
| `std/error` | `Error`, `ErrorKind`, `Err`, `Kind` |
| `std/math` | `abs`, `min`, `max`, `sqrt`, `floor`, `ceil` |

## Example — using prelude functions

```zap
import "std/prelude" { println, printInt, toString, abs };

fun main() Int {
    var n: Int = -42;
    println("Absolute value of " ~ toString(n) ~ " is " ~ toString(abs(n)));
    printInt(abs(n));  // 42
    return 0;
}
```
