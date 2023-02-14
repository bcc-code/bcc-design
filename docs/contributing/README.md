# Adding new components

Components are usually first implemented in Figma by a designer and can then be implemented as a Vue component by a developer. 

## Checklist
These questions should be answered with "yes" before a component is ready to be part of this library.

- Is the component **reusable**? Is the design generic enough that it can be used in other projects or should it be a local component in a certain project?
- Are all **states** from the design implemented? Has the implementation been checked by a designer?
- Does the **public API** of the component make sense? Are the props and slots properly named?
- Has **accessibility** been taken into account? Does every relevant part have ARIA roles? Do images have an alt tag that is always set, and are decorative elements marked as such? How does the component look without CSS?
- Are **keyboard shortcuts** implemented? Does the component behave like expected when navigating by keyboard?
- Has the component been **documented**? Is there a usage example?

## Converting from Figma
::: warning HEADS UP
This documentation is rudimentary and needs to be expanded.
:::

Figma designs are generally based on [Flowbite](https://flowbite.com/docs/getting-started/introduction/). This means that the Flowbite markup can be used as a base, but will generally need customization both in terms of styling and additions such as accessibility. We do not use Flowbite's Vue library, but instead build our own Vue components. This gives us full control over the markup.

## Do's and Don'ts
### Follow Figma naming for props
Props should be (if possible) be named like they are named in Figma. Usually designers will create a component in Figma that has properties as well. By keeping these as close as possible it's easier to compare different variants between design and code.

### Don't include all attributes as props
When building a wrapper around a native HTML element such as `input`, don't include all the attributes of this element as props on the component. Vue will automatically [pass them through](https://vuejs.org/guide/components/attrs.html). If the element is not the top level element in your component (for example because it is wrapped in a `span`), bind the Vue `$attrs` property to the appropriate element.

First disable the default attribute inheritance with a non-`setup` script tag:
```vue
<script lang="ts">
    export default {
        inheritAttrs: false,
    };
</script>
```

And then bind the `$attrs` to the element:

```vue
<input v-bind="$attrs" />
```

From the [Vue documentation](https://vuejs.org/guide/components/attrs.html#disabling-attribute-inheritance):
> The `$attrs` object includes all attributes that are not declared by the component's `props` or `emits` options

### Don't use `<style>` in an SFC
Commonly, a Vue Single File Component (SFC) includes a `script`, `template`, and `style` tag. The use of a `style` tag should be avoided, for two reasons:
1. Adding classes this way will generate a CSS file in the output. We don't want consumers of this Vue component library having to include a separate CSS file
2. Since we're using Tailwind, it's not needed to write any CSS. By ruling out the possiblity of using custom classes, even when they're `scoped`, it's clear where CSS styling comes from: Tailwind
