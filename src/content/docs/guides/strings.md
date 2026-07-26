---
title: Strings
description: Create, combine, compare, and inspect owned String values.
---

`String` is Zap's owned text type. String literals use double quotes:

```zap
var language: String = "Zap";
var message = "Hello";
```

The automatic prelude provides the common string operations.

## Concatenation

The `+` operator creates a string from strings and characters:

```zap
var name = "Ada";
var greeting = "Hello, " + name + '!';
println(greeting);
```

Convert other values explicitly:

```zap
var count = 3;
println("Count: " + toString(count));
```

## Length and indexing

```zap
var word = "Zap";
var size = len(word);
var first = at(word, 0);
var alsoFirst = word[0];
```

Indices start at zero. An out-of-range string read returns `'\0'`.

## Comparison and search

```zap
if eq("zap", "zap") {
    println("equal");
}

if startsWith("zaplang", "zap") {
    println(toString(indexOf("zaplang", "lang")));
}
```

The normal comparison operators also work for strings:

```zap
var same = "left" == "left";
var ordered = "alpha" < "beta";
```

## StringView

`StringView` can inspect a substring without owning another allocation:

```zap
var source = "event:deploy";
var value: StringView = slice(source, 6, len(source) - 6);
println(value);
```

A view borrows its storage. Its lifetime and function contracts are covered in
[Borrowed string views](/guides/string_views/).

More helpers and `TextBuf` are documented in [`std/string`](/std/string/).
