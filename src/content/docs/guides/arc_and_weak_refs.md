---
title: ARC and Weak References
description: Understand Zap's ARC memory model, deterministic destruction, weak references, and cycle handling.
---

Zap uses **Automatic Reference Counting (ARC)** to manage the lifetime of class instances. Memory is freed deterministically — exactly when the last reference to an object goes away, not at some later GC cycle.

## How ARC works

Every class instance has an internal reference count:

- **Incremented** when you copy or store a reference
- **Decremented** when a reference goes out of scope or is overwritten
- **When the count reaches zero** — `deinit()` is called and memory is freed

```zap
import "std/io" { printInt };

class Buffer {
    priv id: Int;

    fun init(id: Int) {
        self.id = id;
        printInt(100 + id);   // printed when created
    }

    fun deinit() {
        printInt(200 + id);   // printed when destroyed
    }

    pub fun value() Int { return self.id; }
}

fun main() Int {
    var b: Buffer = new Buffer(1);  // prints 101
    var v: Int = b.value();
    // b goes out of scope → deinit() → prints 201
    return 0;
}
```

This is deterministic — you know exactly when cleanup happens.

---

## Nested objects and destruction order

When an object owns another object, the inner object is destroyed first:

```zap
import "std/io" { printInt };

class Worker {
    priv id: Int;

    fun init(id: Int) {
        self.id = id;
        printInt(100 + id);   // created
    }

    fun deinit() {
        printInt(200 + id);   // destroyed
    }
}

class Job {
    priv worker: Worker;
    priv id: Int;

    fun init(id: Int) {
        self.id = id;
        self.worker = new Worker(id + 10);
        printInt(300 + id);   // job created
    }

    fun deinit() {
        printInt(400 + id);   // job destroyed (worker destroyed after)
    }
}

fun main() Int {
    var job: Job = new Job(1);
    // Output: 111 (worker init), 301 (job init)
    // When job goes out of scope: 401 (job deinit), 211 (worker deinit)
    return 0;
}
```

---

## Strong reference cycles

Pure ARC has one weakness: if two objects hold strong references to each other, their counts never reach zero even when nothing else uses them:

```
A → B (strong)
B → A (strong)
// Neither A nor B is ever freed
```

Zap addresses this in two ways:

1. **`weak` references** — you explicitly mark non-owning links as `weak`
2. **Cycle Collector** — a background mechanism that detects and frees cycle-only objects even without `weak` (can be disabled if needed)

---

## Weak references

A `weak` reference does **not** keep the target alive. Use it for back-links, parent pointers, and observer registries:

```zap
class Parent {
    pub fun id() Int { return 7; }
}

class Child {
    priv parent: weak Parent;

    pub fun setParent(p: weak Parent) {
        self.parent = p;
    }

    pub fun readParent() Int {
        if !alive(self.parent) {
            return -1;  // parent was freed
        }
        var p: Parent = lock(self.parent);
        return p.id();  // 7
    }
}
```

### `alive(weakRef)` and `lock(weakRef)`

| Function | What it does |
|----------|-------------|
| `alive(ref)` | Returns `Bool` — `true` if the target is still alive |
| `lock(ref)` | Returns a strong reference to the target (only call after `alive` check) |

Always check `alive` before calling `lock`. Calling `lock` on a dead weak reference is undefined behavior.

---

## Parent/child pattern

The canonical use case for `weak` is a tree where children need to reference their parent:

```zap
class TreeNode {
    pub value: Int;
    pub children: [4]TreeNode;  // strong — parent owns children
    pub parent: weak TreeNode;  // weak — child doesn't own parent

    fun init(v: Int) {
        self.value = v;
    }

    pub fun parentValue() Int {
        if !alive(self.parent) { return -1; }
        var p: TreeNode = lock(self.parent);
        return p.value;
    }
}
```

If `parent` were a strong reference, parent and child would form a cycle and never be freed.

---

## Observer registry pattern

Another common use: an event system where listeners don't own the event source:

```zap
class EventSource {
    pub fun fire() { /* ... */ }
}

class Listener {
    priv source: weak EventSource;

    fun init(s: weak EventSource) {
        self.source = s;
    }

    pub fun handle() {
        if alive(self.source) {
            var s: EventSource = lock(self.source);
            s.fire();
        }
    }
}
```

The `EventSource` can be freed independently of any `Listener` objects.

---

## Ownership patterns summary

| Pattern | Use strong | Use weak |
|---------|-----------|---------|
| Parent owns children | ✓ children | — |
| Child back-link to parent | — | ✓ parent |
| Observer list | ✓ list entries | ✓ back-ref to source |
| Cache | ✓ primary owner | ✓ secondary refs |

---

## Common Diagnostics

| Code | Meaning |
|------|---------|
| `S2011` | Invalid weak reference usage (e.g., using weak ref without `alive`/`lock` check) |
