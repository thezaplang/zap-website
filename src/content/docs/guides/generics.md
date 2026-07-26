---
title: Generics
description: Write functions and types that are checked for each concrete type.
---

Generics let one declaration work with several types. Zap specializes generic
code at compile time.

## Generic functions

Declare type parameters after the function name:

```zap
fun identity<T>(value: T) T {
    return value;
}

fun main() Int {
    var number = identity(42);
    var text = identity("Zap");
    return number;
}
```

The compiler normally infers `T` from the arguments. You can also write an
explicit type argument:

```zap
var number = identity<Int>(42);
```

Use commas for multiple type parameters:

```zap
record Pair<A, B> {
    first: A,
    second: B,
}

var entry = Pair<String, Int> { first: "apples", second: 3 };
```

## Generic classes

```zap
class Box<T> {
    priv value: T;

    fun init(value: T) {
        self.value = value;
    }

    pub fun get() T {
        return self.value;
    }
}

fun main() Int {
    var box = new Box<String>("hello");
    println(box.get());
    return 0;
}
```

## Constraints

A `where` clause requires a type argument to inherit from a given class:

```zap
class Animal {
    pub fun sound() Int { return 0; }
}

class Dog : Animal {
    pub fun sound() Int { return 1; }
}

fun speak<T>(value: T) Int where T: Animal {
    return value.sound();
}
```

The compiler rejects `speak(value)` when the type of `value` does not satisfy
the constraint.

## Compile-time type branches

Use `iftype` inside generic code when an implementation depends on the concrete
type:

```zap
fun kind<T>(value: T) String {
    iftype T == Int {
        return "integer";
    } else iftype T == Bool {
        return "boolean";
    } else {
        return "other";
    }
}
```

Only the selected branch is compiled for a specialization. Prefer ordinary
generic code when every type can share the same implementation.
