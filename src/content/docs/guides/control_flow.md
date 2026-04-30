---
title: Control Flow
description: Conditionals, loops, break, continue, ternary expressions, and block scope in Zap.
---

Zap has explicit, predictable control flow. Conditions must always be `Bool` — integers and strings are never implicitly truthy or falsy.

## `if` / `else if` / `else`

```zap
fun classify(score: Int) String {
    if score >= 90 {
        return "A";
    } else if score >= 80 {
        return "B";
    } else if score >= 70 {
        return "C";
    } else {
        return "F";
    }
}

fun main() Int {
    var grade: String = classify(85);  // "B"
    return 0;
}
```

The condition must be of type `Bool`. Integers and strings are **not** implicitly truthy:

```zap
var n: Int = 1;
// if n { ... }        // error S2003: condition must be Bool
if n != 0 { ... }     // correct

var s: String = "ok";
// if s { ... }        // error S2003: condition must be Bool
if s == "ok" { ... }  // correct
```

---

## `while` loops

`while` repeats as long as the condition is `true`. Parentheses around the condition are optional:

```zap
fun countDown(from: Int) Int {
    var i: Int = from;
    while i > 0 {
        i = i - 1;
    }
    return i;
}

fun main() Int {
    // Both forms are valid:
    var a: Int = 0;
    while a < 5 {
        a = a + 1;
    }

    var b: Int = 0;
    while (b < 5) {
        b = b + 1;
    }

    return 0;
}
```

---

## `break` and `continue`

`break` exits the loop immediately. `continue` skips to the next iteration:

```zap
fun findFirst(target: Int) Int {
    var i: Int = 0;
    while i < 100 {
        if i == target {
            break;
        }
        i = i + 1;
    }
    return i;
}

fun sumOdds(limit: Int) Int {
    var total: Int = 0;
    var i: Int = 0;
    while i < limit {
        i = i + 1;
        if i == 0 || (i / 2) * 2 == i {
            continue;  // skip even numbers
        }
        total = total + i;
    }
    return total;
}
```

Using `break` or `continue` outside a loop is a semantic error (`S2005`).

---

## Ternary operator `?:`

The ternary expression evaluates to one of two values based on a condition:

```zap
fun main() Int {
    var score: Int = 75;
    var result: String = score >= 60 ? "pass" : "fail";

    var abs: Int = score < 0 ? -score : score;

    // Ternaries can be nested (use sparingly):
    var grade: String = score >= 90 ? "A" : score >= 70 ? "B" : "C";

    return 0;
}
```

Rules:
- The condition must be `Bool` (same as `if`)
- Both branches must have compatible types — you can't mix `Int` and `String`
- The result type is inferred from the branches

---

## Block scope

Every `{ ... }` block introduces a new scope. Variables declared inside a block are not visible outside it:

```zap
fun main() Int {
    var x: Int = 10;

    if x > 0 {
        var y: Int = x * 2;  // y is only visible here
        x = y;
    }

    // y is out of scope here — using it would be error S2001

    {
        var temp: Int = x + 1;  // temp lives only in this block
    }

    return x;
}
```

This applies to `if`, `else`, `while`, and standalone `{ }` blocks.

---

## Early returns

Functions can return from any branch:

```zap
fun sign(x: Int) Int {
    if x < 0 { return -1; }
    if x > 0 { return 1; }
    return 0;
}

fun safeDivide(a: Int, b: Int) Int {
    if b == 0 {
        return 0;
    }
    return a / b;
}
```

If a non-`Void` function doesn't return on all paths, the compiler emits warning `W1001`.

---

## Common Diagnostics

| Code | Meaning |
|------|---------|
| `S2003` | Condition is not `Bool` (in `if`, `while`, or ternary) |
| `S2005` | `break` or `continue` used outside a loop |
| `P1001` | Missing `;` at end of statement |
