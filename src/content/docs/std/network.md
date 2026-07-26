---
title: std/network
description: Open TCP-style streams and listeners or call the raw socket wrappers.
---

```zap
import "std/network" as network;
```

## Stream API

```zap
var stream = network.dial("example.com", 80);
if !stream.isOpen() {
    return 1;
}

stream.sendAll("GET / HTTP/1.0\r\nHost: example.com\r\n\r\n");
var response = stream.recv(4096);
stream.close();
```

`Stream` methods include `fdValue`, `isOpen`, `close`, `send`, `sendAll`,
`sendLine`, `recv`, `recvExact`, `recvUntil`, `recvLine`,
`readBufferedBytes`, and `clearBuffer`.

`Listener` provides `fdValue`, `isOpen`, `accept`, and `close`. Create one with
`bind(host, port)` or `bindEndpoint(endpoint)`.

## Raw wrappers

The module also exposes descriptor-based functions: `connect`, `listen`,
`accept`, `send`, `recv`, `resolve`, `closeIfOpen`, and their `net...`
runtime declarations.

Most operations report failure through a negative descriptor, a return code, or
`lastErrorCode()`. The current API does not use Zap failable return types.
Always check the result and close every open stream or listener.
