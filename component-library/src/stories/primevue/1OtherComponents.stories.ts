import BccButton from '@/components/wrapped/BccButton.vue';
import { OpenInNewIcon } from '@bcc-code/icons-vue';
import type { Meta, StoryObj } from '@storybook/vue3';

/**
 * PrimeVue components that don’t have local stories yet.
 * Use the links below to open the official PrimeVue documentation.
 */
const COMPONENTS_WITHOUT_STORIES: { name: string; slug: string; description: string }[] = [
	{ name: 'BlockUI', slug: 'blockui', description: 'Blocks the page or a container while content is loading.' },
	{
		name: 'CascadeSelect',
		slug: 'cascadeselect',
		description: 'Dropdown with nested options in a hierarchical structure.',
	},
	{ name: 'ColorPicker', slug: 'colorpicker', description: 'Input for choosing a color (hex, RGB, HSL).' },
	{
		name: 'ConfirmPopup',
		slug: 'confirmpopup',
		description: 'Confirmation dialog triggered next to a target element.',
	},
	{ name: 'ContextMenu', slug: 'contextmenu', description: 'Menu shown on right-click over a target.' },
	{ name: 'DataView', slug: 'dataview', description: 'Displays data in grid or list layout with pagination.' },
	{ name: 'Dock', slug: 'dock', description: 'Dock bar for quick access to items (e.g. macOS-style).' },
	{ name: 'FileUpload', slug: 'fileupload', description: 'File upload with drag & drop, progress, and validation.' },
	{
		name: 'FloatLabel',
		slug: 'floatlabel',
		description: 'Floating label that moves when the input is focused or filled.',
	},
	{ name: 'Galleria', slug: 'galleria', description: 'Image gallery with thumbnails and full-screen view.' },
	{ name: 'Inplace', slug: 'inplace', description: 'Inline editing: display content that becomes editable on click.' },
	{ name: 'InputMask', slug: 'inputmask', description: 'Text input with a mask for dates, phone numbers, etc.' },
	{ name: 'InputText', slug: 'inputtext', description: 'Basic single-line text input.' },
	{ name: 'Knob', slug: 'knob', description: 'Circular input for numeric values (e.g. volume, brightness).' },
	{ name: 'MegaMenu', slug: 'megamenu', description: 'Horizontal menu with multi-column dropdown panels.' },
	{ name: 'Menubar', slug: 'menubar', description: 'Horizontal navigation bar with nested dropdown menus.' },
	{ name: 'OrderList', slug: 'orderlist', description: 'Reorderable list for sorting items between two lists.' },
	{
		name: 'OrganizationChart',
		slug: 'organizationchart',
		description: 'Hierarchical tree visualization (e.g. org chart).',
	},
	{ name: 'PanelMenu', slug: 'panelmenu', description: 'Vertical menu with expandable panels.' },
	{ name: 'PickList', slug: 'picklist', description: 'Transfer list to move items between source and target.' },
	{ name: 'Popover', slug: 'popover', description: 'Overlay panel attached to a trigger element.' },
	{ name: 'SpeedDial', slug: 'speeddial', description: 'FAB that expands to show multiple action buttons.' },
	{ name: 'SplitButton', slug: 'splitbutton', description: 'Button with a dropdown for secondary actions.' },
	{ name: 'Steps', slug: 'steps', description: 'Stepper / wizard indicator for multi-step flows.' },
	{ name: 'Tag', slug: 'tag', description: 'Label or badge for categories, status, or counts.' },
	{ name: 'Terminal', slug: 'terminal', description: 'Terminal-style text output and command input.' },
	{ name: 'TieredMenu', slug: 'tieredmenu', description: 'Nested menu that opens submenus in a tiered layout.' },
	{ name: 'TreeTable', slug: 'treetable', description: 'Table with expandable rows for hierarchical data.' },
	{
		name: 'VirtualScroller',
		slug: 'virtualscroller',
		description: 'Efficient scrolling for large lists via virtualization.',
	},
];

const BASE_URL = 'https://primevue.org';

const meta = {
	title: 'PrimeVue/AllOtherComponents',
	parameters: {
		docs: {
			description: {
				component:
					'Links to PrimeVue documentation for components that do not have local stories in this library. [Browse PrimeVue docs →](https://primevue.org)',
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
			<div class="max-w-4xl">
				<p class="text-surface-600 dark:text-surface-400 mb-4">
					The following PrimeVue components are available in the library but do not have local stories.
					Click a link to open the official documentation on primevue.org.
				</p>
				<div class="overflow-x-auto rounded-lg border border-surface-200 dark:border-surface-700">
					<table class="w-full text-left text-sm">
						<thead class="bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300">
							<tr>
								<th class="px-4 py-3 font-semibold">Component</th>
								<th class="px-4 py-3 font-semibold">Description</th>
								<th class="px-4 py-3 font-semibold w-28 text-right">Docs</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-surface-200 dark:divide-surface-700">
							<tr v-for="c in components" :key="c.slug"
								class="bg-surface-0 dark:bg-surface-900 hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors"
							>
								<td class="px-4 py-3 font-medium text-surface-900 dark:text-surface-100">{{ c.name }}</td>
								<td class="px-4 py-3 text-surface-600 dark:text-surface-400">{{ c.description }}</td>
								<td class="px-4 py-3 text-right">
									<BccButton
										variant="link"
										size="sm"
										as="a"
										:href="baseUrl + '/' + c.slug"
										target="_blank"
										rel="noopener noreferrer"
										label="Open"
										:icon="OpenInNewIcon"
										icon-right
									/>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		`,
	}),
};
