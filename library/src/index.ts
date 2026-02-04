/**
 * @bcc-code/component-library
 *
 * Extended Vue component library based on PrimeVue and BCC design tokens.
 * Install this package and use PrimeVue with the BCC preset for full styling.
 *
 * Usage in app:
 *   import { createApp } from "vue";
 *   import PrimeVue from "primevue/config";
 *   import BCCPreset from "@bcc-code/design-tokens/primevue";
 *   import * as Bcc from "@bcc-code/component-library";
 *   import "@bcc-code/component-library/style.css";
 *
 *   const app = createApp(App);
 *   app.use(PrimeVue, { theme: { preset: BCCPreset } });
 *   // Register components as needed, or use Bcc.* in templates
 */

import "./style.css";

export { default as BccPreset } from "@bcc-code/design-tokens/primevue";

// ---------------------------------------------------------------------------
// Custom BCC components (not based on PrimeVue)
// ---------------------------------------------------------------------------
export { BccCard } from "./components/custom";

// ---------------------------------------------------------------------------
// Wrapped PrimeVue components (BCC extensions or defaults)
// ---------------------------------------------------------------------------
export { BccButton } from "./components/wrapped";

// ---------------------------------------------------------------------------
// PrimeVue components (re-exported, use as-is)
// Add more from https://primevue.org/ as needed
// ---------------------------------------------------------------------------
export { default as BCCAccordion } from "primevue/accordion";
export { default as BCCAccordionTab } from "primevue/accordiontab";
export { default as BCCAvatar } from "primevue/avatar";
export { default as BCCBadge } from "primevue/badge";
export { default as BCCBreadcrumb } from "primevue/breadcrumb";
export { default as BCCButton } from "primevue/button";
export { default as BCCCard } from "primevue/card";
export { default as BCCCheckbox } from "primevue/checkbox";
export { default as BCCColumn } from "primevue/column";
export { default as BCCDataTable } from "primevue/datatable";
export { default as BCCDialog } from "primevue/dialog";
export { default as BCCDropdown } from "primevue/dropdown";
export { default as BCCInputText } from "primevue/inputtext";
export { default as BCCMenu } from "primevue/menu";
export { default as BCCMenubar } from "primevue/menubar";
export { default as BCCMessage } from "primevue/message";
export { default as BCCProgressBar } from "primevue/progressbar";
export { default as BCCRadioButton } from "primevue/radiobutton";
export { default as BCCSelectButton } from "primevue/selectbutton";
export { default as BCCSkeleton } from "primevue/skeleton";
export { default as BCCTabPanel } from "primevue/tabpanel";
export { default as BCCTabView } from "primevue/tabview";
export { default as BCCTag } from "primevue/tag";
export { default as BCCToast } from "primevue/toast";
export { default as BCCToastService } from "primevue/toastservice";
export { default as BCCTooltip } from "primevue/tooltip";

