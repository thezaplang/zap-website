---
title: Arrays
description: Fixed-size arrays, indexing, and nested arrays in Zap.
---

## Basic arrays

Arrays are fixed-size and zero-indexed:

```zap
var values: [4]Int = { 4, 8, 15, 16 };
```

## Declaring before filling

```zap
var simple: [5]Int;
```

## Indexing

```zap
fun main() Int {
    var values: [3]Int = { 10, 20, 30 };
    return values[1];
}
```

## Nested arrays

```zap
var grid: [2][2]Int = {
    { 1, 2 },
    { 3, 4 }
};
```

## Example

```zap
fun sum(values: [4]Int) Int {
    return values[0] + values[1] + values[2] + values[3];
}
```
