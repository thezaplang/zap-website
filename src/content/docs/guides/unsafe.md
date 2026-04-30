---
title: Unsafe and FFI
description: Use raw pointers, manual memory allocation, and call C functions from Zap with unsafe blocks and ext declarations.
---

Zap's unsafe features let you work with raw pointers, manual memory, and C interop. They're opt-in — you must pass `--allow-unsafe` to the compiler and wrap operations in `unsafe` blocks.

## Enabling unsafe

```bash
zapc program.zp --allow-unsafe -o program
```

Without this flag, any use of unsafe features is a compile-time error.

---

## `unsafe` blocks and functions

Wrap unsafe operations in an `unsafe { ... }` block:

```zap
import "std/io" { printInt };

fun main() Int {
    var value: Int = 41;

    unsafe {
        var ptr: *Int = &value;   // address-of
        *ptr = *ptr + 1;          // dereference and write
        printInt(*ptr);           // 42
    }

    return 0;
}
```

Mark an entire function as unsafe with `unsafe fun`:

```zap
unsafe fun increment(ptr: *Int) {
    *ptr = *ptr + 1;
}
```

An `unsafe fun` can only be called from inside an `unsafe` block or another `unsafe fun`.

---

## Pointer types

| Syntax | Meaning |
|--------|---------|
| `*Type` | Pointer to `Type` |
| `*Void` | Untyped pointer (like `void*` in C) |
| `&expr` | Address-of — get a pointer to a variable |
| `*ptr` | Dereference — read or write through a pointer |
| `ptr + n` | Pointer arithmetic — advance by `n` elements |

```zap
import "std/io" { printInt };

unsafe fun sum(ptr: *Int, count: Int) Int {
    var total: Int = 0;
    var i: Int = 0;
    while i < count {
        total = total + *(ptr + i);
        i = i + 1;
    }
    return total;
}

fun main() Int {
    var nums: [3]Int = {10, 20, 30};
    unsafe {
        var ptr: *Int = &nums[0];
        printInt(sum(ptr, 3));  // 60
    }
    return 0;
}
```

---

## Casting between pointer types

Use `as` to cast between pointer types:

```zap
unsafe {
    var raw: *Void = mem.malloc(8);
    var typed: *Int = raw as *Int;
    *typed = 42;
    mem.free(raw);
}
```

Invalid casts (e.g., casting a non-pointer to a pointer) emit `S2006`.

---

## Manual memory with `std/mem`

`std/mem` provides C-style memory allocation:

```zap
import "std/io" { println, printInt };
import "std/mem";

fun main() Int {
    unsafe {
        // Allocate space for 3 Int values (8 bytes each)
        var ptr: *Int = mem.malloc(3 * 8) as *Int;

        if ptr == null {
            println("malloc failed");
            return 1;
        }

        // Write values
        *ptr       = 10;
        *(ptr + 1) = 20;
        *(ptr + 2) = 30;

        // Read back
        printInt(*ptr);           // 10
        printInt(*(ptr + 1));     // 20
        printInt(*(ptr + 2));     // 30

        // Free the memory
        mem.free(ptr as *Void);
        return 0;
    }

    return 1;
}
```

| Function | Description |
|----------|-------------|
| `mem.malloc(bytes)` | Allocate `bytes` bytes, returns `*Void` |
| `mem.calloc(n, size)` | Allocate `n` elements of `size` bytes, zero-initialized |
| `mem.realloc(ptr, bytes)` | Resize allocation |
| `mem.free(ptr)` | Free allocated memory |

Always free what you allocate. Forgetting to call `free` is a memory leak.

---

## FFI — calling C functions

### `ext fun` declarations

Declare external C functions with `ext fun`:

```zap
ext fun strlen(s: *Char) Int;
ext fun puts(s: *Char) Int;
```

Then call them like regular functions (inside `unsafe`):

```zap
import "std/io" { printInt };

ext fun strlen(s: *Char) Int;

fun main() Int {
    unsafe {
        var msg: *Char = "Hello" as *Char;
        var len: Int = strlen(msg);
        printInt(len);  // 5
    }
    return 0;
}
```

### `ext var` declarations

Declare external C global variables with `ext var`:

```zap
ext var errno: Int;
ext var optind: Int32;
```

Access them inside `unsafe` blocks.

---

## `@repr("C")` — C-compatible types

Mark a struct or enum with `@repr("C")` to ensure it has C-compatible memory layout. Required when passing structs to C functions:

```zap
import "std/io" { println, printInt };
import "std/mem";

@repr("C")
struct Point {
    x: Int32,
    y: Int32,
}

ext fun qsort(base: *Void, n: Int, size: Int, cmp: *fun(*Void, *Void) Int32);

fun comparePoints(a: *Void, b: *Void) Int32 {
    unsafe {
        var pa: *Point = a as *Point;
        var pb: *Point = b as *Point;
        if (*pa).x < (*pb).x { return -1; }
        if (*pa).x > (*pb).x { return 1; }
    }
    return 0;
}

fun main() Int {
    unsafe {
        var pts: *Point = mem.malloc(3 * 8) as *Point;
        (*pts).x = 30;
        (*(pts + 1)).x = 10;
        (*(pts + 2)).x = 20;

        qsort(pts as *Void, 3, 8, comparePoints);

        printInt((*pts).x);         // 10
        printInt((*(pts + 1)).x);   // 20
        printInt((*(pts + 2)).x);   // 30

        mem.free(pts as *Void);
    }
    return 0;
}
```

---

## Common Diagnostics

| Code | Meaning |
|------|---------|
| `S2006` | Invalid cast between incompatible types |
| `S2010` | Dereference of non-pointer type |
| `P1003` | Unexpected token in unsafe declaration |
