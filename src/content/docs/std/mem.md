---
title: std/mem
description: Manual heap allocation with malloc, calloc, realloc, and free for unsafe Zap code.
---

`std/mem` provides C-style manual memory allocation. All functions must be called inside `unsafe` blocks, and the compiler requires `--allow-unsafe`.

→ See [Unsafe and FFI](/guides/unsafe/) for a full guide on pointer operations.

## API

```zap
pub ext fun malloc(size: Int) *Void;
pub ext fun calloc(count: Int, size: Int) *Void;
pub ext fun realloc(ptr: *Void, size: Int) *Void;
pub ext fun free(ptr: *Void) Void;
```

| Function | Description |
|----------|-------------|
| `malloc(size)` | Allocate `size` bytes, returns `*Void` (uninitialized) |
| `calloc(count, size)` | Allocate `count * size` bytes, zero-initialized |
| `realloc(ptr, size)` | Resize an existing allocation |
| `free(ptr)` | Free memory previously allocated by `malloc`/`calloc`/`realloc` |

Always check for `null` after allocation. Always `free` what you allocate.

## Examples

### Allocate, write, read, free

```zap
import "std/mem";
import "std/io" { printInt };

fun main() Int {
    unsafe {
        // Allocate space for 3 Int values (8 bytes each on 64-bit)
        var ptr: *Int = mem.malloc(3 * 8) as *Int;

        if ptr == null {
            return 1;  // allocation failed
        }

        *ptr       = 10;
        *(ptr + 1) = 20;
        *(ptr + 2) = 30;

        printInt(*ptr);           // 10
        printInt(*(ptr + 1));     // 20
        printInt(*(ptr + 2));     // 30

        mem.free(ptr as *Void);
        return 0;
    }

    return 1;
}
```

### calloc and realloc

```zap
import "std/mem";
import "std/io" { printInt };

fun main() Int {
    unsafe {
        // calloc: zero-initialized
        var raw: *Void = mem.calloc(2, 8);
        if raw == null { return 1; }

        var values: *Int = raw as *Int;
        *values       = 5;
        *(values + 1) = 7;

        // Grow the allocation
        raw = mem.realloc(raw, 4 * 8);
        if raw == null { return 2; }

        values = raw as *Int;
        *(values + 2) = 11;
        *(values + 3) = 13;

        // 5 + 7 + 11 + 13 = 36
        printInt(*values + *(values+1) + *(values+2) + *(values+3));

        mem.free(raw);
        return 0;
    }

    return 3;
}
```
