---
title: C interop
description: Declare C functions, share ABI-compatible structs, and export callbacks.
---

Zap can call C libraries without rewriting them. The boundary must describe the
C ABI exactly.

## External functions

Declare a function supplied by C with `ext fun`:

```zap
ext fun qsort(
    base: *Void,
    count: Int,
    elementSize: Int,
    compare: *fun(*Void, *Void) Int32
) Void;
```

Calling functions that use raw pointers belongs in `unsafe`.

## C-compatible structs

Use `@repr("C")` for a struct crossing the boundary:

```zap
@repr("C")
struct LegacyJob {
    id: Int32,
    priority: Int32,
}
```

The field types and order must match the C declaration.

## Export a Zap callback

Use `@extern("C")` when C code will call a Zap function:

```zap
@extern("C")
fun compareJobs(left: *Void, right: *Void) Int32 {
    unsafe {
        var a: LegacyJob = *(left as *LegacyJob);
        var b: LegacyJob = *(right as *LegacyJob);

        if a.priority < b.priority { return -1; }
        if a.priority > b.priority { return 1; }
    }
    return 0;
}
```

The function pointer type in Zap must match the callback type expected by C.

## Call the library

```zap
fun sortJobs(ref jobs: [3]LegacyJob) {
    unsafe {
        var compare: *fun(*Void, *Void) Int32 = compareJobs;
        qsort(&jobs[0] as *Void, 3, sizeof(LegacyJob), compare);
    }
}
```

## External variables and varargs

Declare a C global with `ext var`:

```zap
ext var errno: Int;
```

Declare a C variadic function with an untyped trailing `...`:

```zap
ext fun printf(format: String, ...) Int;
```

The compiler cannot validate C format strings or variadic argument
representations.

## Linking

Keep libraries and search paths in `thor.toml`:

```toml
flags = "-L ./vendor/lib -l legacy"
```

Then build normally with `thor build`. Use `-l name` for a library and `-L
path` for a library directory. Keep C details behind a small Zap module so the
rest of the program can use ordinary safe types.
