---
title: std/mem
description: Allocate and release unmanaged memory through the C allocator.
---

`std/mem` exposes raw C allocation functions:

```zap
pub ext fun malloc(size: Int) *Void;
pub ext fun calloc(count: Int, size: Int) *Void;
pub ext fun realloc(pointer: *Void, size: Int) *Void;
pub ext fun free(pointer: *Void) Void;
```

These calls and all pointer access belong in an `unsafe` scope:

```zap
import "std/mem" as mem;

fun main() Int {
    unsafe {
        var raw = mem.malloc(sizeof(Int));
        if raw == null { return 1; }

        var value = raw as *Int;
        *value = 42;
        var result = *value;

        mem.free(raw);
        return result;
    }
}
```

Zap does not track the lifetime or size of memory returned here. Check for
`null`, stay within the allocation, and release each successful allocation
exactly once. Prefer managed Zap values outside FFI and low-level runtime code.

See [Unsafe code](/guides/unsafe/) for pointer rules and
[C interop](/guides/c_interop/) for foreign declarations.
