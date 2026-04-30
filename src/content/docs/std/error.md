---
title: std/error
description: Structured error types used by higher-level standard library APIs in Zap.
---

`std/error` provides a structured `Error` type and `ErrorKind` enum used by standard library functions that can fail.

For failable functions in your own code, define your own `@error` enum — see [Error Handling](/guides/error_handling/).

## API

```zap
pub enum ErrorKind {
    Unknown,
    NotFound,
    PermissionDenied,
    InvalidInput,
    AlreadyExists,
    Io,
}

pub struct Error {
    kind: ErrorKind,
    code: Int,
    message: String,
}

pub alias Err = Error;
pub alias Kind = ErrorKind;
```

| Symbol | Description |
|--------|-------------|
| `ErrorKind` | Enum of common error categories |
| `Error` | Structured error with kind, numeric code, and message |
| `Err` | Alias for `Error` |
| `Kind` | Alias for `ErrorKind` |

## Examples

### Creating and inspecting errors

```zap
import "std/error" { Err, Kind };
import "std/io" { println };

fun main() Int {
    var err: Err = Err{
        kind: Kind.NotFound,
        code: 2,
        message: "file was not found",
    };

    if err.kind == Kind.NotFound {
        println("Error: " ~ err.message);
        return 0;
    }

    return 1;
}
```

### Handling different error kinds

```zap
import "std/error";
import "std/io" { println };

fun describeError(err: error.Error) String {
    if err.kind == error.ErrorKind.NotFound       { return "not found"; }
    if err.kind == error.ErrorKind.PermissionDenied { return "permission denied"; }
    if err.kind == error.ErrorKind.InvalidInput   { return "invalid input"; }
    if err.kind == error.ErrorKind.AlreadyExists  { return "already exists"; }
    if err.kind == error.ErrorKind.Io             { return "I/O error"; }
    return "unknown error";
}

fun main() Int {
    var e: error.Error = error.Error{
        kind: error.ErrorKind.PermissionDenied,
        code: 13,
        message: "access denied",
    };
    println(describeError(e));  // "permission denied"
    return 0;
}
```
