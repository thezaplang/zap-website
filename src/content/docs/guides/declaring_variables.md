---
title: Variables and Types
description: Declare variables, learn all primitive types, use constants, globals, and type aliases in Zap.
---

Zap is statically typed. Every variable has a type known at compile time, and type annotations are written after `:`. There is no type inference for variable declarations — the type must be explicit.

## Variables (`var`)

Declare a variable with `var`, a name, a type, and an optional initializer:

```zap
var x: Int = 10;
var name: String = "Zap";
var ready: Bool = true;
```

You can declare a variable without initializing it and assign it later:

```zap
var result: Int;
result = 42;
```

Variables can be reassigned as long as the new value is type-compatible:

```zap
var count: Int = 0;
count = count + 1;   // OK
// count = "hello"; // error S2002: type mismatch
```

All statements end with `;`.

## Primitive types

Zap has the following built-in scalar types:

| Category | Types |
|----------|-------|
| Signed integers | `Int`, `Int8`, `Int16`, `Int32`, `Int64` |
| Unsigned integers | `UInt`, `UInt8`, `UInt16`, `UInt32`, `UInt64` |
| Floating point | `Float`, `Float32`, `Float64` |
| Boolean | `Bool` |
| Character | `Char` |
| Text | `String` |
| No value | `Void` |

`Int` is the default integer type (platform-width signed integer). `Float` is a 64-bit float. `Void` is used as a function return type when the function returns nothing.

```zap
var age: Int = 25;
var score: Float = 9.8;
var active: Bool = false;
var grade: Char = 'A';
var label: String = "hello";
var small: Int8 = 127;
var big: UInt64 = 18446744073709551615;
```

### Char literals

`Char` values use single quotes:

```zap
var c: Char = 'z';
var newline: Char = '\n';
var tab: Char = '\t';
```

### String concatenation

Use `~` to concatenate strings:

```zap
var first: String = "Hello";
var second: String = ", Zap!";
var greeting: String = first ~ second;
```

---

## Constants (`const`)

Constants are declared with `const`. They must be initialized at the point of declaration and cannot be reassigned:

```zap
const PI: Float = 3.14159;
const APP_NAME: String = "Zap Demo";
const MAX_RETRIES: Int = 5;
```

Constants can be declared at the top level (module scope) or inside a function:

```zap
fun computeCircle(radius: Float) Float {
    const TWO_PI: Float = 6.28318;
    return TWO_PI * radius;
}
```

Attempting to reassign a constant is a compile-time error:

```zap
const LIMIT: Int = 100;
// LIMIT = 200; // error S2002: cannot assign to constant
```

---

## Global variables (`global var`)

Module-level mutable state uses `global var`. Globals are accessible from any function in the same module:

```zap
global var requestCount: Int = 0;
global var lastError: String = "";

fun recordRequest() {
    requestCount = requestCount + 1;
}

fun recordError(msg: String) {
    lastError = msg;
    requestCount = requestCount + 1;
}

fun main() Int {
    recordRequest();
    recordRequest();
    recordError("timeout");
    return requestCount;  // returns 3
}
```

Keep globals minimal — prefer passing state through function parameters when possible.

---

## Type aliases (`alias`)

`alias` creates a new name for an existing type. It improves readability without introducing a new type:

```zap
alias UserId = Int;
alias Score = Float;
alias Tag = String;

fun loadUser(id: UserId) UserId {
    return id;
}

fun main() Int {
    var uid: UserId = 42;
    var s: Score = 9.5;
    var t: Tag = "admin";
    return loadUser(uid);
}
```

Aliases are interchangeable with their underlying type — `UserId` and `Int` are the same type to the compiler.

---

## Pointer types

Zap supports raw pointer types (`*Type`) for low-level programming. Pointer operations require the `--allow-unsafe` compiler flag and must be inside an `unsafe` block.

```zap
// Pointer types look like: *Int, *String, *Void
// See the Unsafe guide for full details.
```

→ See [Unsafe and FFI](/guides/unsafe/) for pointer declarations, dereference, and arithmetic.

---

## Common Diagnostics

| Code | Meaning |
|------|---------|
| `P1001` | Missing `;` at end of statement |
| `S2001` | Undefined identifier — variable used before declaration |
| `S2002` | Type mismatch — assigned value doesn't match declared type |
