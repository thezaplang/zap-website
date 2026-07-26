---
title: Standard library
description: Modules shipped with Zap and the APIs available through the prelude.
---

Thor uses the standard library resolved by the selected `zapc`; it does not
copy the library into each project. For editor configuration or a custom tool,
the active compiler reports that directory with:

```bash
zapc --print-stdlib-path
```

Common names such as `println`, `StringView`, `List`, and `toString` are
available through the automatic [prelude](/std/prelude/). Import a module when
you need the rest of its API.

| Module | Purpose |
| --- | --- |
| [`std/io`](/std/io/) | Terminal input and output |
| [`std/string`](/std/string/) | String views, trimming, splitting, and building |
| [`std/strings`](/std/strings/) | Split and join lists of strings |
| [`std/collection`](/std/collection/) | Dynamic lists and string-keyed maps |
| [`std/slice`](/std/slice/) | Checked helpers for slices |
| [`std/convert`](/std/convert/) | Primitive conversions and integer parsing |
| [`std/fs`](/std/fs/) | Failable file and directory operations |
| [`std/path`](/std/path/) | Parent, basename, and path joining |
| [`std/process`](/std/process/) | Arguments, working directory, execution, and exit |
| [`std/math`](/std/math/) | Basic integer and floating-point helpers |
| [`std/random`](/std/random/) | Seeded PCG32 pseudo-random generation |
| [`std/json`](/std/json/) | Early JSON object parser |
| [`std/network`](/std/network/) | TCP-style streams, listeners, and raw socket wrappers |
| [`std/error`](/std/error/) | A general structured error value |
| [`std/mem`](/std/mem/) | Unsafe C allocation functions |
