---
title: Primitive types
description: The built-in numeric, boolean, character, and void types in Zap.
---

Zap is statically typed. Every value has a type known during compilation.

## Integer types

| Signed | Unsigned |
| --- | --- |
| `Int8` | `UInt8` |
| `Int16` | `UInt16` |
| `Int32` | `UInt32` |
| `Int64` | `UInt64` |
| `Int` | `UInt` |

`Int` and `UInt` use the target's native pointer width. Use a fixed-width type
for binary formats, network protocols, and C interfaces:

```zap
var status: Int32 = 200;
var flags: UInt8 = 0x0F;
var total: Int = 42;
```

Integer literals support decimal, hexadecimal, binary, and octal notation:

```zap
var decimal = 42;
var hex = 0x2A;
var binary = 0b101010;
var octal = 0o52;
```

Underscores may separate digits for readability.

## Floating-point types

`Float32` and `Float64` have fixed widths. `Float` is the ordinary
floating-point type:

```zap
var progress: Float = 0.5;
var precise: Float64 = 3.1415926535;
```

## Bool

`Bool` has the values `true` and `false`:

```zap
var connected: Bool = true;

if connected {
    println("online");
}
```

Conditions require `Bool`. Integers and strings do not have implicit
truthiness.

## Char

`Char` stores a character value and uses single quotes:

```zap
var separator: Char = ':';
var newline: Char = '\n';
```

Strings use double quotes and have their own ownership rules. See
[Strings](/guides/strings/).

## Void

`Void` represents the absence of a value. A function returning `Void` normally
omits its return type:

```zap
fun announce() {
    println("ready");
}
```

## Conversions

Use `as` for an explicit language cast:

```zap
var narrow: Int32 = 42;
var native: Int = narrow as Int;
```

The prelude also provides functions such as `toString`, `toInt`, and `toBool`.
See [`std/convert`](/std/convert/) for their supported inputs.
