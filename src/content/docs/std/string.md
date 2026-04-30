---
title: std/string
description: String length, character access, slicing, comparison, and building strings in Zap.
---

`std/string` provides functions for working with `String` values.

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

| Function | Description |
|----------|-------------|
| `len(s)` | Returns the number of characters in `s` |
| `at(s, i)` | Returns the character at index `i` (zero-based) |
| `slice(s, start, len)` | Returns a substring starting at `start` with length `len` |
| `eq(a, b)` | Returns `true` if `a` and `b` are equal |
| `fromChar(c)` | Converts a `Char` to a single-character `String` |
| `pushChar(s, c)` | Appends character `c` to string `s`, returns new string |

## Examples

### Basic string operations

```zap
import "std/string";
import "std/io" { println, printInt };

fun main() Int {
    var name: String = "Zap";

    printInt(string.len(name));                    // 3
    println(string.fromChar(string.at(name, 0)));  // "Z"
    println(string.slice(name, 1, 2));             // "ap"

    var same: Bool = string.eq("hello", "hello");  // true
    var diff: Bool = string.eq("hello", "world");  // false

    return 0;
}
```

### Building strings character by character

```zap
import "std/string";
import "std/io" { println };

fun reverse(s: String) String {
    var result: String = "";
    var i: Int = string.len(s) - 1;
    while i >= 0 {
        result = string.pushChar(result, string.at(s, i));
        i = i - 1;
    }
    return result;
}

fun main() Int {
    println(reverse("hello"));  // "olleh"
    println(reverse("Zap"));    // "paZ"
    return 0;
}
```
