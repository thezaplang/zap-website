---
title: std/io
description: Console printing, formatted output, and reading input from stdin in Zap.
---

`std/io` provides functions for writing to stdout/stderr and reading from stdin.

Many of these functions are also available without an import via `std/prelude` — `println` and `printInt` work out of the box in most programs.

## API

```zap
pub ext fun println(s: String) Void;
pub ext fun printInt(i: Int) Void;
pub ext fun printFloat(f: Float) Void;
pub ext fun printFloat64(f: Float64) Void;
pub ext fun printBool(b: Bool) Void;
pub ext fun printChar(c: Char) Void;
pub ext fun eprintln(s: String) Void;
pub ext fun getLn() String;
pub ext fun printf(format: String, ...) Int;
pub ext fun printfln(format: String, ...) Int;
```

| Function | Description |
|----------|-------------|
| `println(s)` | Print a string followed by a newline |
| `printInt(i)` | Print an integer |
| `printFloat(f)` | Print a float |
| `printFloat64(f)` | Print a 64-bit float |
| `printBool(b)` | Print `true` or `false` |
| `printChar(c)` | Print a single character |
| `eprintln(s)` | Print to stderr followed by a newline |
| `getLn()` | Read a line from stdin (returns `String`) |
| `printf(fmt, ...)` | C-style formatted print (no newline) |
| `printfln(fmt, ...)` | C-style formatted print with newline |

## Examples

### Basic output

```zap
import "std/io" { println, printInt, printFloat, printBool, printChar };

fun main() Int {
    println("Hello, Zap!");
    printInt(42);
    printFloat(3.14);
    printBool(true);
    printChar('Z');
    return 0;
}
```

### Formatted output

```zap
import "std/io";

fun main() Int {
    io.printfln("Name: %s, Age: %d", "Alice", 30);
    io.printfln("Pi ≈ %.4f", 3.14159);
    io.printf("no newline here");
    io.println("");
    return 0;
}
```

### Reading input

```zap
import "std/io" { println, getLn };

fun main() Int {
    println("What's your name?");
    var name: String = getLn();
    println("Hello, " ~ name ~ "!");
    return 0;
}
```

### Writing to stderr

```zap
import "std/io" { eprintln, println };

fun main() Int {
    println("This goes to stdout");
    eprintln("This goes to stderr");
    return 0;
}
```
