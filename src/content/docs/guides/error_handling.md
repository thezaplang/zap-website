---
title: Error handling
description: Define failable functions and handle errors with fail, ?, or, and or err.
---

Zap represents expected failures in function signatures. A function returning
`T!E` either produces a `T` or fails with an error value of type `E`.

## Define an error type

Mark an `enum`, `struct`, or `class` with `@error`, then use that type after
`!` in the return type. Choose the representation that fits the error:

| Form | Use it for | Failure value |
| --- | --- | --- |
| `@error enum` | A small closed set of cases | `ErrorKind.InvalidInput` |
| `@error struct` | A value with several fields | `ValidationError { ... }` |
| `@error class` | A managed error with methods or identity | `new IoError(...)` |

### Enum errors

```zap
@error
enum CheckoutError {
    EmptyCart,
    NotEnoughStock,
}

fun reserveStock(available: Int, requested: Int) Int!CheckoutError {
    if requested == 0 {
        fail CheckoutError.EmptyCart;
    }
    if requested > available {
        fail CheckoutError.NotEnoughStock;
    }
    return available - requested;
}
```

`fail` ends the current function. A successful path returns the value before
the `!`.

### Struct errors

Use a struct when callers need data from the failure but the error does not need
class identity:

```zap
@error
struct ValidationError {
    field: String,
    message: String,
}

fun validateName(name: String) Void!ValidationError {
    if len(name) == 0 {
        fail ValidationError {
            field: "name",
            message: "name is required",
        };
        return;
    }
    return;
}
```

The `or err` block receives the complete struct value:

```zap
fun main() Int {
    validateName("") or err {
        eprintln(err.field + ": " + err.message);
        return 1;
    };
    return 0;
}
```

### Class errors

Use a class when the error has methods or needs a managed reference:

```zap
@error
class IoError {
    priv code: Int;

    fun init(code: Int) {
        self.code = code;
    }

    pub fun codeValue() Int {
        return self.code;
    }
}

fun openConfig(ok: Bool) String!IoError {
    if !ok {
        fail new IoError(2);
    }
    return "config loaded";
}
```

Handle a class error through its public methods:

```zap
fun main() String {
    var config = openConfig(false) or err {
        eprintln("open failed: " + toString(err.codeValue()));
        return "default";
    };
    return config;
}
```

The `@error` annotation is required for every type used as `E` in `T!E`.
An ordinary enum, struct, or class without that annotation is rejected by the
compiler.

## Propagate an error with `?`

Use `?` when the current function should return the same error to its caller:

```zap
fun checkout(available: Int, requested: Int) Int!CheckoutError {
    var remaining = reserveStock(available, requested)?;
    println("Order reserved.");
    return remaining;
}
```

The enclosing function must have a compatible failable return type.

## Supply a fallback with `or`

If a failure has a sensible default, place it after `or`:

```zap
var remaining = reserveStock(2, 5) or 0;
```

The fallback must have the successful return type.

## Handle the error locally

An `or err` block exposes the error value:

```zap
fun main() Int {
    var remaining = checkout(8, 3) or err {
        if err == CheckoutError.EmptyCart {
            eprintln("The cart is empty.");
        } else {
            eprintln("Not enough stock.");
        }
        return 1;
    };

    println("Items left: " + toString(remaining));
    return 0;
}
```

The block must either produce a fallback value or leave the enclosing function
with `return` or `fail`.

| Form | Use it when |
| --- | --- |
| `call()?` | The caller should handle the same error |
| `call() or value` | A default value is enough |
| `call() or err { ... }` | Handling depends on the error value |

Zap does not use exceptions for these failure paths. The error is visible both
at the function declaration and at the call site.
