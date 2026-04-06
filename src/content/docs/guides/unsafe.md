---
title: Unsafe
description: Raw pointers, casts, and manual allocation behind explicit unsafe.
---

Zap keeps raw pointer work behind explicit `unsafe`.

## Compiler flag

Unsafe features must be enabled at compile time:

```bash
./zap/build/zapc --allow-unsafe program.zp
```

## Unsafe blocks

```zap
fun main() Int {
    var value: Int = 41;

    unsafe {
        var ptr: *Int = &value;
        *ptr = *ptr + 1;
    }

    return value;
}
```

## Unsafe functions

```zap
unsafe fun deref(ptr: *Int) Int {
    return *ptr;
}
```

## Pointer fields

```zap
struct Box {
    ptr: *Int
}
```

## Supported low-level operations

- address-of with `&value`
- raw pointer types like `*Int` and `*Void`
- dereference with `*ptr`
- pointer arithmetic such as `ptr + i`
- casts with `as`
- manual allocation through `std/mem`

## Allocation example

```zap
import "std/mem";

fun main() Int {
    unsafe {
        var ptr: *Int = mem.malloc(3 * 8) as *Int;
        if ptr == null {
            return 1;
        }

        *ptr = 10;
        *(ptr + 1) = 20;
        *(ptr + 2) = 30;

        mem.free(ptr as *Void);
        return 0;
    }
}
```

Use `unsafe` sparingly. The point is explicit escape hatches, not making the whole language unchecked by default.
