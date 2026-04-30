---
title: std/math
description: Numeric helper functions for absolute value, min, max, square root, floor, and ceiling in Zap.
---

`std/math` provides common numeric operations.

## API

```zap
pub fun abs(x: Int) Int;
pub fun min(a: Int, b: Int) Int;
pub fun max(a: Int, b: Int) Int;
pub fun sqrt(x: Float64) Float64;
pub fun floor(x: Float64) Float64;
pub fun ceil(x: Float64) Float64;
```

| Function | Description |
|----------|-------------|
| `abs(x)` | Absolute value of an integer |
| `min(a, b)` | Smaller of two integers |
| `max(a, b)` | Larger of two integers |
| `sqrt(x)` | Square root of a `Float64` |
| `floor(x)` | Round down to nearest integer (returns `Float64`) |
| `ceil(x)` | Round up to nearest integer (returns `Float64`) |

## Examples

### Integer operations

```zap
import "std/math";
import "std/io" { printInt };

fun main() Int {
    printInt(math.abs(-42));       // 42
    printInt(math.abs(7));         // 7
    printInt(math.min(3, 8));      // 3
    printInt(math.max(3, 8));      // 8
    printInt(math.max(-5, -10));   // -5
    return 0;
}
```

### Floating point operations

```zap
import "std/math";
import "std/io" { printFloat };

fun hypotenuse(a: Float64, b: Float64) Float64 {
    return math.sqrt(a * a + b * b);
}

fun main() Int {
    var h: Float64 = hypotenuse(3.0, 4.0);  // 5.0
    printFloat(h as Float);

    printFloat(math.floor(3.7) as Float);   // 3.0
    printFloat(math.ceil(3.2) as Float);    // 4.0
    return 0;
}
```
