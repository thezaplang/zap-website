---
title: Classes
description: Define heap-allocated objects with identity and methods.
---

Classes are reference types allocated with `new`:

```zap
class Counter {
    priv value: Int;

    fun init(value: Int) {
        self.value = value;
    }

    pub fun increment() Int {
        self.value = self.value + 1;
        return self.value;
    }
}

var counter = new Counter(0);
println(toString(counter.increment()));
```

`init` is the constructor. Instance methods receive `self` implicitly.

## Identity and shared state

Copying a class value copies the managed reference, not the object:

```zap
var first = new Counter(0);
var second = first;

second.increment();
println(toString(first.increment()));
```

Both variables refer to the same counter.

## Visibility

Class members are private unless marked otherwise:

| Modifier | Access |
| --- | --- |
| `priv` | The declaring class |
| `prot` | The declaring class and its subclasses |
| `pub` | Any caller that can access the class |

Keep mutable fields private when methods can enforce a useful invariant.

## Static methods

A static method belongs to the class and does not receive `self`:

```zap
class Ids {
    pub static fun first() Int {
        return 1;
    }
}

var id = Ids.first();
```

## Destruction

Define `deinit` for deterministic cleanup when an acyclic object's final strong
reference is released:

```zap
class FileLease {
    fun deinit() {
        println("lease released");
    }
}
```

The object itself remains managed by Zap. See
[Ownership and ARC](/guides/ownership/) for release and cycle
semantics.

Use a class for identity, shared mutable state, or polymorphic behavior. Use a
[record](/guides/records/) or [struct](/guides/structs/) for value
data.

Subclassing and dynamic dispatch are covered in [Inheritance](/guides/inheritance/).
