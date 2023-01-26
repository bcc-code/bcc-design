# Adding new components

Any new component that is added needs to conform to these criteria:
- **Generic and reusable**: if the component is specific to a project, consider only adding it to your own project
- Styled according to the **BCC Design System**
- **Accessibility** taken into account (ARIA)
- **Keyboard shortcuts** for custom components work as expected (arrow keys, escapse key)

## Converting from Figma
::: warning HEADS UP
This documentation is rudimentary and needs to be expanded.
:::

Figma designs are generally based on [Flowbite](https://flowbite.com/docs/getting-started/introduction/). This means that the Flowbite markup can be used as a base, but will generally need customization both in terms of styling and additions such as accessibility. We do not use Flowbite's Vue library, but instead build our own Vue components. This gives us full control over the markup.
