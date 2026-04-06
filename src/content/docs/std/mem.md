---
title: std/mem
description: Manual allocation helpers for unsafe code.
---

`std/mem` is intended for explicit low-level work inside `unsafe`.

## API

```zap
pub ext fun malloc(size: Int) *Void;
pub ext fun calloc(count: Int, size: Int) *Void;
pub ext fun realloc(ptr: *Void, size: Int) *Void;
pub ext fun free(ptr: *Void) Void;
```

## Example

```zap
import "std/mem";

fun main() Int {
    unsafe {
        var ptr: *Int = mem.malloc(2 * 8) as *Int;
        if ptr == null {
            return 1;
        }

        *ptr = 5;
        *(ptr + 1) = 7;
        mem.free(ptr as *Void);
        return 0;
    }
}
```
