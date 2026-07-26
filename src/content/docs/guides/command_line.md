---
title: Command-line tools
description: Build small, native command-line programs with Zap and Thor.
---

Zap is a good fit for command-line tools that should start quickly, ship as a
native binary, and keep their control flow easy to inspect.

## Start a project

Create and run a Thor project:

```text
thor new greet
cd greet
thor run
```

Thor builds the executable into `build/`. Add project-level compiler options,
native libraries, and import mappings in `thor.toml` instead of maintaining a
long shell command.

## Read arguments

`std/process` exposes the argument count and individual arguments:

```zap
import "std/process";

fun main() Int {
    if process.argc() != 2 {
        eprintln("usage: greet <name>");
        return 1;
    }

    println("Hello, " + process.argv(1) + "!");
    return 0;
}
```

`main` returns the program's exit status. Return `0` for success and a
nonzero value when the command cannot complete.

## Keep failure paths local

File operations are failable. Handle an expected failure where the command can
give the user useful context:

```zap
import "std/fs";

fun main() Int {
    var text: String = fs.readFile("message.txt") or err {
        eprintln("could not read message.txt");
        return 1;
    };

    println(text);
    return 0;
}
```

Read [Error handling](/guides/error_handling/) for `?`, `or`, and `or err`.
For filesystem APIs, see [std/fs](/std/fs/).

