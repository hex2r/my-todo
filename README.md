# Demo

[https://hex2r.github.io/my-todo](https://hex2r.github.io/my-todo)

# Description

A simple Todo app built with React Context API and the HTML contentEditable attribute, eliminating the need for traditional HTML forms. On session start, the app generates a fixed set of demo todos with random content and stores all todo items in Session Storage. Users can edit todos inline, add new todos, and remove items using the Shift+Delete keyboard shortcut. The user interface is styled with Tailwind CSS.

### Behaviour:

**Keyboard:**

- Editing a to-do item
- Toggling the completed state of a to-do item
- Deleting a to-do item using the shortcut Shift+Delete
- Deleting all completed items (if any exist)

**Mouse:**

- Users can invoke the context menu by clicking on a todo item

**Touch Devices**

- Swipe left on a todo item to remove it
- Swipe right on a to-do item to toggle its completed state
