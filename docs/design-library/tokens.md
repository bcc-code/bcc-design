---
order: 25
---

# Tokens

Included in the components package are the design system tokens. At the moment these are primarily colors, such as `bg-primary` and `border-button-secondary`.

## Using tokens
Every color token is included as a Tailwind utility class, such as `.bg-primary`. These classes point to CSS variables, such as `var(--bg-primary)`. These variables can also be used if you're not using Tailwind by [including the compiled CSS](./css-library.md#without-tailwind).

### Token context
By default, tokens are using the `global` context. However, by setting the `data-context` property in HTML the context can be switched to the `alternative` context. In the default `bccForbundetTheme` this will mean dark background colors and lighter foreground colors, as opposed to the other way around.

```html
<div data-context="alternative" class="bg-primary">
    <button class="bcc-button">...</button>
</div>
```

If your whole app should use the alternative colors, set the `data-context` attribute on the `html` or `body` elements.

## Available tokens
There is currently no visual overview of all the tokens, but you can take a look at the source code of the components package to view both the [Tailwind utilities](https://github.com/bcc-code/bcc-design/tree/main/design-libary/src/tokens/tailwind) and [CSS variables](https://github.com/bcc-code/bcc-design/tree/main/design-libary/src/tokens/variables).
