---
title: Structs and Records
description: Structs are available today; records are planned but not implemented yet.
---

## Structs

Structs are useful for value data:

```zap
struct Vec2 {
    x: Int,
    y: Int,
}
```

Create a struct with a literal:

```zap
var point: Vec2 = Vec2{ x: 3, y: 4 };
```

## Records

`record` syntax exists in language examples and docs history, but it is not implemented yet. Use `struct` for this kind of data shape today.

```zap
record Person {
    name: String,
    age: Int,
    email: String
}
```

## Accessing fields

```zap
fun lengthSquared(v: Vec2) Int {
    return v.x * v.x + v.y * v.y;
}
```

## Example

```zap
struct Door {
    label: String,
    open: Bool,
}
```
