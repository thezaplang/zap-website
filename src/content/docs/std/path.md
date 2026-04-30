---
title: std/path
description: Join paths and extract basename or parent directory in Zap.
---

`std/path` provides portable path manipulation. Use it with `std/fs` for file operations.

## API

```zap
pub ext fun parent(path: String) String;
pub ext fun basename(path: String) String;

pub fun join(a: String, b: String) String;
```

| Function | Description |
|----------|-------------|
| `join(a, b)` | Joins two path segments with the correct separator |
| `basename(path)` | Returns the last component of the path (filename) |
| `parent(path)` | Returns the directory containing the path |

## Examples

### Basic path operations

```zap
import "std/path";
import "std/io" { println };

fun main() Int {
    var file: String = path.join("/home/user", "docs/notes.txt");
    println(file);                   // "/home/user/docs/notes.txt"
    println(path.basename(file));    // "notes.txt"
    println(path.parent(file));      // "/home/user/docs"
    return 0;
}
```

### Building paths dynamically

```zap
import "std/path";
import "std/fs";
import "std/io" { println };

fun main() Int {
    var base: String = "/tmp";
    var project: String = path.join(base, "myproject");
    var src: String = path.join(project, "main.zp");
    var out: String = path.join(project, "build");

    println(src);   // "/tmp/myproject/main.zp"
    println(out);   // "/tmp/myproject/build"

    println(path.basename(src));  // "main.zp"
    println(path.parent(src));    // "/tmp/myproject"

    return 0;
}
```
