/**
 * @bcc-code/component-library-vue
 *
 * Vue component library with PrimeVue and BCC design tokens. You only need this
 * package: no separate Tailwind or PrimeVue install.
 *
 * Usage: In your main.ts file, import the library and use the setup function.
 *  import { BccComponentLibrary } from '@bcc-code/component-library-vue';
 *  app.use(BccComponentLibrary);
 *
 * For styling, you have two options:
 * 1. Recommended (full Tailwind: utility classes + tree-shaking in your app):
 *    - vite.config: plugins: [..., tailwindcss()] with import tailwindcss from '@tailwindcss/vite'
 *    - Main CSS file: @import "@bcc-code/component-library-vue/theme.css";
 *    Tailwind runs in your build and only bundles classes you use.
 * 2. Alternative: Pre-built CSS only (no Tailwind in your app; library styles + components only):
 *    - main.ts: import "@bcc-code/component-library-vue/style.css";
 */

import './style.css';

export { default as BccPreset } from '@bcc-code/design-tokens/primevue';
export { BCC_CONTEXTS, type BCC_CONTEXT } from './contexts';
export { default as BccComponentLibrary } from './setup';

export * from './types';

// ---------------------------------------------------------------------------
// Custom BCC components (not based on PrimeVue)
// ---------------------------------------------------------------------------
export * from './components/custom';

// ---------------------------------------------------------------------------
// Wrapped PrimeVue components (BCC extensions or defaults)
// ---------------------------------------------------------------------------
export * from './components/wrapped';

