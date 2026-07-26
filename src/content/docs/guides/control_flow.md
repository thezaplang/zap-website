---
title: Control flow
description: Choose between conditions and the two loop forms used in Zap.
---

Zap keeps control flow explicit. Conditions always use `Bool`, blocks use
braces, and loops make their iteration rule visible.

## Conditions

Use [`if`](/guides/if/) when a branch depends on a boolean expression.

```zap
if ready {
    println("start");
} else {
    println("wait");
}
```

## Repetition

Use [`while`](/guides/while/) when a condition controls each iteration:

```zap
while remaining > 0 {
    remaining = remaining - 1;
}
```

Use [`for`](/guides/for/) for a counted loop or iteration over an array, slice,
or collection:

```zap
for var index: Int = 0; index < 3; index = index + 1 {
    println(toString(index));
}
```

`break` leaves the nearest loop and `continue` starts its next iteration.

## Block scope

Names declared inside a branch or loop are not visible after that block:

```zap
if enabled {
    var message = "on";
    println(message);
}

// `message` is not available here.
```

Start with [if](/guides/if/) when learning the individual forms.
