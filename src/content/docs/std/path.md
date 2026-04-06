---
title: std/path
description: Joining paths and reading parent or basename parts.
---

## API

```zap
pub ext fun parent(path: String) String;
pub ext fun basename(path: String) String;

pub fun join(a: String, b: String) String;
```

## Example

```zap
import "std/path";
import "std/io" { println };

fun main() Int {
    var file: String = path.join("/tmp", "hello.txt");
    println(path.basename(file));
    println(path.parent(file));
    return 0;
}
```
