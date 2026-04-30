---
title: Classes
description: Define heap-allocated types with methods, visibility, inheritance, and lifecycle hooks in Zap.
---

Classes in Zap are heap-allocated reference types managed by ARC (Automatic Reference Counting). They support methods, visibility modifiers, single inheritance, and lifecycle hooks.

## Basic class declaration

```zap
class Counter {
    priv value: Int;

    fun init(start: Int) {
        self.value = start;
    }

    pub fun increment() {
        self.value = self.value + 1;
    }

    pub fun get() Int {
        return self.value;
    }
}
```

- Fields are declared inside the class body with a type annotation.
- `self` refers to the current instance inside methods.
- `init(...)` is the constructor — called automatically by `new`.

---

## Creating instances with `new`

```zap
import "std/io" { printInt };

fun main() Int {
    var c: Counter = new Counter(0);
    c.increment();
    c.increment();
    printInt(c.get());  // 2
    return 0;
}
```

`new ClassName(args)` allocates the object on the heap and calls `init(args)`.

---

## Visibility modifiers

| Modifier | Accessible from |
|----------|----------------|
| `pub` | Anywhere |
| `priv` | Only inside the defining class |
| `prot` | Inside the class and its subclasses |

```zap
class BankAccount {
    priv balance: Int;
    prot ownerId: Int;
    pub accountNumber: String;

    fun init(number: String, owner: Int) {
        self.accountNumber = number;
        self.ownerId = owner;
        self.balance = 0;
    }

    pub fun deposit(amount: Int) {
        self.balance = self.balance + amount;
    }

    pub fun getBalance() Int {
        return self.balance;
    }
}
```

Accessing a `priv` member from outside the class is a compile-time error (`S2002`).

---

## Static methods

Static methods don't require an instance. Call them on the class name directly:

```zap
class MathUtils {
    pub static fun max(a: Int, b: Int) Int {
        return a > b ? a : b;
    }

    pub static fun clamp(value: Int, low: Int, high: Int) Int {
        if value < low { return low; }
        if value > high { return high; }
        return value;
    }
}

fun main() Int {
    var m: Int = MathUtils.max(10, 20);       // 20
    var c: Int = MathUtils.clamp(150, 0, 100); // 100
    return 0;
}
```

---

## Single inheritance

A class can inherit from one parent class using `:`. The child class inherits all `pub` and `prot` members and can override methods:

```zap
import "std/io" { printInt };

class Discount {
    pub fun apply(price: Int) Int {
        return price;
    }
}

class PercentDiscount : Discount {
    prot percent: Int;

    fun init(percent: Int) {
        self.percent = percent;
    }

    pub fun apply(price: Int) Int {
        return price - (price * self.percent) / 100;
    }
}

class FlatDiscount : Discount {
    prot amount: Int;

    fun init(amount: Int) {
        self.amount = amount;
    }

    pub fun apply(price: Int) Int {
        return price - self.amount;
    }
}

fun finalPrice(discount: Discount, basePrice: Int) Int {
    return discount.apply(basePrice);  // dynamic dispatch
}

fun main() Int {
    var weekend: Discount = new PercentDiscount(20);
    var coupon: Discount  = new FlatDiscount(35);

    printInt(finalPrice(weekend, 250));  // 200
    printInt(finalPrice(coupon, 250));   // 215
    return 0;
}
```

Method calls on a base-typed reference use dynamic dispatch — the correct overridden method is called at runtime.

---

## `deinit()` — destruction hook

`deinit()` is called automatically when the last strong reference to an object goes out of scope. Use it to release resources:

```zap
import "std/io" { printInt };

class Buffer {
    priv id: Int;

    fun init(id: Int) {
        self.id = id;
        printInt(100 + id);  // prints when created
    }

    fun deinit() {
        printInt(200 + self.id);  // prints when destroyed
    }

    pub fun value() Int {
        return self.id;
    }
}

fun main() Int {
    var buf: Buffer = new Buffer(1);  // prints 101
    var v: Int = buf.value();
    // buf goes out of scope here → deinit() called → prints 201
    return 0;
}
```

`deinit()` is deterministic — it runs exactly when the last reference is released, not at some later GC cycle.

→ See [ARC and Weak References](/guides/arc_and_weak_refs/) for the full memory model.

---

## Complete example

A task board with inheritance and polymorphic scoring:

```zap
import "std/io" { printInt };

class Task {
    prot estimate: Int;
    prot done: Bool;

    fun init(estimate: Int) {
        self.estimate = estimate;
        self.done = false;
    }

    pub fun finish() {
        self.done = true;
    }

    pub fun score() Int {
        if self.done { return self.estimate; }
        return 0;
    }
}

class BugfixTask : Task {
    fun init(estimate: Int) {
        self.estimate = estimate;
        self.done = false;
    }

    pub fun score() Int {
        if self.done { return self.estimate * 2; }
        return 0;
    }
}

class FeatureTask : Task {
    prot impact: Int;

    fun init(estimate: Int, impact: Int) {
        self.estimate = estimate;
        self.done = false;
        self.impact = impact;
    }

    pub fun score() Int {
        if self.done { return self.estimate + self.impact; }
        return 0;
    }
}

fun complete(task: Task) Int {
    task.finish();
    return task.score();
}

fun main() Int {
    var bug: Task     = new BugfixTask(5);
    var feature: Task = new FeatureTask(8, 13);

    printInt(complete(bug));      // 10 (5 * 2)
    printInt(complete(feature));  // 21 (8 + 13)
    return 0;
}
```

---

## Common Diagnostics

| Code | Meaning |
|------|---------|
| `S2001` | Undefined method or field |
| `S2002` | Access violation (private/protected member accessed from wrong scope) |
| `S2011` | Invalid weak reference usage |
