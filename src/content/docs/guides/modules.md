---
title: Modules
description: Organize declarations into modules with explicit public APIs.
---

Each `.zp` file can contribute declarations to a module. Declarations are
private unless they start with `pub`.

## Public declarations

```zap
// geometry.zp
pub record Point {
    x: Int,
    y: Int,
}

pub fun distanceSquared(point: Point) Int {
    return point.x * point.x + point.y * point.y;
}

fun internalHelper() Int {
    return 0;
}
```

Other modules can access `Point` and `distanceSquared`, but not
`internalHelper`.

## Directory modules

A directory can contain several `.zp` files that form one module namespace:

```text
drawing/
  canvas.zp
  color.zp
  shape.zp
```

A caller imports the directory as one module:

```zap
import "drawing";
```

Use this structure when one public module has several cohesive implementation
files.

## Re-exports

`pub import` makes imported declarations part of the current module's API:

```zap
pub import "geometry" { Point, distanceSquared };
```

Re-exports can provide one stable entry point for a module assembled from
several files.

## Public API design

Export the declarations callers need and keep implementation details private.
Moving private helpers between files should not require changes in importing
code.

The syntax for loading and naming modules is covered in [Imports](/guides/imports/).
