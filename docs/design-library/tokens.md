---
order: 25
---

# Tokens
::: tip
View available color tokens [in Storybook](https://design-library.developer.bcc.no/?path=/docs/tokens-color--docs)
:::

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
In Storybook you can view the available [typography classes](https://design-library.developer.bcc.no/?path=/docs/tokens-typography--docs) and [color tokens](https://design-library.developer.bcc.no/?path=/docs/tokens-color--docs).

To view all available CSS variables and tokens, view the source of the [Tailwind utilities](https://github.com/bcc-code/bcc-design/tree/main/design-library/src/tokens/tailwind) and [CSS variables](https://github.com/bcc-code/bcc-design/tree/main/design-library/src/tokens/variables).
