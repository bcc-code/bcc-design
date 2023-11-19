---
order: 30
---
# 🔑 Contributing Guide
::: tip
This guide is specifically for the design library, be sure to read the [design system contributing guide](https://github.com/bcc-code/bcc-design/blob/main/CONTRIBUTING.md) as well.
:::

Components are usually first implemented in Figma by a designer and can then be implemented as a Vue component by a developer.

## Goal of the component library
We welcome any contributions to the component library. It might be of interest to know the goals behind this:

- **Consistent branding** across BCC software products: the primary goal behind the whole design system which informs all our decisions.
- **Reduce development time and cost** for new projects through reusable UI/UX: the primary goal behind the component library. We solve UI challenges so developers can focus on their business logic.
- **Cost effective and future-proof** solution: the component library needs to be maintainable with relatively low effort.
- **Pragmatic adoption** in existing ecosystem (Vue, Directus, Tailwind): the component library is specifically built for technologies that are broadly used in BCC IT so developers can start using it in their existing apps as well.

## Checklist
Before a component can be added to the library, answer these questions affirmatively.

- Is the component **reusable**? If you have a Vue component in a local project that is aligned with the design system, it probably should be in the component library. Make sure to check with a designer so it makes it way into the design system.
- Are all **states** from the design implemented? Has the implementation been checked by a designer? Only states from the design should be implemented.
- Does the **public API** of the component make sense? Are the props and slots properly named? Is this public API consistent with other components in the component library?
- Has **accessibility** been taken into account? Does every relevant part have ARIA roles? Do images have an alt tag that is always set, and are decorative elements marked as such? How does the component look without CSS?
- Are **keyboard shortcuts** implemented? Does the component behave like expected when navigating by keyboard? Especially pay attention to this when imitating a native HTML element such as a button as users expect it to work in a certain way.
- Has the component been **documented**? Is there a usage example? Make sure all different states are covered by a story.

## Building Vue components
All components are built with Vue first, with the CSS library produced as an artifact of that process. This means that all the components have good examples in [Storybook](https://design-library.developer.bcc.no).

### Adding a component
Start by creating a new component:
```sh
npm run create-component ComponentName
```
This will also create a stories, test and CSS file for the component.

Every component should be prefixed with `Bcc`, such as `BccButton`. This prevents clashes with local components and native HTML elements.

Every component should have at least one story which shows the default state of the component. See also: [Writing Storybook stories](./writing-storybook-stories.md).

### Do's and Don'ts
See also: [Writing Storybook stories](./writing-storybook-stories.md).

#### Props
##### Follow Figma naming for props
Props should be (if possible) be named like they are named in Figma. Usually designers will create a component in Figma that has properties as well. By keeping these as close as possible it's easier to compare different variants between design and code.

##### Don't abbreviate props
Props should have a clear name that indicates what it is for, without the need to look up documentation. Abbreviations make this harder, especially for non-native speakers. Instead of trying to save on keystrokes (and modern editors will probably autocomplete props anyways), we'll save on potential user frustration.

##### Don't include all attributes as props
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

#### Styling
##### Don't use `<style>` in an SFC
Commonly, a Vue Single File Component (SFC) includes a `script`, `template`, and `style` tag. The use of a `style` tag should be avoided. All CSS should be part of the CSS library, which includes every file from `src/css`.

When necessary, Tailwind utilities can be used for one-off layout issues in the Vue components. But be aware that by not including these CSS properties in the CSS classes, any users that don't use Vue also need to add CSS for this, so do this sparingly.
