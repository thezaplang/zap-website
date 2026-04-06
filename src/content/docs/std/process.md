---
title: std/process
description: Process arguments, current directory, child execution, and exit helpers.
---

## API

```zap
pub ext fun exit(code: Int) Void;
pub ext fun argc() Int;
pub ext fun argv(i: Int) String;
pub ext fun exec(cmd: String) Int;
pub ext fun cwd() String;

pub fun panic(message: String) Void;
```

## Example

```zap
import "std/process";
import "std/io" { println, printInt };

fun main() Int {
    println(process.cwd());
    printInt(process.argc());
    if process.argc() > 1 {
        println(process.argv(1));
    }
    return 0;
}
```
