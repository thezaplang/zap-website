---
title: std/fs
description: Read, write, copy, move, and inspect files with explicit errors.
---

```zap
import "std/fs" as fs;
```

Operations that can fail return `T!fs.FsError`. Handle them with `?`, `or`, or
`or err`.

## API

| Function | Result |
| --- | --- |
| `exists(path) Bool` | Whether any entry exists |
| `isFile(path) Bool` | Whether the path is a regular file |
| `isDir(path) Bool` | Whether the path is a directory |
| `mkdir(path) Void!FsError` | Creates one directory |
| `mkdirAll(path) Void!FsError` | Creates missing parent directories |
| `ensureDir(path) Void!FsError` | Ensures a directory exists |
| `readFile(path) String!FsError` | Reads the complete file |
| `writeFile(path, content) Void!FsError` | Replaces the complete file |
| `writeFileSafe(path, content) Void!FsError` | Creates parent directories, then writes |
| `touch(path) Void!FsError` | Creates an empty file if absent |
| `remove(path) Void!FsError` | Removes a file or empty directory |
| `rename(from, to) Void!FsError` | Renames an entry |
| `move(from, to) Void!FsError` | Creates destination parents, then renames |
| `copyFile(from, to) Void!FsError` | Copies a file and creates destination parents |
| `readLines(path) List<String>!FsError` | Reads lines without newline characters |
| `writeLines(path, lines) Void!FsError` | Writes a list joined with newlines |

```zap
import "std/fs" as fs;

fun saveReport(path: String, text: String) Void!fs.FsError {
    fs.writeFileSafe(path, text)?;
    return;
}

fun main() Int {
    saveReport("out/report.txt", "ready") or err {
        eprintln("could not save report");
        return 1;
    };
    return 0;
}
```

`FsError` variants are `PermissionDenied`, `NotFound`, `AlreadyExists`,
`NotDirectory`, `IsDirectory`, `InvalidPath`, `OutOfMemory`, and `Io`.
