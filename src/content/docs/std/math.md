---
title: std/math
description: Small numeric helper library.
---

## API

```zap
pub fun abs(x: Int) Int;
pub fun min(a: Int, b: Int) Int;
pub fun max(a: Int, b: Int) Int;
pub fun sqrt(x: Float64) Float64;
pub fun floor(x: Float64) Float64;
pub fun ceil(x: Float64) Float64;
```

## Example

```zap
import "std/math";
import "std/io" { printInt };

fun main() Int {
    printInt(math.abs(-12));
    printInt(math.max(7, 11));
    return 0;
}
```
