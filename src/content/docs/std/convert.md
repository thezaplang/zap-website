---
title: std/convert
description: Type conversion helpers for strings, ints, floats, bools, and chars.
---

## API

`std/convert` uses overloads, so each conversion exists in multiple typed forms. Common signatures include:

```zap
pub fun toString(x: String) String;
pub fun toString(x: Bool) String;
pub fun toString(x: Char) String;
pub fun toString(x: Int) String;
pub fun toString(x: UInt) String;
pub fun toString(x: Float) String;
pub fun toString(x: Float64) String;

pub fun toInt(x: Int) Int;
pub fun toInt(x: UInt) Int;
pub fun toInt(x: Float) Int;
pub fun toInt(x: Bool) Int;
pub fun toInt(x: Char) Int;

pub fun toFloat(x: Int) Float;
pub fun toFloat(x: UInt) Float;
pub fun toFloat(x: Float64) Float;
pub fun toFloat(x: Bool) Float;

pub fun toFloat64(x: Int) Float64;
pub fun toFloat64(x: UInt) Float64;
pub fun toFloat64(x: Float) Float64;
pub fun toFloat64(x: Bool) Float64;

pub fun toBool(x: Bool) Bool;
pub fun toBool(x: Int) Bool;
pub fun toBool(x: UInt) Bool;
pub fun toBool(x: Float) Bool;
pub fun toBool(x: Float64) Bool;
pub fun toBool(x: Char) Bool;
pub fun toBool(x: String) Bool;

pub fun toChar(x: Char) Char;
pub fun toChar(x: Int) Char;
```

## Example

```zap
import "std/convert";
import "std/io" { println, printInt };

fun main() Int {
    println(convert.toString(42));
    printInt(convert.toInt('A'));
    return 0;
}
```
