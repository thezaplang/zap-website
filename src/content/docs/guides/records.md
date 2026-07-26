---
title: Records
description: Define immutable value types for domain data and stable results.
---

A `record` is a value type whose fields cannot be changed after construction.
Records are useful for values that should be created complete and remain
stable.

## Define and construct a record

```zap
record User {
    id: Int,
    name: String,
}

var user = User { id: 42, name: "Ada" };
println(user.name);
```

Each required field must receive a value.

## Field immutability

Assigning to a record field is a compile-time error:

```zap
var user = User { id: 42, name: "Ada" };

// Does not compile:
// user.name = "Grace";
```

The binding itself may still be mutable. Replace the complete record when the
program needs a new value:

```zap
var user = User { id: 42, name: "Ada" };
user = User { id: user.id, name: "Grace" };
```

## Records are copied by value

```zap
record Coordinate {
    x: Int,
    y: Int,
}

var start = Coordinate { x: 2, y: 4 };
var end = start;
```

`start` and `end` are two record values. Managed fields such as `String` follow
their normal ownership-aware copy semantics.

## Default field values

```zap
record RequestOptions {
    retries: Int = 3,
    trace: Bool = false,
}

var defaults = RequestOptions {};
var traced = RequestOptions { retries: 3, trace: true };
```

## Shallow immutability

Record immutability applies to its fields. If a field stores a class reference,
the field cannot be redirected to another object, but that object may still
have mutable state:

```zap
class Counter {
    pub value: Int;

    fun init(value: Int) {
        self.value = value;
    }
}

record Snapshot {
    counter: Counter,
}

var snapshot = Snapshot { counter: new Counter(1) };
snapshot.counter.value = 2;
```

Use records for configuration, identifiers, parsed results, and other
value-shaped domain data. Use a [struct](/guides/structs/) for
mutable value data.
