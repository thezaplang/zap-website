---
title: Ref parameters
description: Borrow a caller variable for in-place mutation.
---

Place `ref` before a parameter to borrow the caller's variable for mutation:

```zap
fun increment(ref value: Int) {
    value = value + 1;
}
```

The call site also uses `ref`:

```zap
var count = 4;
increment(ref count);
println(toString(count));
```

This makes the in-place mutation visible when reading the call.

## Pass assignable storage

A `ref` argument must name storage that can be modified:

```zap
var score = 10;
increment(ref score);
```

A temporary expression cannot be passed by mutable reference.

## Swap values

```zap
fun swap(ref left: Int, ref right: Int) {
    var temporary = left;
    left = right;
    right = temporary;
}

fun main() Int {
    var first = 10;
    var second = 20;
    swap(ref first, ref second);
    return first;
}
```

## Current limitation

`ref T` is currently a parameter and return contract, not a general variable
or field type. A program cannot store an arbitrary reference for later use.

Use an ordinary parameter for a value copy, or a
[`sink` parameter](/guides/sink_parameters/) when a function accepts ownership.
