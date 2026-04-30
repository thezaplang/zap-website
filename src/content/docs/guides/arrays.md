---
title: Arrays
description: Fixed-size arrays in Zap — declaration, initialization, indexing, nested arrays, and passing to functions.
---

Arrays in Zap are fixed-size and strongly typed. The size is part of the type — `[3]Int` and `[4]Int` are different types.

## Declaration and initialization

The type syntax is `[N]T` where `N` is the compile-time size and `T` is the element type:

```zap
fun main() Int {
    // Declare without initializer (elements are uninitialized)
    var scores: [5]Int;

    // Declare with an initializer literal
    var primes: [5]Int = {2, 3, 5, 7, 11};

    // Shorter arrays
    var flags: [3]Bool = {true, false, true};
    var letters: [4]Char = {'a', 'b', 'c', 'd'};

    return 0;
}
```

All elements in the initializer must have the same type. Mixing types is error `S2009`.

---

## Indexing

Arrays are zero-indexed. The index must be an integer type:

```zap
fun main() Int {
    var nums: [4]Int = {10, 20, 30, 40};

    var first: Int = nums[0];   // 10
    var last: Int = nums[3];    // 40

    // Modify an element
    nums[1] = 99;

    // Loop over all elements
    var i: Int = 0;
    var total: Int = 0;
    while i < 4 {
        total = total + nums[i];
        i = i + 1;
    }

    return total;  // 10 + 99 + 30 + 40 = 179
}
```

Using a non-integer index (e.g., `Bool` or `Float`) is error `S2008`. Indexing a non-array type is error `S2007`.

---

## Passing arrays to functions

Arrays are passed by value. The size must match the parameter type exactly:

```zap
import "std/io" { printInt };

fun sum(values: [4]Int) Int {
    var total: Int = 0;
    total = total + values[0];
    total = total + values[1];
    total = total + values[2];
    total = total + values[3];
    return total;
}

fun max(values: [4]Int) Int {
    var best: Int = values[0];
    var i: Int = 1;
    while i < 4 {
        if values[i] > best {
            best = values[i];
        }
        i = i + 1;
    }
    return best;
}

fun main() Int {
    var data: [4]Int = {4, 8, 15, 16};
    printInt(sum(data));   // 43
    printInt(max(data));   // 16
    return 0;
}
```

---

## Nested arrays (2D arrays)

Arrays can be nested to create multi-dimensional structures:

```zap
fun main() Int {
    // 3 rows × 4 columns of Int
    var grades: [3][4]Int = {
        {5, 4, 3, 5},
        {3, 3, 4, 2},
        {5, 5, 4, 4}
    };

    // Access element at row 1, column 2
    var val: Int = grades[1][2];  // 4

    // Compute row averages
    var rowAvg: [3]Int = {0, 0, 0};
    var i: Int = 0;
    while i < 3 {
        var rowSum: Int = 0;
        var j: Int = 0;
        while j < 4 {
            rowSum = rowSum + grades[i][j];
            j = j + 1;
        }
        rowAvg[i] = rowSum / 4;
        i = i + 1;
    }

    return 0;
}
```

The type `[3][4]Int` means "array of 3 elements, each of which is an array of 4 `Int`s".

---

## Common Diagnostics

| Code | Meaning |
|------|---------|
| `S2007` | Type does not support indexing (e.g., indexing an `Int`) |
| `S2008` | Array index must be an integer type |
| `S2009` | Array literal elements have mismatched types |
