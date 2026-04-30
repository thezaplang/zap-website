---
title: Structs and Records
description: Define named data types with fields using struct and record in Zap, including generic structs.
---

Zap provides two keywords for defining named aggregate types with fields: `struct` and `record`. They are functionally equivalent — use whichever fits your project's conventions.

## `struct`

```zap
struct Point {
    x: Float,
    y: Float,
}

struct Color {
    r: UInt8,
    g: UInt8,
    b: UInt8,
}
```

Fields are separated by commas. A trailing comma after the last field is allowed.

## `record`

```zap
record Person {
    name: String,
    age: Int,
    email: String,
}
```

`record` and `struct` are interchangeable syntax — pick one and be consistent.

---

## Creating instances (struct literals)

Use the type name followed by `{ field: value, ... }` to create an instance. All fields must be initialized:

```zap
fun main() Int {
    var p: Point = Point{ x: 3.0, y: 4.0 };
    var red: Color = Color{ r: 255, g: 0, b: 0 };
    var alice: Person = Person{ name: "Alice", age: 30, email: "alice@example.com" };
    return 0;
}
```

Omitting a field is a compile-time error. Field order in the literal doesn't need to match the declaration order.

---

## Field access

Use `.` to read or write fields:

```zap
import "std/io" { println, printInt };

struct Rectangle {
    width: Float,
    height: Float,
}

fun area(r: Rectangle) Float {
    return r.width * r.height;
}

fun perimeter(r: Rectangle) Float {
    return 2.0 * (r.width + r.height);
}

fun main() Int {
    var rect: Rectangle = Rectangle{ width: 10.0, height: 5.0 };

    // Read fields
    var w: Float = rect.width;   // 10.0

    // Modify fields
    rect.height = 8.0;

    return 0;
}
```

---

## Structs as function parameters and return values

Structs are passed by value (copied). Use `ref` if you need to modify the original:

```zap
import "std/io" { println };

struct Door {
    label: String,
    isOpen: Bool,
}

fun open(ref d: Door) {
    d.isOpen = true;
}

fun describe(d: Door) String {
    return d.label ~ ": " ~ (d.isOpen ? "open" : "closed");
}

fun makeDoor(label: String) Door {
    return Door{ label: label, isOpen: false };
}

fun main() Int {
    var front: Door = makeDoor("front");
    open(ref front);
    println(describe(front));  // "front: open"
    return 0;
}
```

---

## Generic structs

Structs can have type parameters. This lets you write reusable data containers:

```zap
struct Pair<A, B> {
    first: A,
    second: B,
}

struct Box<T> {
    value: T,
    label: String,
}

fun main() Int {
    var coords: Pair<Float, Float> = Pair<Float, Float>{ first: 1.0, second: 2.0 };
    var intBox: Box<Int> = Box<Int>{ value: 42, label: "answer" };
    var strBox: Box<String> = Box<String>{ value: "hello", label: "greeting" };

    var x: Float = coords.first;   // 1.0
    var n: Int = intBox.value;     // 42

    return 0;
}
```

→ See [Generics](/guides/generics/) for constraints and more advanced patterns.

---

## Combining structs and enums

A common pattern is using an enum to represent state inside a struct:

```zap
import "std/io" { println };

enum DoorState { Open, Closed, Locked }

struct Door {
    label: String,
    state: DoorState,
}

fun describe(door: Door) String {
    if door.state == DoorState.Open   { return door.label ~ ": open"; }
    if door.state == DoorState.Locked { return door.label ~ ": locked"; }
    return door.label ~ ": closed";
}

fun main() Int {
    var front: Door = Door{ label: "front", state: DoorState.Locked };
    var back: Door  = Door{ label: "back",  state: DoorState.Open };

    println(describe(front));  // "front: locked"
    println(describe(back));   // "back: open"
    return 0;
}
```

---

## Common Diagnostics

| Code | Meaning |
|------|---------|
| `S2001` | Undefined field name or struct type not found |
| `S2002` | Value assigned to field has wrong type |
