---
title: Native software
description: Organize native Zap applications with modules, classes, and Thor.
---

Zap compiles to native executables while keeping application code organized
around ordinary modules and types. Start with a Thor project, then grow the
source tree by responsibility.

## Split code into modules

Put a focused unit behind a module file:

```zap
// src/greeting.zp
pub fun message(name: String) String {
    return "Hello, " + name + "!";
}
```

Import it from the entry point:

```zap
import "./greeting.zp" as greeting;

fun main() Int {
    println(greeting.message("Ada"));
    return 0;
}
```

The entry point remains `src/main.zp` unless `thor.toml` selects another file.

## Model long-lived state with classes

Classes are reference types with automatic lifetime management:

```zap
class Counter {
    priv value: Int;

    fun init() {
        self.value = 0;
    }

    pub fun next() Int {
        self.value = self.value + 1;
        return self.value;
    }
}
```

Zap manages strong references automatically. Use [ownership and
ARC](/guides/ownership/) to understand deterministic release and cycle
collection, and [weak references](/guides/weak_references/) for links that
must not keep an object alive.

## Build a release binary

Put the default optimization level in `thor.toml`:

```toml
optimization = "O2"
```

Then build and run normally:

```text
thor build
thor run
```

See [Thor build tool](/guides/thor/) for outputs, dependencies, and native
linker flags.

