---
title: Overloads and Named Args
description: Function overloads and named arguments in Zap.
---

## Overloads

Zap supports overloads with different parameter types:

```zap
fun mix(x: Int, y: Float) Int {
    return 1;
}

fun mix(x: Float, y: Int) Int {
    return 2;
}
```

## Named arguments

Named arguments can improve readability and help overload resolution:

```zap
fun main() Int {
    if mix(y = 1.0, x = 2) != 1 {
        return 1;
    }
    if mix(y = 3, x = 4.0) != 2 {
        return 2;
    }
    return 0;
}
```

## Example with labels

```zap
fun build(width: Int, height: Int) Int {
    return width * height;
}

fun main() Int {
    return build(height = 9, width = 16);
}
```
