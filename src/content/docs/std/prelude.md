---
title: std/prelude
description: Convenient public re-exports of common std APIs.
---

`std/prelude` re-exports common functions and types from multiple std modules.

## Re-exported modules

The prelude pulls in APIs from:

- `std/io`
- `std/string`
- `std/process`
- `std/fs`
- `std/path`
- `std/error`
- `std/math`
- `std/convert`

## Example signatures

`std/prelude` re-exports functions such as:

```zap
println(s: String) Void
printInt(i: Int) Void
cwd() String
join(a: String, b: String) String
toString(x: Int) String
```

## Example

```zap
import "std/prelude" { println, printInt, cwd, join };

fun main() Int {
    println(cwd());
    println(join("/tmp", "zap.txt"));
    printInt(42);
    return 0;
}
```
