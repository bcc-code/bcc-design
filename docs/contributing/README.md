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
