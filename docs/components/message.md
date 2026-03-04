---
title: Message
order: 31
---

# Message

Inline notification for success, info, warning, or error messages.

## Preview

[Open in Storybook →](https://components.bcc.no/?path=/docs/wrapped-bccmessage--docs)

## When to use

- To display contextual feedback inline
- For form validation messages
- To communicate status after an action

## Usage

```vue
<template>
  <Message severity="info">This is an informational message.</Message>
  <Message severity="success">Operation completed successfully.</Message>
  <Message severity="warn">Please review before continuing.</Message>
  <Message severity="error">Something went wrong.</Message>
</template>
```

### Closable

```vue
<template>
  <Message severity="info" :closable="true">You can dismiss this message.</Message>
</template>
```

## Links

- [Storybook →](https://components.bcc.no/?path=/docs/wrapped-bccmessage--docs)
- [PrimeVue Docs →](https://primevue.org/message/)

<!-- TODO: Add Figma embed -->
