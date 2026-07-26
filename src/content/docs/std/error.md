---
title: std/error
description: A general structured error value for APIs that need a message and numeric code.
---

`std/error` defines data types. It does not replace the `T!E` failure syntax or
require application-specific errors to use this representation.

```zap
import "std/error" as error;

var problem = error.Error {
    kind: error.ErrorKind.NotFound,
    code: 2,
    message: "configuration not found",
};
```

## Types

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
```

`Err` aliases `Error`, and `Kind` aliases `ErrorKind`.

For failures in your own API, choose an `@error enum`, `@error struct`, or
`@error class` according to the data and behavior callers need. See
[Error handling](/guides/error_handling/).
