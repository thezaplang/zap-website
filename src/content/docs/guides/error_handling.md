---
title: Error Handling
description: Use failable functions in Zap to handle failures explicitly with fail, ?, or, and or err — no exceptions needed.
---

Zap doesn't use exceptions. Instead, functions that can fail declare it explicitly in their return type. This makes error paths visible in the type system and forces callers to handle them.

## Failable functions

A failable function has a return type of `ReturnType!ErrorEnum`:

```zap
@error
enum MathError {
    DivisionByZero,
    Overflow,
}

fun divide(a: Int, b: Int) Int!MathError {
    if b == 0 {
        fail MathError.DivisionByZero;
    }
    return a / b;
}
```

- `@error` marks the enum as an error type (required for use in `!` signatures)
- `fail ErrorEnum.Variant;` signals failure and exits the function immediately
- `return value;` signals success

---

## Three ways to handle a failable call

### 1. Propagate with `?`

The `?` operator propagates the error up to the caller. The calling function must also be failable with a compatible error type:

```zap
fun safeDivide(a: Int, b: Int) Int!MathError {
    var result: Int = divide(a, b)?;  // propagates on failure
    return result * 2;
}
```

Use `?` to build chains of failable operations without deeply nested error handling.

### 2. Fallback value with `or`

Provide a default value to use when the call fails:

```zap
fun main() Int {
    var result: Int = divide(10, 0) or 0;   // 0 on failure
    var safe: Int   = divide(10, 2) or -1;  // 5 on success
    return 0;
}
```

The fallback value must have the same type as the success value.

### 3. Local handler with `or err`

Handle the error inline with access to the error value:

```zap
fun main() Int {
    var result: Int = divide(10, 0) or err {
        if err == MathError.DivisionByZero {
            return 1;  // early return from main
        }
        -1  // fallback value for other errors
    };
    return 0;
}
```

Inside `or err { ... }`, `err` holds the error enum value. The block must produce a value of the success type (or use `return`/`fail` to exit).

---

## Complete example — order processing pipeline

This example chains multiple failable functions and demonstrates all three handling patterns:

```zap
import "std/io" { println, printInt };

@error
enum DecodeError {
    InvalidPrefix,
    InvalidDigit,
    ValueTooSmall,
}

struct Order {
    region: Int,
    sequence: Int,
}

fun decodeRegion(prefix: Int) Int!DecodeError {
    if prefix == 10 || prefix == 20 || prefix == 30 {
        return prefix;
    }
    fail DecodeError.InvalidPrefix;
    return 0;
}

fun decodeSequence(raw: Int) Int!DecodeError {
    if raw < 0    { fail DecodeError.InvalidDigit; }
    if raw < 1000 { fail DecodeError.ValueTooSmall; }
    return raw;
}

// Chain with ? — propagates any error from inner calls
fun decodeOrder(prefix: Int, seq: Int) Order!DecodeError {
    var region: Int   = decodeRegion(prefix)?;
    var sequence: Int = decodeSequence(seq)?;
    return Order{ region: region, sequence: sequence };
}

fun main() Int {
    // Pattern 1: ? (propagation) — used inside decodeOrder above

    // Pattern 2: or (fallback value)
    var ok: Order = decodeOrder(20, 12345) or Order{ region: 0, sequence: 0 };
    var fb: Order = decodeOrder(99, 7777)  or Order{ region: -1, sequence: -1 };

    // Pattern 3: or err (local handler)
    var handled: Order = decodeOrder(10, 12) or err {
        if err == DecodeError.ValueTooSmall {
            Order{ region: 10, sequence: 1000 }
        } else {
            Order{ region: -1, sequence: -1 }
        }
    };

    println("region:");
    printInt(ok.region);       // 20
    println("fallback region:");
    printInt(fb.region);       // -1
    println("handled sequence:");
    printInt(handled.sequence); // 1000

    return 0;
}
```

---

## Minimal example

```zap
@error
enum TinyError { TooSmall }

fun ensureMin(value: Int) Int!TinyError {
    if value < 10 { fail TinyError.TooSmall; }
    return value;
}

fun main() Int {
    var ok: Int = ensureMin(12) or 0;   // 12
    var fb: Int = ensureMin(3)  or 99;  // 99 (fallback)

    return 0;
}
```

---

## Choosing the right pattern

| Pattern | When to use |
|---------|-------------|
| `?` | You want to propagate the error to the caller |
| `or value` | You have a sensible default and don't need to inspect the error |
| `or err { }` | You need to inspect the error type and handle different cases |

---

## Common Diagnostics

| Code | Meaning |
|------|---------|
| `S2001` | Undefined error enum variant |
| `S2002` | Type mismatch — fallback value type doesn't match success type |
