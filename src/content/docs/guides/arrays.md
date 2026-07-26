---
title: Arrays
description: Store a fixed number of values in contiguous array storage.
---

An array type contains its length and element type:

```zap
var ports: [3]Int = {80, 443, 8080};
```

`[3]Int` and `[4]Int` are different types. Every element must have a compatible
type.

## Read and write elements

Array indices start at zero:

```zap
var values: [3]Int = {10, 20, 30};
var first = values[0];
values[2] = 40;
```

An index must have an integer type.

## Declare before filling

```zap
var results: [3]Int;
results[0] = 12;
results[1] = 24;
results[2] = 48;
```

This form initializes the array with the element type's default value before
the assignments.

## Nested arrays

```zap
var grid: [2][3]Int = {
    {1, 2, 3},
    {4, 5, 6}
};

grid[1][0] = 9;
```

Read the type from left to right: `grid` contains two arrays, each containing
three integers.

## Iterate over an array

```zap
var values: [4]Int = {2, 4, 6, 8};
var total = 0;

for value in values {
    total = total + value;
}
```

Use a C-style loop when the index itself is needed:

```zap
for var index: Int = 0; index < 4; index = index + 1 {
    println(toString(values[index]));
}
```

## Arrays and slices

A fixed array owns its storage. A slice `[]T` is a view over a sequence and
carries a runtime length. Variadic parameters also appear as slices inside the
function.

[`std/slice`](/std/slice/) provides checked helpers such as `at`, `setAt`,
`first`, and `last`. For a collection whose size changes, use
[`List<T>`](/std/collection/).
