---
title: Tagged unions
description: Define enum variants that carry different payload types.
---

An enum variant may carry a value:

```zap
enum Token {
    End,
    Number(Int),
    Name(String),
}

var token = Token.Number(42);
```

Such an enum stores a tag together with the active variant's payload.

## Different payloads

```zap
record Position {
    line: Int,
    column: Int,
}

enum ParseEvent {
    Finished,
    Text(String),
    Location(Position),
}
```

Each value holds exactly one variant at a time.

## Inspect the tag

The current language exposes the active tag through `.tag`:

```zap
var event = ParseEvent.Text("name");
println(toString(event.tag));
```

Pattern matching and payload narrowing are not implemented yet. Until they
are, tagged unions are most useful when code can pass or store the complete
value without extracting every payload.

## Ownership

Payloads follow the ownership rules of their types:

```zap
class Node {
    pub next: Node;
}

enum Link {
    Empty,
    Some(Node),
}
```

A class reference stored in a tagged union is traced by ARC and the cycle
collector. Strings and aggregates are copied and destroyed using their normal
generated operations.
