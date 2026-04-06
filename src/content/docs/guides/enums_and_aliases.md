---
title: Enums and Aliases
description: Declaring enums for variants and aliases for clearer type names.
---

## Enums

Enums define named values:

```zap
enum DoorState { Open, Closed, Locked }
```

## Comparing enum values

```zap
fun describe(state: DoorState) String {
    if state == DoorState.Open {
        return "open";
    }
    if state == DoorState.Locked {
        return "locked";
    }
    return "closed";
}
```

## Aliases

Aliases rename existing types:

```zap
alias Score = Int;
alias MyState = DoorState;
```

## Example

```zap
alias MyInt = Int;

fun main() MyInt {
    var x: MyInt = 42;
    return x;
}
```
