---
title: Constants
description: Define named values that cannot be assigned again.
---

Use `const` for a value that must not be reassigned:

```zap
const APP_NAME: String = "Zap Demo";
const MAX_RETRIES: Int = 5;
```

A constant must be initialized in its declaration.

## Local constants

```zap
fun clampRetries(value: Int) Int {
    const LIMIT: Int = 5;

    if value > LIMIT {
        return LIMIT;
    }
    return value;
}
```

A local constant follows normal block scope.

## Constants in calculations

```zap
const HTTP_OK: Int = 200;
const HTTP_ERROR: Int = 500;

fun isSuccess(status: Int) Bool {
    return status >= HTTP_OK && status < HTTP_ERROR;
}
```

Use a constant when the name communicates meaning or when one value must be
shared consistently. Use a variable when the value changes during execution.

Mutable top-level state is documented separately in
[Global variables](/guides/global_variables/).
