---
title: Imports
description: Load modules, select exported names, and configure import aliases.
---

## Import a module namespace

```zap
import "geometry";

fun main() Int {
    var point = geometry.Point { x: 3, y: 4 };
    return geometry.distanceSquared(point);
}
```

The `.zp` extension may be omitted.

## Import selected names

Use braces to bring specific exports into the current scope:

```zap
import "geometry" { Point, distanceSquared };

fun main() Int {
    return distanceSquared(Point { x: 3, y: 4 });
}
```

## Rename an imported symbol

```zap
import "geometry" { distanceSquared as norm2 };
```

The alias only changes the local name.

## Alias a module

```zap
import "std/convert" as conv;

fun main() Int {
    println(conv.toString(42));
    return 0;
}
```

## Path resolution

The compiler resolves imports relative to the importing file, from configured
import mappings, and from the standard library.

Add a mapping in `thor.toml`:

```toml
[imports]
"vendor" = "third_party/vendor"
```

Thor passes every `[imports]` entry to the compiler. See [Thor build
tool](/guides/thor/) for project configuration, or the [compiler
reference](/guides/compiler/) for low-level options.
