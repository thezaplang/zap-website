---
title: std/string
description: Work with owned strings, borrowed string views, and incremental text building.
---

`String` owns its storage. `StringView` borrows a range from a string. The
automatic prelude already provides `StringView`, `len`, `at`, `slice`, `eq`,
`view`, `startsWith`, and `indexOf`.

```zap
import "std/string" as string;

var source = "hello";
var tail: StringView = slice(source, 1, 4);
println(string.owned(tail));
```

Import the module for the remaining helpers:

```zap
import "std/string" as string;
```

## Functions

| Function | Result |
| --- | --- |
| `stringLen(s: String) Int` | Length of an owned string |
| `fromChar(c: Char) String` | One-character owned string |
| `pushChar(s: String, c: Char) String` | A new string with `c` appended |
| `owned(v: StringView) String` | Copies a view into an owned string |
| `trim(v: StringView) String` | Copies the view without surrounding ASCII whitespace |
| `splitOnce(v: StringView, delim: Char) SplitPair` | Splits at the first delimiter |

`SplitPair` contains `left`, `right`, and `found` fields.

## TextBuf

`TextBuf` collects text and returns `self` from `push` and `pushChar`:

```zap
import "std/string" as string;

fun greeting(name: String) String {
    var buffer = new string.TextBuf();
    buffer.push("Hello, ").push(name).pushChar('!');
    return buffer.build();
}
```

Methods: `clear()`, `len()`, `isEmpty()`, `push(text)`, `pushChar(c)`,
`build()`, and `view()`.
