---
title: Control Flow
description: If, while, break, continue, and ternary expressions in Zap.
---

## `if`

Zap supports regular conditional statements:

```zap
if age >= 18 {
    println("adult");
} else {
    println("minor");
}
```

`else if` chains are also supported.

## `while`

Parentheses around the condition are optional:

```zap
var i: Int = 0;
while i < 10 {
    i = i + 1;
}
```

This also works:

```zap
while (i < 10) {
    i = i + 1;
}
```

## `break` and `continue`

Loop control is supported and covered by the compiler tests:

```zap
while true {
    if shouldSkip {
        continue;
    }
    if shouldStop {
        break;
    }
}
```

## Ternary operator

Conditional expressions use `?:`:

```zap
var status: String = score >= 50 ? "pass" : "fail";
```

The condition must be `Bool`, and both branches must be type-compatible.
