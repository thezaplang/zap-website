---
title: Named arguments
description: Label call arguments and pass them in a different order.
---

Label an argument with the corresponding parameter name:

```zap
fun area(width: Int, height: Int) Int {
    return width * height;
}

var pixels = area(width = 1920, height = 1080);
```

## Reorder arguments

Named arguments may appear in a different order:

```zap
var pixels = area(height = 1080, width = 1920);
```

Each label must match a parameter, and a parameter cannot receive more than
one argument.

## Improve call-site meaning

```zap
fun retry(task: String, attempts: Int, delayMs: Int) {
    println(task);
}

retry(
    task = "upload",
    attempts = 3,
    delayMs = 500
);
```

Labels are useful when adjacent arguments have the same type or when a literal
would otherwise have unclear meaning.

## Overload resolution

Labels can identify parameters in an overload set:

```zap
fun mix(x: Int, y: Float) Int { return 1; }
fun mix(x: Float, y: Int) Int { return 2; }

var first = mix(y = 1.0, x = 2);
var second = mix(y = 3, x = 4.0);
```

The declared parameter names are therefore part of the function's source-level
calling interface.
