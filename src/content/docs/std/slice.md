---
title: std/slice
description: Generic inspection and checked access helpers for slices.
---

```zap
import "std/slice" as slice;
```

| Function | Result |
| --- | --- |
| `isEmpty(values) Bool` | Whether the slice has no elements |
| `count(values) Int` | Slice length |
| `first(values) T` | First element |
| `last(values) T` | Last element |
| `at(values, index) T` | Element after an explicit bounds check |
| `setAt(values, index, value)` | Assignment after an explicit bounds check |
| `indexOf(values, needle) Int` | First index, or `-1` |
| `contains(values, needle) Bool` | Whether the value occurs |

```zap
fun total(values: []Int) Int {
    if slice.isEmpty(values) { return 0; }
    return slice.first(values) + slice.last(values);
}
```

`first`, `last`, `at`, and `setAt` call `panic` when their preconditions are
not met.
