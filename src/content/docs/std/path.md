---
title: std/path
description: Join paths and obtain a path's parent or basename.
---

```zap
import "std/path" as path;
```

| Function | Result |
| --- | --- |
| `join(a: String, b: String) String` | Joins two path segments |
| `basename(path: String) String` | Last component of the path |
| `parent(path: String) String` | Path without its last component |

```zap
import "std/path" as path;

fun main() Int {
    var file = path.join("build", "app.o");
    println(path.parent(file));
    println(path.basename(file));
    return 0;
}
```

These functions manipulate path text. They do not access the file system or
canonicalize a path.
