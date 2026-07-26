---
title: Function overloads
description: Use one function name with different parameter types.
---

Functions may share a name when their parameter types differ:

```zap
fun describe(value: Int) String {
    return "integer";
}

fun describe(value: String) String {
    return "text";
}
```

The compiler selects a matching declaration from the call arguments:

```zap
println(describe(42));
println(describe("Zap"));
```

## Multiple parameters

```zap
fun mix(left: Int, right: Float) Int {
    return 1;
}

fun mix(left: Float, right: Int) Int {
    return 2;
}
```

Both parameter order and types participate in overload resolution.

## Return types do not distinguish overloads

Two functions cannot differ only in return type:

```zap
// Does not compile:
// fun parse(text: String) Int { return 0; }
// fun parse(text: String) Float { return 0.0; }
```

The arguments must provide enough information to choose one declaration.

## Ambiguous calls

A call is rejected if more than one overload is an equally good match. Prefer
overload sets whose parameter types express a clear distinction.

[Named arguments](/guides/named_arguments/) can make a call easier to read and
may help identify the intended overload.
