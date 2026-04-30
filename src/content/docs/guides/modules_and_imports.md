---
title: Modules and Imports
description: Organize Zap code across files with import, pub exports, folder modules, and the standard library.
---

Zap's module system is file-based. Each `.zp` file is a module. You import other modules by path, and control what's visible outside with `pub`.

## Importing a module

```zap
import "math";
```

After this, access exported symbols through the module name:

```zap
import "math";

fun main() Int {
    var v: math.Vec2 = math.Vec2{ x: 3, y: 4 };
    var len: Int = math.lengthSquared(v);
    return 0;
}
```

---

## Selective import

Import only specific symbols to use them without the module prefix:

```zap
import "std/io" { println, printInt };

fun main() Int {
    println("Hello!");
    printInt(42);
    return 0;
}
```

---

## Import with alias

Give a module a shorter name with `as`:

```zap
import "std/io" as io;
import "std/string" as str;

fun main() Int {
    io.println("Hello!");
    var n: Int = str.len("Zap");
    return 0;
}
```

---

## Exporting symbols with `pub`

By default, symbols in a module are private. Mark them `pub` to make them importable:

```zap
// math.zp
pub alias Score = Int;

pub struct Vec2 {
    x: Int,
    y: Int,
}

pub fun lengthSquared(v: Vec2) Score {
    return v.x * v.x + v.y * v.y;
}

pub fun dot(a: Vec2, b: Vec2) Int {
    return a.x * b.x + a.y * b.y;
}

// This function is NOT exported (no pub):
fun helper() Int { return 0; }
```

---

## Two-file project example

`math.zp`:

```zap
pub struct Vec2 {
    x: Int,
    y: Int,
}

pub fun lengthSquared(v: Vec2) Int {
    return v.x * v.x + v.y * v.y;
}

pub fun dot(a: Vec2, b: Vec2) Int {
    return a.x * b.x + a.y * b.y;
}
```

`app.zp`:

```zap
import "math";
import "std/io" { printInt };

fun main() Int {
    var a: math.Vec2 = math.Vec2{ x: 3, y: 4 };
    var b: math.Vec2 = math.Vec2{ x: 2, y: 5 };

    printInt(math.lengthSquared(a));  // 25
    printInt(math.dot(a, b));         // 26
    return 0;
}
```

Compile with:

```bash
zapc app.zp -o app
```

---

## Folder imports

Importing a directory loads all `.zp` files in that directory as a single module namespace:

```zap
import "utils";  // loads utils/helpers.zp, utils/math.zp, etc.
```

This is useful for organizing larger modules into multiple files.

---

## Standard library modules

| Module | What it provides |
|--------|-----------------|
| `std/io` | Console I/O: `println`, `printInt`, `getLn`, `printf`, `printfln`, ... |
| `std/string` | String operations: `len`, `at`, `slice`, `eq`, `fromChar`, `pushChar` |
| `std/fs` | File system: `readFile`, `writeFile`, `mkdirAll` |
| `std/path` | Path manipulation: `join`, `basename`, `parent` |
| `std/math` | Math functions: `sqrt`, `abs`, `pow`, `floor`, `ceil`, ... |
| `std/convert` | Type conversions: `intToString`, `floatToInt`, `stringToInt`, ... |
| `std/mem` | Manual memory: `malloc`, `free` (requires `--allow-unsafe`) |
| `std/process` | Process info: `argc`, `argv`, `cwd`, `exit` |
| `std/error` | Error utilities and types |
| `std/prelude` | Symbols available everywhere without import (`println`, `printInt`, ...) |

→ See the [Standard Library](/std/) section for full API documentation.

---

## Common Diagnostics

| Code | Meaning |
|------|---------|
| `S2001` | Undefined symbol — imported name doesn't exist in the module |
| `P1003` | Unexpected token in import statement |
