---
title: std/convert
description: Type conversion functions between strings, integers, floats, booleans, and characters in Zap.
---

`std/convert` provides explicit type conversion functions. All conversions use overloaded function names — the compiler picks the right overload based on the argument type.

## API

```zap
// toString overloads
pub fun toString(x: String) String;
pub fun toString(x: Bool) String;
pub fun toString(x: Char) String;
pub fun toString(x: Int) String;
pub fun toString(x: UInt) String;
pub fun toString(x: Float) String;
pub fun toString(x: Float64) String;

// toInt overloads
pub fun toInt(x: Int) Int;
pub fun toInt(x: UInt) Int;
pub fun toInt(x: Float) Int;
pub fun toInt(x: Bool) Int;
pub fun toInt(x: Char) Int;

// toFloat overloads
pub fun toFloat(x: Int) Float;
pub fun toFloat(x: UInt) Float;
pub fun toFloat(x: Float64) Float;
pub fun toFloat(x: Bool) Float;

// toFloat64 overloads
pub fun toFloat64(x: Int) Float64;
pub fun toFloat64(x: UInt) Float64;
pub fun toFloat64(x: Float) Float64;
pub fun toFloat64(x: Bool) Float64;

// toBool overloads
pub fun toBool(x: Bool) Bool;
pub fun toBool(x: Int) Bool;
pub fun toBool(x: UInt) Bool;
pub fun toBool(x: Float) Bool;
pub fun toBool(x: Float64) Bool;
pub fun toBool(x: Char) Bool;
pub fun toBool(x: String) Bool;

// toChar overloads
pub fun toChar(x: Char) Char;
pub fun toChar(x: Int) Char;
```

## Examples

### Converting to string

```zap
import "std/convert";
import "std/io" { println };

fun main() Int {
    println(convert.toString(42));      // "42"
    println(convert.toString(3.14));    // "3.14"
    println(convert.toString(true));    // "true"
    println(convert.toString('A'));     // "A"
    return 0;
}
```

### Converting between numeric types

```zap
import "std/convert";
import "std/io" { printInt, printFloat };

fun main() Int {
    var f: Float = 3.99;
    var i: Int = convert.toInt(f);     // 3 (truncates)
    printInt(i);

    var n: Int = 65;
    var c: Char = convert.toChar(n);   // 'A'

    var charCode: Int = convert.toInt('Z');  // 90
    printInt(charCode);

    return 0;
}
```
