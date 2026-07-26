---
title: std/math
description: Basic integer helpers and Float64 square-root and rounding operations.
---

```zap
import "std/math" as math;
```

| Function | Result |
| --- | --- |
| `abs(x: Int) Int` | Absolute value |
| `min(a: Int, b: Int) Int` | Smaller argument |
| `max(a: Int, b: Int) Int` | Larger argument |
| `sqrt(x: Float64) Float64` | Square root |
| `floor(x: Float64) Float64` | Greatest integral value not greater than `x` |
| `ceil(x: Float64) Float64` | Smallest integral value not less than `x` |

```zap
import "std/math" as math;

fun hypotenuse(a: Float64, b: Float64) Float64 {
    return math.sqrt(a * a + b * b);
}
```
