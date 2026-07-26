---
title: Ownership and ARC
description: Understand owned values, ARC releases, and cycle collection.
---

Safe Zap code does not manually free managed values. The compiler emits
ownership operations for strings, classes, and aggregates that contain them.

## Owned values

An owned value is responsible for keeping its managed storage alive:

```zap
var message = "ready";
var copy = message;
```

Ordinary assignment has logical copy semantics. Both variables remain valid:

```zap
message = "changed";
println(copy);
```

The compiler may remove an unnecessary physical copy when doing so does not
change source-level behavior.

## Class references

Classes are reference types managed by automatic reference counting:

```zap
class Session {
    pub name: String;

    fun init(name: String) {
        self.name = name;
    }
}

var first = new Session("build");
var second = first;
```

Both variables keep the same object alive.

## Deterministic release

When the final strong reference to an acyclic object is released, Zap runs its
`deinit` method and destroys the object:

```zap
class Handle {
    priv name: String;

    fun init(name: String) {
        self.name = name;
    }

    fun deinit() {
        println("closed " + self.name);
    }
}
```

This cleanup is deterministic for ordinary acyclic ownership.

## Strong cycles

Reference counts alone cannot reclaim a group of objects that only reference
each other. Zap records possible cycle roots during releases and examines them
at controlled safe points.

```zap
class Node {
    pub next: Node;
}

var first = new Node();
var second = new Node();
first.next = second;
second.next = first;
```

When the cycle becomes unreachable, the cycle collector can reclaim it. Do not
rely on the exact statement at which cycle destruction happens.

Use [weak references](/guides/weak_references/) when a relationship should not
keep its target alive. Function ownership contracts are covered separately in
[`sink` parameters](/guides/sink_parameters/) and
[borrowed string views](/guides/string_views/).
