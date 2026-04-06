---
title: Constants and Globals
description: Constants, global variables, and aliases in Zap.
---

## Constants

Constants use `const` and must be initialized immediately:

```zap
const APP_NAME: String = "Zap Demo";
const MAX_RETRIES: Int = 5;
```

## Local constants

```zap
fun main() Int {
    const LIMIT: Int = 10;
    return LIMIT;
}
```

## Global variables

Mutable top-level state uses `global var`:

```zap
global var destroyed: Int = 0;
```

## Aliases

Aliases let you name an existing type:

```zap
alias Score = Int;
alias Name = String;
```

## Example

```zap
alias Score = Int;
global var total: Score = 0;

fun add(points: Score) {
    total = total + points;
}

fun main() Int {
    add(10);
    add(5);
    return total;
}
```
