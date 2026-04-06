---
title: std/io
description: Printing, input, and formatted output.
---

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

## Example

```zap
import "std/io";

fun main() Int {
    io.println("Hello");
    io.printInt(42);
    io.printfln("sum = %d", 7);
    return 0;
}
```
