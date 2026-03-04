---
sectionTitle: Components
sectionOrder: 30
title: Overview
order: 1
---

# Components

The `@bcc-code/component-library-vue` package provides wrapped PrimeVue components and custom BCC components. All components can be previewed in [Storybook](https://components.bcc.no).

```bash
npm install @bcc-code/component-library-vue
```

## Wrapped Components

These wrap PrimeVue components with additional features like Vue component icons, context-aware styling, and simplified APIs.

| Component                          | Description                        | Links                                                                                                                             |
| ---------------------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| [BccButton](./button.md)          | Actions and navigation             | [Storybook](https://components.bcc.no/?path=/docs/wrapped-bccbutton--docs) · [PrimeVue](https://primevue.org/button/)             |
| [BccCheckbox](./checkbox.md)      | Binary selection control           | [Storybook](https://components.bcc.no/?path=/docs/wrapped-bcccheckbox--docs) · [PrimeVue](https://primevue.org/checkbox/)         |
| [BccInput](./input.md)            | Single-line text input             | [Storybook](https://components.bcc.no/?path=/docs/wrapped-bccinput--docs) · [PrimeVue](https://primevue.org/inputtext/)           |
| [BccMessage](./message.md)        | Inline notification message        | [Storybook](https://components.bcc.no/?path=/docs/wrapped-bccmessage--docs) · [PrimeVue](https://primevue.org/message/)           |
| [BccAvatar](./avatar.md)          | User or entity representation      | [Storybook](https://components.bcc.no/?path=/docs/wrapped-bccavatar--docs) · [PrimeVue](https://primevue.org/avatar/)             |
| [BccChip](./chip.md)              | Compact element for tags/contacts  | [Storybook](https://components.bcc.no/?path=/docs/wrapped-bccchip--docs) · [PrimeVue](https://primevue.org/chip/)                 |
| [BccTabs](./tabs.md)              | Tabbed content navigation          | [Storybook](https://components.bcc.no/?path=/docs/wrapped-bcctabs--docs) · [PrimeVue](https://primevue.org/tabs/)                 |
| [BccToggle](./toggle-switch.md)   | On/off toggle control              | [Storybook](https://components.bcc.no/?path=/docs/wrapped-bcctoggle--docs) · [PrimeVue](https://primevue.org/toggleswitch/)       |
| [BccToggleButton](./toggle-button.md) | Toggle button with labels      | [Storybook](https://components.bcc.no/?path=/docs/wrapped-bcctogglebutton--docs) · [PrimeVue](https://primevue.org/togglebutton/) |

## Custom Components

Purpose-built components not available in PrimeVue.

| Component                                           | Description                              | Storybook                                                                          |
| --------------------------------------------------- | ---------------------------------------- | ---------------------------------------------------------------------------------- |
| [BccBadge](./bcc-badge.md)                          | Context-aware badge with semantic colors | [Preview](https://components.bcc.no/?path=/docs/custom-bccbadge--docs)             |
| [BccCapacityIndicator](./bcc-capacity-indicator.md) | Visual capacity/usage indicator          | [Preview](https://components.bcc.no/?path=/docs/custom-bcccapacityindicator--docs) |
| [BccDialKnob](./bcc-dial-knob.md)                   | Rotary dial input control                | [Preview](https://components.bcc.no/?path=/docs/feedback-bccdialknob--docs)        |
| [BccFrame](./bcc-frame.md)                          | Styled content frame/container           | [Preview](https://components.bcc.no/?path=/docs/custom-bccframe--docs)             |
| [BccGraphic](./bcc-graphic.md)                      | Decorative graphic element               | [Preview](https://components.bcc.no/?path=/docs/custom-bccgraphic--docs)           |
| [BccNpsResult](./bcc-nps-result.md)                 | NPS survey result visualization          | [Preview](https://components.bcc.no/?path=/docs/feedback-bccnpsresult--docs)       |
| [BccNpsScore](./bcc-nps-score.md)                   | NPS score input widget                   | [Preview](https://components.bcc.no/?path=/docs/feedback-bccnpsscore--docs)        |
| [BccStepIndicator](./bcc-step-indicator.md)         | Multi-step progress indicator            | [Preview](https://components.bcc.no/?path=/docs/custom-bccstepindicator--docs)     |
| [BccTag](./bcc-tag.md)                              | Semantic tag with context colors         | [Preview](https://components.bcc.no/?path=/docs/custom-bcctag--docs)               |
| [BccCircleLoader](./bcc-circle-loader.md)           | Circular loading spinner                 | —                                                                                  |
| [BccReact](./bcc-react.md)                          | Emoji reaction component                 | —                                                                                  |

---

## More PrimeVue Components

The BCC design tokens preset (`@bcc-code/design-tokens/primevue`) automatically styles **all** PrimeVue components. You don't need the component library for these — just use PrimeVue directly.

Browse the full PrimeVue component catalog at [primevue.org](https://primevue.org/). See how they look with BCC tokens in [Storybook](https://components.bcc.no).

Components with Storybook previews include: Accordion, AutoComplete, Breadcrumb, Card, DataTable, DatePicker, Dialog, Divider, Drawer, Fieldset, InputNumber, Listbox, Menu, MultiSelect, OverlayBadge, Paginator, Panel, Password, ProgressBar, ProgressSpinner, RadioButton, Rating, Select, SelectButton, Skeleton, Slider, Splitter, Tabs, Textarea, Timeline, Toast, Toolbar, Tooltip, Tree, TreeSelect.
