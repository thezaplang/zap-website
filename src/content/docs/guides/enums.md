---
title: Enums
description: Define a closed set of named values.
---

An enum defines a type with a fixed set of variants:

```zap
enum State {
    Pending,
    Running,
    Finished,
}

var state = State.Pending;
```

Variants are accessed through the enum type.

## Compare enum values

```zap
if state == State.Pending {
    state = State.Running;
}

if state != State.Finished {
    println("work remains");
}
```

## Explicit values

Variants may specify integer values:

```zap
enum ExitCode {
    Success = 0,
    InvalidInput = 2,
    Unavailable = 69,
}
```

Convert an enum value explicitly when an integer is required:

```zap
var code: Int = ExitCode.InvalidInput as Int;
```

## C-compatible enums

Use `@repr("C")` for an enum passed through a C ABI:

```zap
@repr("C")
enum Direction {
    Left,
    Right,
}
```

Match the values and representation expected by the C declaration.

Enum variants can also carry values. That separate feature is covered in
[Tagged unions](/guides/tagged_unions/). Error enums are covered in
[Error handling](/guides/error_handling/).
