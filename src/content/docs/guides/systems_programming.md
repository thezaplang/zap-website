---
title: Systems programming
description: Use Zap for native systems code while keeping unsafe boundaries explicit.
---

Systems code sometimes needs pointers, platform APIs, or an existing C
library. Zap keeps those operations explicit so the safe part of the program
does not inherit their risk.

## Keep the unsafe boundary small

Use an `unsafe` block only where raw pointer work is required:

```zap
fun readFirst(values: *Int) Int {
    unsafe {
        return *values;
    }
}
```

The caller still gets an ordinary `Int`. Put pointer validation, layout rules,
and foreign data conversion close to this boundary.

## Link a C library through Thor

Describe native linker flags once in `thor.toml`:

```toml
flags = "-L ./vendor/lib -l legacy"
```

Then declare the C ABI precisely in Zap:

```zap
ext fun legacy_start(mode: Int32) Int32;

fun main() Int {
    unsafe {
        return legacy_start(1) as Int;
    }
}
```

Use `@repr("C")` for shared structs and `@extern("C")` for callbacks that C
will call. Field order, field types, and function signatures must match the C
declarations exactly.

## Choose the right layer

Most application code should use safe Zap types, normal error handling, and
the standard library. Reserve `unsafe`, raw pointers, and ABI declarations for
the narrow integration layer.

Continue with [Unsafe code](/guides/unsafe/) and [C interop](/guides/c_interop/)
for the full rules.

