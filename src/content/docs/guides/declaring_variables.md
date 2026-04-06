---
title: Variables
description: Declaring variables and understanding the core built-in types in Zap.
---

## Variables

Variables use `var` and can be reassigned:

```zap
var x: Int = 10;
x = 20;
```

Type annotations are written after `:`. Zap also allows declaration before assignment:

```zap
var name: String;
name = "Zap";
```

## Built-in types

- `Int`, `Int16`, `Int64`
- `UInt`, `UInt8`, `UInt16`, `UInt64`
- `Float`, `Float64`
- `Bool`
- `Char`
- `String`
- `Void`

## More examples

```zap
var age: Int = 21;
var ratio: Float = 1.5;
var enabled: Bool = true;
var letter: Char = 'z';
var name: String = "Zap";
```

For constants and globals, continue with [Constants and globals](/guides/constants_and_globals/).
