---
title: std/convert
description: Convert primitive values and parse signed decimal integers.
---

```zap
import "std/convert" as convert;
```

The module overloads conversion functions for their supported input types.

| Function | Accepted inputs |
| --- | --- |
| `toString(value) String` | String, Bool, Char, integer, and floating-point types |
| `toInt(value) Int` | Bool, Char, integer, and floating-point types |
| `toFloat(value) Float` | Bool, Char, integer, and floating-point types |
| `toFloat64(value) Float64` | Bool, Char, integer, and floating-point types |
| `toBool(value) Bool` | String, Char, Bool, integer, and floating-point types |
| `toChar(value) Char` | Char and Int |

Numeric conversions use the target type's normal conversion rules.
`toBool(String)` is true only for `"true"` and `"1"`.

## Parsing an integer

`parseInt(raw: String) Int!ParseIntError` accepts surrounding whitespace and an
optional `+` or `-` sign:

```zap
import "std/convert" as convert;

fun main() Int {
    var port = convert.parseInt("8080") or err {
        eprintln("invalid port");
        return 1;
    };
    return port;
}
```

`ParseIntError` has `Empty` and `InvalidDigit` variants.
