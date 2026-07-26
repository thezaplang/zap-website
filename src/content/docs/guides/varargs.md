---
title: Variadic parameters
description: Accept and forward a variable number of arguments.
---

Place `...` before the final parameter type:

```zap
fun sum(first: Int, rest: ...Int) Int {
    var total = first;
    var index: Int = 0;

    while index < rest.len {
        total = total + rest[index];
        index = index + 1;
    }
    return total;
}
```

Call the function with any number of trailing arguments:

```zap
var small = sum(1);
var larger = sum(1, 2, 3, 4);
```

Inside the function, the variadic parameter is available as a slice.

## Forward variadic arguments

Prefix an existing slice, array, or variadic parameter with `...`:

```zap
fun addTen(values: ...Int) Int {
    return sum(10, ...values);
}
```

You can include ordinary arguments before the forwarded sequence:

```zap
fun addPrefix(prefix: Int, values: ...Int) Int {
    return sum(prefix, 5, ...values);
}
```

Only the final parameter may be variadic.

External C variadic functions use a separate untyped declaration form, such as
`ext fun printf(format: String, ...) Int`. See
[C interop](/guides/c_interop/).
