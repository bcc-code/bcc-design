import BccButton from '@/components/wrapped/BccButton.vue';
import { OpenInNewIcon } from '@bcc-code/icons-vue';
import type { Meta, StoryObj } from '@storybook/vue3';

/**
 * PrimeVue components that don’t have local stories yet.
 * Use the links below to open the official PrimeVue documentation.
 */
const COMPONENTS_WITHOUT_STORIES: { name: string; slug: string }[] = [
	{ name: 'BlockUI', slug: 'blockui' },
	{ name: 'Button', slug: 'button' },
	{ name: 'Carousel', slug: 'carousel' },
	{ name: 'CascadeSelect', slug: 'cascadeselect' },
	{ name: 'ColorPicker', slug: 'colorpicker' },
	{ name: 'ConfirmDialog', slug: 'confirmdialog' },
	{ name: 'ConfirmPopup', slug: 'confirmpopup' },
	{ name: 'ContextMenu', slug: 'contextmenu' },
	{ name: 'DataView', slug: 'dataview' },
	{ name: 'Dock', slug: 'dock' },
	{ name: 'FileUpload', slug: 'fileupload' },
	{ name: 'FloatLabel', slug: 'floatlabel' },
	{ name: 'Galleria', slug: 'galleria' },
	{ name: 'Image', slug: 'image' },
	{ name: 'Inplace', slug: 'inplace' },
	{ name: 'InputMask', slug: 'inputmask' },
	{ name: 'InputText', slug: 'inputtext' },
	{ name: 'Knob', slug: 'knob' },
	{ name: 'MegaMenu', slug: 'megamenu' },
	{ name: 'Menubar', slug: 'menubar' },
	{ name: 'OrderList', slug: 'orderlist' },
	{ name: 'OrganizationChart', slug: 'organizationchart' },
	{ name: 'PanelMenu', slug: 'panelmenu' },
	{ name: 'PickList', slug: 'picklist' },
	{ name: 'Popover', slug: 'popover' },
	{ name: 'SpeedDial', slug: 'speeddial' },
	{ name: 'SplitButton', slug: 'splitbutton' },
	{ name: 'Steps', slug: 'steps' },
	{ name: 'Tag', slug: 'tag' },
	{ name: 'Terminal', slug: 'terminal' },
	{ name: 'TieredMenu', slug: 'tieredmenu' },
	{ name: 'ToggleButton', slug: 'togglebutton' },
	{ name: 'TreeTable', slug: 'treetable' },
	{ name: 'VirtualScroller', slug: 'virtualscroller' },
];

const BASE_URL = 'https://primevue.org';

const meta = {
	title: 'PrimeVue/BccReference',
	parameters: {
		docs: {
			description: {
				component: 'Links to PrimeVue documentation for components that do not have local stories in this library.',
			},
		},
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const OtherComponents: Story = {
	render: () => ({
		components: { BccButton, OpenInNewIcon },
		setup() {
			return { components: COMPONENTS_WITHOUT_STORIES, baseUrl: BASE_URL, BccButton, OpenInNewIcon };
		},
		template: `
			<div class="space-y-2 max-w-2xl">
				<p class="text-surface-600 dark:text-surface-400 mb-4">
					The following PrimeVue components are available in the library but do not have local stories.
					Click a link to open the official documentation on primevue.org.
				</p>
				<div class="flex flex-wrap gap-4">
					<BccButton v-for="c in components" :key="c.slug"
						variant="link"
						as="a"
						:href="baseUrl + '/' + c.slug"
						target="_blank"
						rel="noopener noreferrer"
						:label="c.name"
						:icon="OpenInNewIcon"
						icon-right
					>					
					</BccButton>
				</div>
			</div>
		`,
	}),
};
