---
title: Borrowed string views
description: Borrow string storage without copying it and declare view lifetimes.
---

`StringView` is a non-owning view over string storage. It stores a pointer and a
length while the original `String` remains the owner.

## Create a view

```zap
var source = "event:deploy";
var whole: StringView = view(source);
var payload: StringView = slice(source, 6, len(source) - 6);
```

Creating a view does not copy the viewed characters.

## Use a view

The core string functions accept both `String` and `StringView`:

```zap
println(toString(len(payload)));
println(toString(at(payload, 0)));
println(payload);
```

Use `string.owned(view)` when the result needs independent owned storage:

```zap
import "std/string" as string;

var saved: String = string.owned(payload);
```

## Returning a derived view

A function returning a view declares which parameter owns its storage:

```zap
fun payload(packet: StringView) StringView borrows(packet) {
    return slice(packet, 6, packet.len - 6);
}
```

The compiler propagates this relationship to the returned value:

```zap
var value: StringView = payload("event:deploy");
println(value);
```

The temporary owner remains alive through the view's final use.

## `noescape` parameters

Use `noescape` when a function only observes the view during the call:

```zap
fun countBytes(text: noescape StringView) Int {
    return text.len;
}
```

The callee cannot return or store that view.

## Invalid escapes

Returning a view of unrelated local storage is rejected:

```zap
// Does not compile:
// fun invalid(source: StringView) StringView borrows(source) {
//     var local = "temporary";
//     return view(local);
// }
```

Borrow provenance is preserved through local assignments, local store/load
operations, further slices, and control-flow merges. A view cannot outlive the
owner from which it was derived.
