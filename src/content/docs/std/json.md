---
title: std/json
description: Parse the current early subset of JSON values and objects.
---

```zap
import "std/json" as json;
```

`JsonParser` parses one value and reports validity through fields on the parser
and result:

```zap
var parser = new json.JsonParser("{\"name\":\"Zap\"}");
var value = parser.parse();

if !value.valid {
    eprintln("invalid JSON");
    return 1;
}
```

## Types

- `JsonType` identifies `STRING`, `NUMBER`, `BOOL`, `NULLTYPE`, or `OBJECT`.
- `JsonValue` stores the tag, value fields, original object source, and `valid`.
- `JsonObject` provides `put`, `get`, `has`, and `size`.
- `JsonParser` exposes lower-level cursor and parsing methods in addition to
  `parse`.

The module is an early implementation, not a complete JSON codec. Object and
string parsing work, while numbers, booleans, null, arrays, escaping, and
serialization are not yet fully implemented. Check `valid` before using a
parsed value.