// ---------------------------------------------------------------------------
// PrimeVue components (re-exported as Bcc[ComponentName])
// ---------------------------------------------------------------------------
export { default as BccAccordion } from 'primevue/accordion';
export { default as BccAccordionContent } from 'primevue/accordioncontent';
export { default as BccAccordionHeader } from 'primevue/accordionheader';
export { default as BccAccordionPanel } from 'primevue/accordionpanel';
export { default as BccAccordionTab } from 'primevue/accordiontab';
export { default as BccAnimateOnScroll } from 'primevue/animateonscroll';
export { default as BccAutoComplete } from 'primevue/autocomplete';
export { default as BccAvatar } from 'primevue/avatar';
export { default as BccAvatarGroup } from 'primevue/avatargroup';
export { default as BccBadgeDirective } from 'primevue/badgedirective';
export { default as BccBlockUI } from 'primevue/blockui';
export { default as BccBreadcrumb } from 'primevue/breadcrumb';
export { default as BccButtonGroup } from 'primevue/buttongroup';
export { default as BccCard } from 'primevue/card';
export { default as BccCarousel } from 'primevue/carousel';
export { default as BccCascadeSelect } from 'primevue/cascadeselect';
export { default as BccCheckboxGroup } from 'primevue/checkboxgroup';
export { default as BccChip } from 'primevue/chip';
export { default as BccChips } from 'primevue/chips';
export { default as BccColorPicker } from 'primevue/colorpicker';
export { default as BccColumn } from 'primevue/column';
export { default as BccColumnGroup } from 'primevue/columngroup';
export { default as BccConfig } from 'primevue/config';
export { default as BccConfirmDialog } from 'primevue/confirmdialog';
export { default as BccConfirmPopup } from 'primevue/confirmpopup';
export { default as BccContextMenu } from 'primevue/contextmenu';
export { default as BccDataTable } from 'primevue/datatable';
export { default as BccDataView } from 'primevue/dataview';
export { default as BccDatePicker } from 'primevue/datepicker';
export { default as BccDeferredContent } from 'primevue/deferredcontent';
export { default as BccDialog } from 'primevue/dialog';
export { default as BccDivider } from 'primevue/divider';
export { default as BccDock } from 'primevue/dock';
export { default as BccDrawer } from 'primevue/drawer';
export { default as BccDynamicDialog } from 'primevue/dynamicdialog';
export { default as BccFieldset } from 'primevue/fieldset';
export { default as BccFileUpload } from 'primevue/fileupload';
export { default as BccFloatLabel } from 'primevue/floatlabel';
export { default as BccFluid } from 'primevue/fluid';
export { default as BccFocusTrap } from 'primevue/focustrap';
export { default as BccGalleria } from 'primevue/galleria';
export { default as BccIconField } from 'primevue/iconfield';
export { default as BccIftaLabel } from 'primevue/iftalabel';
export { default as BccImage } from 'primevue/image';
export { default as BccImageCompare } from 'primevue/imagecompare';
export { default as BccInplace } from 'primevue/inplace';
export { default as BccInputChips } from 'primevue/inputchips';
export { default as BccInputGroup } from 'primevue/inputgroup';
export { default as BccInputGroupAddon } from 'primevue/inputgroupaddon';
export { default as BccInputIcon } from 'primevue/inputicon';
export { default as BccInputMask } from 'primevue/inputmask';
export { default as BccInputNumber } from 'primevue/inputnumber';
export { default as BccInputOtp } from 'primevue/inputotp';
export { default as BccInputText } from 'primevue/inputtext';
export { default as BccKeyFilter } from 'primevue/keyfilter';
// BccKnob is the custom component from ./components/custom (with left/right/default slots)
export { default as BccListbox } from 'primevue/listbox';
export { default as BccMegaMenu } from 'primevue/megamenu';
export { default as BccMenu } from 'primevue/menu';
export { default as BccMenubar } from 'primevue/menubar';
export { default as BccMeterGroup } from 'primevue/metergroup';
export { default as BccMultiSelect } from 'primevue/multiselect';
export { default as BccOrderList } from 'primevue/orderlist';
export { default as BccOrganizationChart } from 'primevue/organizationchart';
export { default as BccOverlayBadge } from 'primevue/overlaybadge';
export { default as BccPaginator } from 'primevue/paginator';
export { default as BccPanel } from 'primevue/panel';
export { default as BccPanelMenu } from 'primevue/panelmenu';
export { default as BccPassword } from 'primevue/password';
export { default as BccPickList } from 'primevue/picklist';
export { default as BccPopover } from 'primevue/popover';
export { default as BccPortal } from 'primevue/portal';
export { default as BccProgressBar } from 'primevue/progressbar';
export { default as BccProgressSpinner } from 'primevue/progressspinner';
export { default as BccRadioButton } from 'primevue/radiobutton';
export { default as BccRadioButtonGroup } from 'primevue/radiobuttongroup';
export { default as BccRating } from 'primevue/rating';
export { default as BccRipple } from 'primevue/ripple';
export { default as BccRow } from 'primevue/row';
export { default as BccScrollPanel } from 'primevue/scrollpanel';
export { default as BccScrollTop } from 'primevue/scrolltop';
export { default as BccSelect } from 'primevue/select';
export { default as BccSelectButton } from 'primevue/selectbutton';
export { default as BccSkeleton } from 'primevue/skeleton';
export { default as BccSlider } from 'primevue/slider';
export { default as BccSpeedDial } from 'primevue/speeddial';
export { default as BccSplitButton } from 'primevue/splitbutton';
export { default as BccSplitter } from 'primevue/splitter';
export { default as BccSplitterPanel } from 'primevue/splitterpanel';
export { default as BccStep } from 'primevue/step';
export { default as BccStepItem } from 'primevue/stepitem';
export { default as BccStepList } from 'primevue/steplist';
export { default as BccStepPanel } from 'primevue/steppanel';
export { default as BccStepPanels } from 'primevue/steppanels';
export { default as BccStepper } from 'primevue/stepper';
export { default as BccSteps } from 'primevue/steps';
export { default as BccStyleClass } from 'primevue/styleclass';
export { default as BccTab } from 'primevue/tab';
export { default as BccTabList } from 'primevue/tablist';
export { default as BccTabMenu } from 'primevue/tabmenu';
export { default as BccTabPanel } from 'primevue/tabpanel';
export { default as BccTabPanels } from 'primevue/tabpanels';
export { default as PrimevueTabs } from 'primevue/tabs';
export { default as BccTabView } from 'primevue/tabview';
export { default as BccTerminal } from 'primevue/terminal';
export { default as BccTerminalService } from 'primevue/terminalservice';
export { default as BccTextarea } from 'primevue/textarea';
export { default as BccTieredMenu } from 'primevue/tieredmenu';
export { default as BccTimeline } from 'primevue/timeline';
export { default as BccToast } from 'primevue/toast';
export { default as BccToastService } from 'primevue/toastservice';
export { default as BccToggleButton } from 'primevue/togglebutton';
export { default as BccToggleSwitch } from 'primevue/toggleswitch';
export { default as BccToolbar } from 'primevue/toolbar';
export { default as BccTooltip } from 'primevue/tooltip';
export { default as BccTree } from 'primevue/tree';
export { default as BccTreeSelect } from 'primevue/treeselect';
export { default as BccTreeTable } from 'primevue/treetable';
export { default as BccVirtualScroller } from 'primevue/virtualscroller';

/* Composables */
export { useConfirm } from 'primevue/useconfirm';
export { useDialog } from 'primevue/usedialog';
export { useToast } from 'primevue/usetoast';
export { default as useAnimatedNumber } from './composables/animatedNumber';
