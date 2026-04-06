---
title: Modules and Imports
description: Import local files, folders, aliases, and std modules in Zap.
---

Zap supports imports from local files and from the standard library.

## Import a module

```zap
import "math";
```

Then use its exported names through the module name:

```zap
var value: math.Score = 10;
```

## Import selected symbols

```zap
import "std/io" { println, printInt };
```

## Import a std module namespace

```zap
import "std/io" as io;

fun main() Int {
    io.println("hello");
    return 0;
}
```

## Import with an alias

```zap
import "helper.zp" { answer as value };
import "std/io" as io;
```

## Public exports

Names are exported with `pub`:

```zap
pub fun answer() Int {
    return 0;
}
```

## Folder imports

Importing a directory loads `.zp` files from that directory, which is how the tests use grouped modules:

```zap
import "mods";
```

## Example layout

One common pattern is:

```txt
app.zp
math.zp
```

`app.zp`:

```zap
import "math";

fun main() Int {
    return math.lengthSquared(math.Vec2{ x: 3, y: 4 });
}
```

## Standard library paths

Standard library modules live under `std/...`, for example:

- `std/io`
- `std/string`
- `std/process`
- `std/fs`
- `std/path`
- `std/math`
- `std/error`
- `std/convert`
- `std/mem`
