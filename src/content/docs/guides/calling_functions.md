---
title: Functions
description: Declare and call functions in Zap — return types, ref parameters, overloads, named args, varargs, generics, and recursion.
---

Functions are declared with the `fun` keyword. The return type comes **after** the parameter list, not before the function name.

## Basic declaration

```zap
fun add(a: Int, b: Int) Int {
    return a + b;
}

fun main() Int {
    var result: Int = add(10, 20);
    return result;  // 30
}
```

## Void functions

If a function doesn't return a value, omit the return type (or write `Void` explicitly):

```zap
fun greet(name: String) {
    println("Hello, " ~ name ~ "!");
}

// Equivalent explicit form:
fun greet2(name: String) Void {
    println("Hello, " ~ name ~ "!");
}
```

For `Void` functions, `return;` is optional.

---

## `ref` parameters

By default, arguments are passed by value — the function gets a copy. Use `ref` when you want the function to modify the caller's variable directly.

The `ref` keyword must appear in **both** the declaration and the call site:

```zap
fun increment(ref x: Int) {
    x = x + 1;
}

fun swap(ref a: Int, ref b: Int) {
    var tmp: Int = a;
    a = b;
    b = tmp;
}

fun main() Int {
    var n: Int = 10;
    increment(ref n);
    // n is now 11

    var x: Int = 1;
    var y: Int = 2;
    swap(ref x, ref y);
    // x is 2, y is 1

    return n;
}
```

`ref` arguments must be assignable (l-values) — you can't pass a literal like `ref 42`.

---

## Function overloading

Multiple functions can share the same name as long as their parameter types differ. The compiler picks the best match:

```zap
fun describe(x: Int) String {
    return "integer";
}

fun describe(x: Float) String {
    return "float";
}

fun describe(x: Bool) String {
    return "boolean";
}

fun main() Int {
    var a: String = describe(42);       // "integer"
    var b: String = describe(3.14);     // "float"
    var c: String = describe(true);     // "boolean"
    return 0;
}
```

If two overloads are equally valid for a call, the compiler emits `S2013` (ambiguous overload). If no overload matches, it emits `S2012`.

---

## Named arguments

Pass arguments by name to improve readability or to reorder them:

```zap
fun clamp(value: Int, low: Int, high: Int) Int {
    if value < low { return low; }
    if value > high { return high; }
    return value;
}

fun main() Int {
    // Positional
    var a: Int = clamp(120, 0, 100);

    // Named — order doesn't matter
    var b: Int = clamp(value: 120, low: 0, high: 100);
    var c: Int = clamp(low: 0, high: 100, value: 50);

    return 0;
}
```

**Rule:** positional arguments cannot follow named arguments. `clamp(0, high: 100, 50)` is a parse error.

Named arguments also help resolve overloads when types alone are ambiguous:

```zap
fun mix(x: Int, y: Float) Int { return 1; }
fun mix(x: Float, y: Int) Int { return 2; }

fun main() Int {
    var r: Int = mix(y: 1.0, x: 2);   // picks first overload → 1
    return r;
}
```

---

## Variadic parameters (`...T`)

A variadic parameter accepts zero or more values of a given type. Access the pack with `.len` and integer indexing:

```zap
import "std/io";

fun sum(first: Int, rest: ...Int) Int {
    var total: Int = first;
    var i: Int = 0;
    while i < rest.len {
        total = total + rest[i];
        i = i + 1;
    }
    return total;
}

fun main() Int {
    io.printfln("sum(5, 1, 2, 3) = %d", sum(5, 1, 2, 3));  // 11
    io.printfln("sum(10) = %d", sum(10));                    // 10
    return 0;
}
```

You can forward a variadic pack to another function using `...pack`:

```zap
fun forward(rest: ...Int) Int {
    return sum(10, ...rest);
}
```

---

## Generic functions

Add type parameters after the function name with `<T>`. The compiler infers the type from the arguments in most cases:

```zap
fun identity<T>(x: T) T {
    return x;
}

fun first<T>(a: T, b: T) T {
    return a;
}

fun main() Int {
    var n: Int = identity(42);          // T inferred as Int
    var s: String = identity("hello");  // T inferred as String
    var f: Int = first(10, 20);         // 10
    return 0;
}
```

You can also specify the type explicitly: `identity<Int>(42)`.

→ See [Generics](/guides/generics/) for constraints, generic types, and `iftype`.

---

## Recursion

Functions can call themselves. Classic examples:

```zap
fun factorial(n: Int) Int {
    if n <= 1 {
        return 1;
    }
    return n * factorial(n - 1);
}

fun fibonacci(n: Int) Int {
    if n <= 1 {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

fun main() Int {
    var f5: Int = factorial(5);    // 120
    var fib7: Int = fibonacci(7);  // 13
    return 0;
}
```

---

## Methods on classes

Inside a class, functions are methods. Instance methods receive `self` implicitly:

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

→ See [Classes](/guides/classes/) for full class documentation.

---

## Common Diagnostics

| Code | Meaning |
|------|---------|
| `S2002` | Type mismatch in argument or return value |
| `S2012` | No matching overload found for this call |
| `S2013` | Call is ambiguous — multiple overloads match equally |
| `W1001` | Non-void function may not return on all paths |
