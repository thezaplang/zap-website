---
title: While loops
description: Repeat a block while a Bool condition remains true.
---

`while` checks its condition before every iteration. If the condition is false
at the start, the body does not run.

## Count with a variable

```zap
var index: Int = 0;
while index < 4 {
    println(toString(index));
    index = index + 1;
}
```

Update the loop state inside the body. The condition is checked again after the
body finishes.

## Process until a condition changes

```zap
fun countdown(start: Int) {
    var remaining = start;
    while remaining > 0 {
        println(toString(remaining));
        remaining = remaining - 1;
    }
    println("done");
}
```

This form is useful when the next state comes from work performed during the
iteration rather than from a fixed numeric range.

## `break`

`break` leaves the nearest loop immediately:

```zap
var value: Int = 0;
while value < 100 {
    value = value + 1;
    if value * value > 50 {
        break;
    }
}

println(toString(value));
```

The statement after the loop runs after either the condition becomes false or
`break` is reached.

## `continue`

`continue` skips the rest of the current body and starts the next condition
check:

```zap
var value: Int = 0;
while value < 10 {
    value = value + 1;
    if value % 2 != 0 {
        continue;
    }
    println(toString(value));
}
```

When using `continue`, update any counter before the statement. Otherwise the
condition may never change and the loop will not terminate.

## Nested loops

`break` and `continue` affect the nearest enclosing loop:

```zap
var row: Int = 0;
while row < 3 {
    var column: Int = 0;
    while column < 3 {
        if row == 1 && column == 1 {
            break;
        }
        column = column + 1;
    }
    row = row + 1;
}
```

There is no label on this `break`; it only exits the inner loop.

## Avoid accidental infinite loops

Every terminating `while` needs a path that changes the condition:

```zap
var attempts: Int = 0;
while attempts < 3 {
    attempts = attempts + 1;
    println("trying");
}
```

Use [for](/guides/for/) when the iteration already has a counter or a
collection to traverse.
