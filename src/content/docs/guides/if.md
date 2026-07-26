---
title: If expressions and statements
description: Branch on Bool values and produce a value from a conditional.
---

`if` evaluates a condition and selects one block. The condition must have type
`Bool`.

## Basic `if`

```zap
fun checkAccess(allowed: Bool) {
    if allowed {
        println("access granted");
    }
}
```

Parentheses around the condition are not required:

```zap
if count > 0 {
    println("items available");
}
```

The braces are required. Zap does not convert integers, strings, or pointers to
boolean values automatically.

## `else` and `else if`

```zap
fun label(score: Int) String {
    if score >= 90 {
        return "excellent";
    } else if score >= 60 {
        return "pass";
    } else {
        return "retry";
    }
}
```

Branches are checked in order. The first true condition runs, and the remaining
branches are skipped.

## Combine conditions

Use `&&`, `||`, and `!` to build boolean expressions:

```zap
if connected && authenticated {
    println("ready");
}

if !finished || retryable {
    println("run again");
}
```

The logical operators short-circuit. The right side of `&&` is evaluated only
when the left side is true. The right side of `||` is evaluated only when the
left side is false.

## Nested branches

```zap
fun describe(value: Int) String {
    if value >= 0 {
        if value == 0 {
            return "zero";
        }
        return "positive";
    }
    return "negative";
}
```

Prefer a guard clause with an early `return` when nesting would hide the main
path:

```zap
fun publish(connected: Bool, message: String) Int {
    if !connected {
        return 1;
    }
    if len(message) == 0 {
        return 2;
    }

    println(message);
    return 0;
}
```

## Conditional values

Zap supports the `?:` conditional expression when both branches produce
compatible values:

```zap
var access = authenticated ? "granted" : "denied";
var limit = enabled ? 100 : 0;
```

Use a statement when a branch performs several actions. Use the expression
form when the branch simply chooses a value.

## Scope and assignment

Each branch is a block. A variable declared in one branch is not available in
the other branch:

```zap
if ready {
    var message = "go";
    println(message);
}

// `message` is outside its scope here.
```

Declare a value before the branch when both paths must update it, and keep its
type explicit when the two branches produce different literals.
