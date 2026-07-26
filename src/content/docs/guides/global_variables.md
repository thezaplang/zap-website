---
title: Global variables
description: Declare mutable state shared across the process.
---

Use `global var` for mutable top-level state:

```zap
global var requests: Int = 0;

fun recordRequest() {
    requests = requests + 1;
}
```

The variable is initialized before program execution and remains available for
the process lifetime.

## Reading and writing a global

```zap
global var lastStatus: Int = 0;

fun updateStatus(status: Int) {
    lastStatus = status;
}

fun currentStatus() Int {
    return lastStatus;
}
```

## Prefer explicit state

Global variables hide which code can change a value and make tests harder to
isolate. Prefer passing state to functions or storing it in a class:

```zap
class Metrics {
    priv requests: Int;

    pub fun record() {
        self.requests = self.requests + 1;
    }

    pub fun count() Int {
        return self.requests;
    }
}
```

Use a global only when one process-wide mutable value is genuinely part of the
program's design.
