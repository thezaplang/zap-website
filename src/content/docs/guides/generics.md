---
title: Generics
description: Write reusable, type-safe code with generic functions, structs, classes, where constraints, and iftype in Zap.
---

Zap supports **static generics** — type parameters are resolved at compile time, so there's no runtime overhead and invalid specializations are caught early.

## Generic functions

Add type parameters after the function name with `<T>`:

```zap
fun identity<T>(value: T) T {
    return value;
}

fun first<T>(a: T, b: T) T {
    return a;
}

fun main() Int {
    var n: Int    = identity(42);       // T inferred as Int
    var s: String = identity("hello");  // T inferred as String
    var f: Int    = first(10, 20);      // 10

    // Explicit type argument when inference isn't enough:
    var x: Int = identity<Int>(99);

    return 0;
}
```

The compiler infers `T` from the call arguments in most cases.

---

## Multiple type parameters

```zap
fun zip<A, B>(a: A, b: B) A {
    return a;
}

fun swap<A, B>(a: A, b: B) B {
    return b;
}

fun main() Int {
    var r: Int    = zip(42, "hello");   // A=Int, B=String → 42
    var s: String = swap(42, "world");  // A=Int, B=String → "world"
    return 0;
}
```

---

## Generic structs and records

```zap
struct Box<T> {
    value: T,
    label: String,
}

record Pair<A, B> {
    first: A,
    second: B,
}

fun main() Int {
    var intBox: Box<Int>    = Box<Int>{ value: 42, label: "answer" };
    var strBox: Box<String> = Box<String>{ value: "hi", label: "greeting" };

    var coords: Pair<Float, Float> = Pair<Float, Float>{ first: 1.0, second: 2.0 };
    var mixed:  Pair<Int, String>  = Pair<Int, String>{ first: 1, second: "one" };

    var n: Int = intBox.value;      // 42
    var x: Float = coords.first;   // 1.0

    return 0;
}
```

You can write functions that work with generic types:

```zap
fun unwrap<T>(box: Box<T>) T {
    return box.value;
}

fun main() Int {
    var b: Box<Int> = Box<Int>{ value: 7, label: "lucky" };
    var v: Int = unwrap(b);  // 7
    return 0;
}
```

---

## Generic classes

```zap
class Stack<T> {
    priv items: [16]T;
    priv size: Int;

    fun init() {
        self.size = 0;
    }

    pub fun push(item: T) {
        self.items[self.size] = item;
        self.size = self.size + 1;
    }

    pub fun pop() T {
        self.size = self.size - 1;
        return self.items[self.size];
    }

    pub fun count() Int {
        return self.size;
    }
}

fun main() Int {
    var s: Stack<Int> = new Stack<Int>();
    s.push(10);
    s.push(20);
    s.push(30);

    var top: Int = s.pop();  // 30
    return s.count();        // 2
}
```

---

## `where` constraints

Use `where` to require that a type parameter satisfies an interface:

```zap
class Animal {
    pub fun sound() Int { return 0; }
}

class Dog : Animal {
    pub fun sound() Int { return 1; }
}

class Cat : Animal {
    pub fun sound() Int { return 2; }
}

fun makeNoise<T>(animal: T) Int where T: Animal {
    return animal.sound();
}

class Cage<T> where T: Animal {
    priv pet: T;

    fun init(pet: T) {
        self.pet = pet;
    }

    pub fun listen() Int {
        return self.pet.sound();
    }
}

fun main() Int {
    var dog: Dog = new Dog();
    var cat: Cat = new Cat();

    var d: Int = makeNoise(dog);  // 1
    var c: Int = makeNoise(cat);  // 2

    var cage: Cage<Dog> = new Cage<Dog>(new Dog());
    var sound: Int = cage.listen();  // 1

    return 0;
}
```

If the constraint isn't satisfied, the compiler emits `S2002` at the call site.

---

## `iftype` — compile-time type branching

Inside a generic function or method, `iftype` lets you branch on the concrete type:

```zap
fun describe<T>(value: T) String {
    iftype T == Int {
        return "integer";
    } else iftype T == Bool {
        return "boolean";
    } else iftype T == String {
        return "string";
    } else {
        return "unknown";
    }
}

fun main() Int {
    var a: String = describe(42);     // "integer"
    var b: String = describe(true);   // "boolean"
    var c: String = describe("hi");   // "string"
    return 0;
}
```

`iftype` is evaluated at compile time — only the matching branch is compiled for each specialization. This is useful for type-specific optimizations without runtime overhead.

---

## Common Diagnostics

| Code | Meaning |
|------|---------|
| `S2001` | Undefined generic type or type parameter |
| `S2002` | Type argument doesn't satisfy `where` constraint |
| `S2012` | No matching overload — generic function can't be instantiated with given types |
