---
title: ARC and Weak Refs
description: ARC ownership, deterministic cleanup, and cycle-breaking with weak references.
---

## ARC

Class instances are heap allocated with `new` and managed with ARC.

```zap
global var destroyed: Int = 0;

class Buffer {
    fun deinit() {
        destroyed = destroyed + 1;
    }
}
```

## Deterministic cleanup

When the last strong reference disappears, `deinit()` can run immediately.

## Weak references

Use `weak` to avoid reference cycles:

```zap
class Parent {}

class Child {
    priv parent: weak Parent;

    pub fun setParent(parent: weak Parent) {
        self.parent = parent;
    }
}
```

## Checking liveness

Zap also supports:

- `alive(weakRef)`
- `lock(weakRef)`

## Example

```zap
class Parent {
    pub fun current() Int {
        return 7;
    }
}

class Child {
    priv parent: weak Parent;

    pub fun setParent(parent: weak Parent) {
        self.parent = parent;
    }

    pub fun readParent() Int {
        if !alive(self.parent) {
            return -1;
        }
        var parent: Parent = lock(self.parent);
        return parent.current();
    }
}
```
