---
title: std/process
description: Access command-line arguments, current directory, and process control in Zap.
---

`std/process` provides access to the running process — arguments, working directory, and exit control.

## API

```zap
pub ext fun exit(code: Int) Void;
pub ext fun argc() Int;
pub ext fun argv(i: Int) String;
pub ext fun exec(cmd: String) Int;
pub ext fun cwd() String;

pub fun panic(message: String) Void;
```

| Function | Description |
|----------|-------------|
| `argc()` | Returns the number of command-line arguments |
| `argv(i)` | Returns the argument at index `i` (0 = program name) |
| `cwd()` | Returns the current working directory as a string |
| `exit(code)` | Exits the process with the given exit code |
| `exec(cmd)` | Runs a shell command, returns exit code |
| `panic(msg)` | Prints `msg` to stderr and exits with code 1 |

## Examples

### Reading command-line arguments

```zap
import "std/process";
import "std/io" { println, printInt };

fun main() Int {
    println("Program: " ~ process.argv(0));
    printInt(process.argc());

    var i: Int = 1;
    while i < process.argc() {
        println("arg: " ~ process.argv(i));
        i = i + 1;
    }

    return 0;
}
```

Run with: `./program foo bar` → prints `arg: foo`, `arg: bar`.

### Working directory and exit

```zap
import "std/process";
import "std/io" { println };

fun main() Int {
    println("Running in: " ~ process.cwd());

    if process.argc() < 2 {
        println("Usage: program <name>");
        process.exit(1);
    }

    println("Hello, " ~ process.argv(1) ~ "!");
    return 0;
}
```
