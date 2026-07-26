---
title: For loops
description: Count iterations or visit every value in an array, slice, or collection.
---

Zap has two `for` forms: a C-style loop and a `for ... in` loop. Both use a
block and support `break` and `continue`.

## C-style `for`

A C-style loop contains an initialization, a Bool condition, and an update:

```zap
for var index: Int = 0; index < 5; index = index + 1 {
    println(toString(index));
}
```

The order is:

1. initialize `index`;
2. check the condition;
3. run the body;
4. run the update;
5. check the condition again.

The loop variable is scoped to the loop:

```zap
for var index: Int = 0; index < 3; index = index + 1 {
    println(toString(index));
}

// `index` is not available here.
```

## Choose the update explicitly

The update can move by more than one or count backwards:

```zap
for var even: Int = 0; even <= 10; even = even + 2 {
    println(toString(even));
}

for var countdown: Int = 3; countdown > 0; countdown = countdown - 1 {
    println(toString(countdown));
}
```

The compiler requires the update target to be the same variable introduced by
the loop initializer.

## Iterate over an array

Use `for value in values` when the index is not needed:

```zap
var ports: [3]Int = {80, 443, 8080};
for port in ports {
    println(toString(port));
}
```

The loop visits elements in index order and binds one value for each iteration.

## Iterate over a list

The same form works with `List<T>`:

```zap
var jobs = new List<String>();
jobs.push("compile");
jobs.push("test");

for job in jobs {
    println(job);
}
```

Use an indexed loop when you need to replace an element or compare its
position. See [`List`](/std/collection/) for collection operations.

## `break` and `continue`

```zap
for value in ports {
    if value == 443 {
        continue;
    }
    if value > 500 {
        break;
    }
    println(toString(value));
}
```

Both statements affect the nearest loop. `continue` proceeds to the next
element or update step; `break` leaves the loop.

## Choose between `while` and `for`

Use `for` when the counter or collection describes the iteration. Use
[`while`](/guides/while/) when the next iteration depends on state produced by
the body or by an external operation.
