---
title: Weak references
description: Refer to a class instance without keeping it alive.
---

A weak reference observes an object but does not contribute to its strong
reference count.

## Weak fields

```zap
class Project {
    pub name: String;

    fun init(name: String) {
        self.name = name;
    }
}

class Task {
    priv project: weak Project;

    pub fun attach(project: weak Project) {
        self.project = project;
    }
}
```

This is useful for back-references such as child-to-parent relationships.

## Check before access

A weak target may already have been destroyed. Use `alive` before `lock`:

```zap
class Task {
    priv project: weak Project;

    pub fun projectName() String {
        if !alive(self.project) {
            return "unassigned";
        }

        var project = lock(self.project);
        return project.name;
    }
}
```

`lock` returns a strong class value. That value keeps the object alive while it
is being used.

## Breaking ownership cycles

```zap
class Parent {
    pub child: Child;
}

class Child {
    pub parent: weak Parent;
}
```

The parent owns the child, while the child's back-reference is observational.
Removing the final external parent reference can destroy both objects through
ordinary deterministic ARC.

Zap also has a cycle collector for genuine strong cycles. Weak references are
still preferable when the domain relationship itself is non-owning.
