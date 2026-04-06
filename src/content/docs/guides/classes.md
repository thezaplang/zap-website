---
title: Classes
description: Heap-only classes, methods, visibility, inheritance, and dynamic dispatch.
---

Zap supports heap-only `class` types allocated with `new`.

## Defining a class

```zap
class Counter {
    priv value: Int;

    fun init(value: Int) {
        self.value = value;
    }

    pub fun inc(step: Int) Int {
        self.value = self.value + step;
        return self.value;
    }
}
```

## Creating instances

```zap
var counter: Counter = new Counter(10);
```

`init(...)` acts as the initializer. `self` is available inside instance methods.

## Visibility

Visibility modifiers:

- `pub`
- `priv`
- `prot`

## Inheritance and dynamic dispatch

Single inheritance is supported:

```zap
class Base {
    pub fun value() Int {
        return 1;
    }
}

class Derived : Base {
    pub fun value() Int {
        return 2;
    }
}
```

Methods dispatch dynamically through the base type.

## Another example

```zap
class Task {
    prot done: Bool;

    fun init() {
        self.done = false;
    }

    pub fun finish() {
        self.done = true;
    }
}
```

## Lifecycle hooks

Classes can define:

- `init(...)` for initialization
- `deinit()` for cleanup on final release

Weak references and ARC details are covered in [ARC and weak refs](/guides/arc_and_weak_refs/).
