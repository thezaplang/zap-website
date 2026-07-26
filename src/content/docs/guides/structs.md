---
title: Structs
description: Define mutable value types with named fields.
---

A `struct` groups values under one type. Struct values are copied by value and
their fields may be changed.

## Define and construct a struct

```zap
struct Point {
    x: Int,
    y: Int,
}

var origin = Point { x: 0, y: 0 };
var cursor = Point { x: 12, y: 8 };
```

A field without a default must be supplied by the literal.

## Read and update fields

```zap
cursor.x = cursor.x + 1;
println(toString(cursor.x));
```

Changing a copied struct does not change the original:

```zap
var first = Point { x: 1, y: 2 };
var second = first;
second.x = 10;

println(toString(first.x));
println(toString(second.x));
```

## Default field values

```zap
struct RetryPolicy {
    attempts: Int = 3,
    delayMs: Int = 250,
}

var defaults = RetryPolicy {};
var patient = RetryPolicy { attempts: 5, delayMs: 1000 };
```

## Modify a struct through `ref`

Passing a struct normally copies it. Use a `ref` parameter for an intentional
in-place update:

```zap
struct Balance {
    available: Int,
    reserved: Int,
}

fun reserve(ref balance: Balance, amount: Int) {
    balance.available = balance.available - amount;
    balance.reserved = balance.reserved + amount;
}

fun main() Int {
    var balance = Balance { available: 100, reserved: 0 };
    reserve(ref balance, 25);
    return balance.available;
}
```

## Memory layout

Use `@repr("C")` when a struct crosses a C ABI boundary:

```zap
@repr("C")
struct Header {
    kind: UInt8,
    length: UInt32,
}
```

Use `@{packed}` when the representation must omit padding:

```zap
@{packed}
struct PackedHeader {
    kind: UInt8,
    length: UInt32,
}
```

Packed fields may be unaligned. These attributes should only be used when byte
layout is part of the contract.

Use a [record](/guides/records/) when fields must remain immutable after
construction.
