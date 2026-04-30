---
title: std/fs
description: File reading, writing, and directory creation in Zap.
---

`std/fs` provides file system operations. Combine it with `std/path` for portable path handling.

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

| Function | Description |
|----------|-------------|
| `exists(path)` | Returns `true` if the path exists |
| `isFile(path)` | Returns `true` if the path is a regular file |
| `isDir(path)` | Returns `true` if the path is a directory |
| `mkdir(path)` | Creates a directory, returns 0 on success |
| `mkdirAll(path)` | Creates a directory and all missing parents, returns 0 on success |
| `readFile(path)` | Reads the entire file and returns its content as `String` |
| `writeFile(path, content)` | Writes `content` to the file, returns 0 on success |

## Examples

### Read and write a file

```zap
import "std/fs";
import "std/io" { println };

fun main() Int {
    var path: String = "/tmp/hello.txt";

    if fs.writeFile(path, "Hello from Zap!") != 0 {
        println("write failed");
        return 1;
    }

    var content: String = fs.readFile(path);
    println(content);  // "Hello from Zap!"
    return 0;
}
```

### Create directories and write a file

```zap
import "std/fs";
import "std/path";
import "std/io" { println };

fun main() Int {
    var dir: String  = path.join("/tmp", "zap_output");
    var file: String = path.join(dir, "result.txt");

    if fs.mkdirAll(dir) != 0 {
        println("mkdir failed");
        return 1;
    }

    if fs.writeFile(file, "done") != 0 {
        println("write failed");
        return 2;
    }

    if fs.isFile(file) {
        println("file created successfully");
    }

    println(fs.readFile(file));  // "done"
    return 0;
}
```
