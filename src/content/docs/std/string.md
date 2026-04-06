---
title: std/string
description: String length, indexing, slicing, and comparisons.
---

## API

```zap
pub ext fun len(s: String) Int;
pub ext fun at(s: String, i: Int) Char;
pub ext fun slice(s: String, start: Int, len: Int) String;
pub ext fun eq(a: String, b: String) Bool;

pub fun stringLen(s: String) Int;
pub fun fromChar(c: Char) String;
pub fun pushChar(s: String, c: Char) String;
```

## Example

```zap
import "std/string";
import "std/io" { println, printInt };

fun main() Int {
    var name: String = "zap";
    printInt(string.len(name));
    println(string.fromChar(string.at(name, 0)));
    println(string.slice(name, 1, 2));
    return 0;
}
```
