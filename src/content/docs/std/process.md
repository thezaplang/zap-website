---
title: std/process
description: Read process arguments, inspect the working directory, run commands, and exit.
---

```zap
import "std/process" as process;
```

| Function | Result |
| --- | --- |
| `argc() Int` | Number of command-line arguments |
| `argv(index: Int) String` | Argument at `index`; index zero is the program path |
| `cwd() String` | Current working directory |
| `exec(command: String) Int` | Runs a shell command and returns its status |
| `exit(code: Int) Void` | Ends the process |
| `panic(message: String) Void` | Prints to standard error and exits with code 1 |

```zap
import "std/process" as process;

fun main() Int {
    if process.argc() < 2 {
        eprintln("usage: app <name>");
        return 1;
    }

    println("Hello, " + process.argv(1));
    return 0;
}
```
