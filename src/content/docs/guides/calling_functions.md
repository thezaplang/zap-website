---
title: Functions
description: Function declarations, return types, and common calling patterns.
---

## Basic declaration

Functions use `fun`. The return type comes after the parameter list:

```zap
fun add(a: Int, b: Int) Int {
    return a + b;
}
```

## Void functions

If no value is returned, the return type can be omitted:

```zap
fun logName(name: String) {
    // ...
}
```

## Calling functions

```zap
var total: Int = add(10, 20);
```

## More examples

```zap
fun distance(x: Int, y: Int) Int {
    return x - y;
}
```

```zap
fun main() Int {
    var total: Int = add(4, 5);
    return distance(total, 3);
}
```

For overloads, named arguments, references, and varargs, continue with the next guides.
