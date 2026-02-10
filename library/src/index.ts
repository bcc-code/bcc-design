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

import './style.css';

export { default as BccPreset } from '@bcc-code/design-tokens/primevue';

// ---------------------------------------------------------------------------
// Custom BCC components (not based on PrimeVue)
// ---------------------------------------------------------------------------
export * from './components/custom';

// ---------------------------------------------------------------------------
// Wrapped PrimeVue components (BCC extensions or defaults)
// ---------------------------------------------------------------------------
export {
	BccButton,
	BccInput,
	BccPin,
	BccTabs,
	BccTag,
	type BadgeProps,
	type BccButtonProps,
	type BccInputProps,
	type BccPinProps,
	type BccTabsProps,
	type BccTagProps,
	type ButtonProps,
	type InputTextProps,
	type TabItem,
	type TabsProps,
	type TagProps,
} from './components/wrapped';

// ---------------------------------------------------------------------------
// PrimeVue components (re-exported as PV[ComponentName])
// ---------------------------------------------------------------------------
export { default as PVAccordion } from 'primevue/accordion';
export { default as PVAccordionContent } from 'primevue/accordioncontent';
export { default as PVAccordionHeader } from 'primevue/accordionheader';
export { default as PVAccordionPanel } from 'primevue/accordionpanel';
export { default as PVAccordionTab } from 'primevue/accordiontab';
export { default as PVAnimateOnScroll } from 'primevue/animateonscroll';
export { default as PVAutoComplete } from 'primevue/autocomplete';
export { default as PVAvatar } from 'primevue/avatar';
export { default as PVAvatarGroup } from 'primevue/avatargroup';
export { default as PVBadge } from 'primevue/badge';
export { default as PVBadgeDirective } from 'primevue/badgedirective';
export { default as PVBlockUI } from 'primevue/blockui';
export { default as PVBreadcrumb } from 'primevue/breadcrumb';
export { default as PVButton } from 'primevue/button';
export { default as PVButtonGroup } from 'primevue/buttongroup';
export { default as PVCalendar } from 'primevue/calendar';
export { default as PVCard } from 'primevue/card';
export { default as PVCarousel } from 'primevue/carousel';
export { default as PVCascadeSelect } from 'primevue/cascadeselect';
export { default as PVCheckbox } from 'primevue/checkbox';
export { default as PVCheckboxGroup } from 'primevue/checkboxgroup';
export { default as PVChip } from 'primevue/chip';
export { default as PVChips } from 'primevue/chips';
export { default as PVColorPicker } from 'primevue/colorpicker';
export { default as PVColumn } from 'primevue/column';
export { default as PVColumnGroup } from 'primevue/columngroup';
export { default as PVConfig } from 'primevue/config';
export { default as PVConfirmationEventBus } from 'primevue/confirmationeventbus';
export { default as PVConfirmationService } from 'primevue/confirmationservice';
export { default as PVConfirmDialog } from 'primevue/confirmdialog';
export { default as PVConfirmPopup } from 'primevue/confirmpopup';
export { default as PVContextMenu } from 'primevue/contextmenu';
export { default as PVDataTable } from 'primevue/datatable';
export { default as PVDataView } from 'primevue/dataview';
export { default as PVDatePicker } from 'primevue/datepicker';
export { default as PVDeferredContent } from 'primevue/deferredcontent';
export { default as PVDialog } from 'primevue/dialog';
export { default as PVDialogService } from 'primevue/dialogservice';
export { default as PVDivider } from 'primevue/divider';
export { default as PVDock } from 'primevue/dock';
export { default as PVDrawer } from 'primevue/drawer';
export { default as PVDropdown } from 'primevue/dropdown';
export { default as PVDynamicDialog } from 'primevue/dynamicdialog';
export { default as PVDynamicDialogEventBus } from 'primevue/dynamicdialogeventbus';
export { default as PVFieldset } from 'primevue/fieldset';
export { default as PVFileUpload } from 'primevue/fileupload';
export { default as PVFloatLabel } from 'primevue/floatlabel';
export { default as PVFluid } from 'primevue/fluid';
export { default as PVFocusTrap } from 'primevue/focustrap';
export { default as PVGalleria } from 'primevue/galleria';
export { default as PVIconField } from 'primevue/iconfield';
export { default as PVIftaLabel } from 'primevue/iftalabel';
export { default as PVImage } from 'primevue/image';
export { default as PVImageCompare } from 'primevue/imagecompare';
export { default as PVInplace } from 'primevue/inplace';
export { default as PVInputChips } from 'primevue/inputchips';
export { default as PVInputGroup } from 'primevue/inputgroup';
export { default as PVInputGroupAddon } from 'primevue/inputgroupaddon';
export { default as PVInputIcon } from 'primevue/inputicon';
export { default as PVInputMask } from 'primevue/inputmask';
export { default as PVInputNumber } from 'primevue/inputnumber';
export { default as PVInputOtp } from 'primevue/inputotp';
export { default as PVInputSwitch } from 'primevue/inputswitch';
export { default as PVInputText } from 'primevue/inputtext';
export { default as PVKeyFilter } from 'primevue/keyfilter';
export { default as PVKnob } from 'primevue/knob';
export { default as PVListbox } from 'primevue/listbox';
export { default as PVMegaMenu } from 'primevue/megamenu';
export { default as PVMenu } from 'primevue/menu';
export { default as PVMenubar } from 'primevue/menubar';
export { default as PVMessage } from 'primevue/message';
export { default as PVMeterGroup } from 'primevue/metergroup';
export { default as PVMultiSelect } from 'primevue/multiselect';
export { default as PVOrderList } from 'primevue/orderlist';
export { default as PVOrganizationChart } from 'primevue/organizationchart';
export { default as PVOverlayBadge } from 'primevue/overlaybadge';
export { default as PVOverlayEventBus } from 'primevue/overlayeventbus';
export { default as PVOverlayPanel } from 'primevue/overlaypanel';
export { default as PVPaginator } from 'primevue/paginator';
export { default as PVPanel } from 'primevue/panel';
export { default as PVPanelMenu } from 'primevue/panelmenu';
export { default as PVPassword } from 'primevue/password';
export { default as PVPickList } from 'primevue/picklist';
export { default as PVPopover } from 'primevue/popover';
export { default as PVPortal } from 'primevue/portal';
export { default as PVProgressBar } from 'primevue/progressbar';
export { default as PVProgressSpinner } from 'primevue/progressspinner';
export { default as PVRadioButton } from 'primevue/radiobutton';
export { default as PVRadioButtonGroup } from 'primevue/radiobuttongroup';
export { default as PVRating } from 'primevue/rating';
export { default as PVRipple } from 'primevue/ripple';
export { default as PVRow } from 'primevue/row';
export { default as PVScrollPanel } from 'primevue/scrollpanel';
export { default as PVScrollTop } from 'primevue/scrolltop';
export { default as PVSelect } from 'primevue/select';
export { default as PVSelectButton } from 'primevue/selectbutton';
export { default as PVSidebar } from 'primevue/sidebar';
export { default as PVSkeleton } from 'primevue/skeleton';
export { default as PVSlider } from 'primevue/slider';
export { default as PVSpeedDial } from 'primevue/speeddial';
export { default as PVSplitButton } from 'primevue/splitbutton';
export { default as PVSplitter } from 'primevue/splitter';
export { default as PVSplitterPanel } from 'primevue/splitterpanel';
export { default as PVStep } from 'primevue/step';
export { default as PVStepItem } from 'primevue/stepitem';
export { default as PVStepList } from 'primevue/steplist';
export { default as PVStepPanel } from 'primevue/steppanel';
export { default as PVStepPanels } from 'primevue/steppanels';
export { default as PVStepper } from 'primevue/stepper';
export { default as PVSteps } from 'primevue/steps';
export { default as PVStyleClass } from 'primevue/styleclass';
export { default as PVTab } from 'primevue/tab';
export { default as PVTabList } from 'primevue/tablist';
export { default as PVTabMenu } from 'primevue/tabmenu';
export { default as PVTabPanel } from 'primevue/tabpanel';
export { default as PVTabPanels } from 'primevue/tabpanels';
export { default as PVTabs } from 'primevue/tabs';
export { default as PVTabView } from 'primevue/tabview';
export { default as PVTag } from 'primevue/tag';
export { default as PVTerminal } from 'primevue/terminal';
export { default as PVTerminalService } from 'primevue/terminalservice';
export { default as PVTextarea } from 'primevue/textarea';
export { default as PVTieredMenu } from 'primevue/tieredmenu';
export { default as PVTimeline } from 'primevue/timeline';
export { default as PVToast } from 'primevue/toast';
export { default as PVToastEventBus } from 'primevue/toasteventbus';
export { default as PVToastService } from 'primevue/toastservice';
export { default as PVToggleButton } from 'primevue/togglebutton';
export { default as PVToggleSwitch } from 'primevue/toggleswitch';
export { default as PVToolbar } from 'primevue/toolbar';
export { default as PVTooltip } from 'primevue/tooltip';
export { default as PVTree } from 'primevue/tree';
export { default as PVTreeSelect } from 'primevue/treeselect';
export { default as PVTreeTable } from 'primevue/treetable';
export { default as PVVirtualScroller } from 'primevue/virtualscroller';

export { useToast } from 'primevue/usetoast';
