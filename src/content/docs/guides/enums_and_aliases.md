---
title: Enums and Aliases
description: Define closed sets of values with enums, use @error enums for failable functions, and create type aliases in Zap.
---

## Enums

An enum defines a closed set of named variants. Use it when a value must be one of a known finite set of options:

```zap
enum Direction { North, South, East, West }

enum Color { Red, Green, Blue }

enum Size {
    Small,
    Medium,
    Large,
    ExtraLarge,
}
```

A trailing comma after the last variant is allowed.

---

## Accessing variants

Variants are accessed with `EnumName.Variant`:

```zap
fun main() Int {
    var dir: Direction = Direction.North;
    var c: Color = Color.Blue;
    return 0;
}
```

---

## Comparing enum values

Use `==` and `!=` to compare enum values:

```zap
import "std/io" { println };

enum Season { Spring, Summer, Autumn, Winter }

fun describe(s: Season) String {
    if s == Season.Summer { return "hot"; }
    if s == Season.Winter { return "cold"; }
    return "mild";
}

fun main() Int {
    var now: Season = Season.Summer;
    println(describe(now));  // "hot"

    if now != Season.Winter {
        println("not winter");
    }
    return 0;
}
```

---

## Enums in branching logic

A common pattern is using an enum to drive control flow:

```zap
import "std/io" { println };

enum DoorState { Open, Closed, Locked }

fun canEnter(state: DoorState) Bool {
    if state == DoorState.Open   { return true; }
    if state == DoorState.Closed { return false; }
    if state == DoorState.Locked { return false; }
    return false;
}

fun action(state: DoorState) String {
    if state == DoorState.Open   { return "walk in"; }
    if state == DoorState.Closed { return "push door"; }
    return "find key";
}

fun main() Int {
    var s: DoorState = DoorState.Locked;
    println(action(s));  // "find key"
    return 0;
}
```

---

## `@error` enums for failable functions

When an enum is used as the error type in a failable function, mark it with `@error`. This tells the compiler the enum represents failure cases:

```zap
@error
enum MathError {
    DivisionByZero,
    Overflow,
    Underflow,
}

@error
enum ParseError {
    InvalidFormat,
    OutOfRange,
    EmptyInput,
}
```

The `@error` attribute is required when the enum appears in a `ReturnType!ErrorEnum` signature.

→ See [Error Handling](/guides/error_handling/) for full failable function documentation.

---

## Type aliases (`alias`)

`alias` creates a new name for an existing type. It improves readability without creating a distinct type:

```zap
alias UserId = Int;
alias Score = Float;
alias Tag = String;
alias Matrix = [4][4]Float;
```

Aliases are fully interchangeable with their underlying type:

```zap
alias UserId = Int;
alias Username = String;

fun loadUser(id: UserId) Username {
    // UserId is Int, Username is String
    return "user_" ~ "42";
}

fun main() Int {
    var uid: UserId = 42;
    var name: Username = loadUser(uid);
    return 0;
}
```

Aliases are especially useful for domain modeling — `UserId` is more meaningful than `Int` in function signatures.

---

## Common Diagnostics

| Code | Meaning |
|------|---------|
| `S2001` | Undefined enum variant or enum type not found |
| `S2004` | Invalid comparison — operand types are incompatible |
