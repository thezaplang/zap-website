---
title: References and Varargs
description: Passing values by reference and working with variadic parameters.
---

## `ref` parameters

Use `ref` to let a function modify a variable in place:

```zap
fun increment(ref x: Int) {
    x = x + 1;
}
```

## Swapping values

```zap
fun swap(ref x: Int, ref y: Int) {
    var tmp: Int = x;
    x = y;
    y = tmp;
}
```

## Example

```zap
fun main() Int {
    var a: Int = 10;
    var b: Int = 20;
    increment(ref a);
    swap(ref a, ref b);
    return a + b;
}
```

## Varargs

Variadic parameters use `...Type`:

```zap
fun sum(first: Int, rest: ...Int) Int {
    var total: Int = first;
    var i: Int = 0;
    while i < rest.len {
        total = total + rest[i];
        i = i + 1;
    }
    return total;
}
```

## Forwarding varargs

```zap
fun forward(rest: ...Int) Int {
    return sum(10, ...rest);
}
```
