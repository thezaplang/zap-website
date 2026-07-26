---
title: std/random
description: Reproducible pseudo-random values from a PCG32 generator.
---

```zap
import "std/random" as random;
```

Create `Rng` with the default seed or provide a seed and stream:

```zap
var rng = new random.Rng(42, 7);
var die = rng.nextRangeInclusive(1, 6);
var coin = rng.nextBool();
```

## Methods

| Method | Range or effect |
| --- | --- |
| `seed(seed, stream)` | Resets the generator |
| `nextUInt32()` | Unsigned 32-bit value stored in `UInt` |
| `nextInt()` | Non-negative integer derived from the next value |
| `nextBool()` | Boolean |
| `nextFloat()` | `Float` in `[0, 1)` |
| `nextFloat64()` | `Float64` in `[0, 1)` |
| `nextUIntBounded(upper)` | Value below `upper`; returns zero when `upper` is zero |
| `nextRange(min, max)` | Integer in `[min, max)` |
| `nextRangeInclusive(min, max)` | Integer in `[min, max]` |
| `chance(probability)` | Boolean with a clamped probability |
| `shuffleInt(values)` | Shuffles an `[]Int` in place |

`Pcg32` and `Random` are aliases for `Rng`. Module-level helpers such as
`randomInt(rng)` and `randomRange(rng, min, max)` delegate to the same object.

This is a deterministic pseudo-random generator, not a cryptographic random
source.
