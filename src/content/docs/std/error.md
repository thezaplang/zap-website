---
title: std/error
description: Error data types used by higher-level APIs.
---

## API

```zap
pub enum ErrorKind {
    Unknown, NotFound, PermissionDenied, InvalidInput, AlreadyExists, Io
}

pub struct Error {
    kind: ErrorKind,
    code: Int,
    message: String,
}

pub alias Err = Error;
pub alias Kind = ErrorKind;
```

## Example

```zap
import "std/error" { Err, Kind };

fun main() Int {
    var err: Err = Err{
        kind: Kind.NotFound,
        code: 2,
        message: "file was not found",
    };

    if err.kind == Kind.NotFound {
        return 0;
    }
    return 1;
}
```
