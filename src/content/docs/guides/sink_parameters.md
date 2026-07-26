---
title: Sink parameters
description: Accept an owned value while preserving predictable call-site behavior.
---

A `sink` parameter accepts ownership of a managed value:

```zap
fun deliver(message: sink String) {
    println(message);
}
```

The call uses ordinary argument syntax:

```zap
deliver("temporary");
```

## Named variables remain usable

Passing a named variable has copy semantics. The caller may continue using it:

```zap
var saved = "keep me";
deliver(saved);
println(saved);
```

This behavior is part of the language contract. It does not change between
debug and optimized builds.

## Temporaries can transfer directly

A temporary has no later source-level use:

```zap
deliver("prefix:" + toString(42));
```

The compiler may transfer that value into the parameter instead of creating an
extra owned copy.

## Last-use optimization

The compiler may also optimize a proven final use of a local into a transfer,
provided the program behaves exactly as if an ordinary copy occurred.

Zap does not expose a public `move` expression. Callers do not need to reason
about whether optimization consumed a variable.

## When to use `sink`

Use `sink T` when the function stores an owned value or passes ownership deeper
into the program:

```zap
class Mailbox {
    priv latest: String;

    pub fun store(message: sink String) {
        self.latest = message;
    }
}
```

Use an ordinary parameter for a stable value copy. Use `ref` for in-place
mutation and `noescape StringView` for a borrow that cannot leave the call.
