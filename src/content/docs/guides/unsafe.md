---
title: Unsafe code
description: Isolate raw pointer operations that the compiler cannot verify.
---

Safe Zap code uses managed values and checked language contracts. An `unsafe`
scope permits operations whose validity the compiler cannot prove.

Unsafe features are available by default. The old `--allow-unsafe` flag remains
accepted for compatibility but is deprecated.

## Unsafe blocks

```zap
fun main() Int {
    var value: Int = 41;

    unsafe {
        var pointer: *Int = &value;
        *pointer = *pointer + 1;
    }

    return value;
}
```

The block limits where raw pointer operations may appear.

## Unsafe functions

An `unsafe fun` may use unsafe operations throughout its body:

```zap
unsafe fun read(pointer: *Int) Int {
    return *pointer;
}
```

Calling it requires another unsafe scope:

```zap
unsafe {
    var value = 42;
    println(toString(read(&value)));
}
```

## Raw pointer types

| Syntax | Meaning |
| --- | --- |
| `*T` | Pointer to `T` |
| `*Void` | Untyped pointer |
| `&value` | Address of assignable storage |
| `*pointer` | Read or write the pointed value |
| `pointer + offset` | Pointer arithmetic in elements |

Raw pointers do not carry ownership, lifetime, or bounds information.

## Manual allocation

[`std/mem`](/std/mem/) exposes the C allocator:

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

Check allocations, stay within their bounds, and free each successful
allocation exactly once.

Keep unsafe scopes small and expose a safe interface only after the code has
established its pointer and lifetime invariants. Foreign declarations and ABI
layouts are covered in [C interop](/guides/c_interop/).
