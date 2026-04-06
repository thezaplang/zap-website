---
title: std/fs
description: File and directory helpers.
---

## API

```zap
pub ext fun exists(path: String) Bool;
pub ext fun isFile(path: String) Bool;
pub ext fun isDir(path: String) Bool;
pub ext fun mkdir(path: String) Int;
pub ext fun readFile(path: String) String;
pub ext fun writeFile(path: String, content: String) Int;

pub fun mkdirAll(target: String) Int;
```

## Example

```zap
import "std/fs";
import "std/path";
import "std/io" { println };

fun main() Int {
    var dir: String = path.join("/tmp", "zap_docs");
    var file: String = path.join(dir, "note.txt");

    if fs.mkdirAll(dir) != 0 {
        return 1;
    }
    if fs.writeFile(file, "hello") != 0 {
        return 2;
    }

    println(fs.readFile(file));
    return 0;
}
```
