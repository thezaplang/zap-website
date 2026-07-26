---
title: Inheritance
description: Extend one class and dispatch overridden methods through base references.
---

Zap supports single class inheritance:

```zap
class Notification {
    prot recipient: String;

    fun init(recipient: String) {
        self.recipient = recipient;
    }

    pub fun send() String {
        return "Notification for " + self.recipient;
    }
}

class EmailNotification : Notification {
    fun init(recipient: String) {
        self.recipient = recipient;
    }

    pub fun send() String {
        return "Email sent to " + self.recipient;
    }
}
```

The subclass follows the colon after its name.

## Protected members

`prot` allows the declaring class and its subclasses to access a member:

```zap
class NamedNotification : Notification {
    pub fun target() String {
        return self.recipient;
    }
}
```

Other callers cannot access `recipient` directly.

## Base-class variables

A subclass instance may be stored in a base-class variable:

```zap
var notification: Notification =
    new EmailNotification("team@example.com");
```

## Dynamic dispatch

Calling an overridden instance method through the base reference selects the
subclass implementation:

```zap
println(notification.send());
```

Static methods do not use dynamic dispatch because they are called through the
class rather than an object.

Use inheritance when callers genuinely need one polymorphic class interface.
Prefer composition when one object merely uses another object to do part of
its work.
