---
title: Functions
description: Declare functions with parameters and return values.
---

A function starts with `fun`, followed by its name and parameters:

```zap
fun greet(name: String) {
    println("Hello, " + name);
}
```

Call it by writing its name and arguments:

```zap
greet("Ada");
```

## Return values

Write the return type after the parameter list:

```zap
fun square(value: Int) Int {
    return value * value;
}

var result = square(6);
```

A function returning `Void` omits the return type:

```zap
fun announce(message: String) {
    println(message);
}
```

## Multiple parameters

```zap
fun clamp(value: Int, low: Int, high: Int) Int {
    if value < low { return low; }
    if value > high { return high; }
    return value;
}

var safe = clamp(120, 0, 100);
```

Arguments are evaluated in source order.

## Parameter values

Ordinary parameters receive values:

```zap
fun excited(name: String) String {
    var result = name;
    result = result + "!";
    return result;
}

var original = "Zap";
var changed = excited(original);
println(original);
```

Changing the local parameter does not reassign the caller's variable.

Other parameter contracts have dedicated pages:

- [`ref` parameters](/guides/ref_parameters/) modify a caller's variable.
- [`sink` parameters](/guides/sink_parameters/) accept ownership.
- [`noescape StringView`](/guides/string_views/) borrows text for one call.
- [Variadic parameters](/guides/varargs/) accept a variable number of arguments.

Function overloading and argument labels are documented in
[Overloads](/guides/overloads/) and
[Named arguments](/guides/named_arguments/).
