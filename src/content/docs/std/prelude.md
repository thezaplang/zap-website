---
title: std/prelude
description: Names imported automatically into ordinary Zap programs.
---

Unless compilation uses `-noprelude`, Zap imports `std/prelude` automatically.
You can use its names without writing an import.

## Available names

| Area | Names |
| --- | --- |
| Core strings | `StringView`, `len`, `at`, `slice`, `eq`, `view`, `startsWith`, `indexOf` |
| Output | `print`, `println`, `eprintln` |
| String helpers | `stringLen`, `fromChar`, `pushChar`, `trim`, `splitOnce`, `SplitPair` |
| Conversion | `toString`, `toInt`, `toBool`, `parseInt`, `ParseIntError` |
| Collections | `List`, `HashMap` |
| String collections | `split`, `splitN`, `splitTrimmed`, `join` |

```zap
fun main() Int {
    var names = new List<String>();
    names.push("Ada");
    names.push("Grace");

    println("Count: " + toString(names.len()));
    return 0;
}
```

The prelude is deliberately smaller than the complete standard library. Import
modules such as `std/fs`, `std/path`, or `std/math` when their APIs are needed.
