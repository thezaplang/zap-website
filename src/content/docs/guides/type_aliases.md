---
title: Type aliases
description: Give an existing type another name without creating a new type.
---

Use `alias` to introduce another name for a type:

```zap
alias UserId = Int;
alias DisplayName = String;
```

The alias can be used in declarations and function signatures:

```zap
fun loadUser(id: UserId) {
    println("Loading user " + toString(id));
}

var id: UserId = 42;
loadUser(id);
```

## Alias identity

An alias does not create a distinct type. The alias and its target remain
interchangeable:

```zap
alias Score = Int;

var score: Score = 10;
var number: Int = score;
```

Use an alias to improve vocabulary or shorten a long type name. Do not use one
when the compiler must prevent values from different domains from mixing.

## Public aliases

Export an alias from a module with `pub`:

```zap
pub alias RequestId = UInt64;
```

Callers can then import it like any other public declaration.
