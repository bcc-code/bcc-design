import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import { BccInput, BccTextarea, BccSelect, BccInputChips, BccCheckbox } from '../../index';

const meta: Meta = {
	title: 'Form States Demo',
	parameters: {
		docs: {
			description: {
				component: 'Form components demonstrating normal, readonly, and disabled states',
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const NormalState: Story = {
	render: () =>
		({
			components: { BccInput, BccTextarea, BccSelect, BccInputChips, BccCheckbox },
			setup() {
				const text = ref('Sample text');
				const textarea = ref('Sample textarea content');
				const selected = ref('option2');
				const chips = ref(['tag1', 'tag2']);
				const checked = ref(true);

				const options = [
					{ label: 'Option 1', value: 'option1' },
					{ label: 'Option 2', value: 'option2' },
					{ label: 'Option 3', value: 'option3' },
				];

				return { text, textarea, selected, chips, checked, options };
			},
			template: `
			<div class="space-y-6 p-6">
				<h2 class="text-2xl font-bold">Normal State</h2>

				<div class="space-y-4">
					<div>
						<label class="mb-2 block font-semibold">Text Input</label>
						<BccInput v-model="text" placeholder="Enter text" />
					</div>

					<div>
						<label class="mb-2 block font-semibold">Textarea</label>
						<BccTextarea v-model="textarea" placeholder="Enter text" rows="4" />
					</div>

					<div>
						<label class="mb-2 block font-semibold">Select</label>
						<BccSelect v-model="selected" :options="options" optionLabel="label" optionValue="value" />
					</div>

					<div>
						<label class="mb-2 block font-semibold">Input Chips</label>
						<BccInputChips v-model="chips" />
					</div>

					<div class="flex items-center gap-3">
						<BccCheckbox v-model="checked" />
						<label class="font-semibold">Checkbox (checked)</label>
					</div>
				</div>
			</div>
		`,
		}) as unknown as Story,
};

export const ReadonlyState: Story = {
	render: () =>
		({
			components: { BccInput, BccTextarea, BccSelect, BccInputChips, BccCheckbox },
			setup() {
				const text = ref('Sample text');
				const textarea = ref('Sample textarea content');
				const selected = ref('option2');
				const chips = ref(['tag1', 'tag2']);
				const checked = ref(true);

				const options = [
					{ label: 'Option 1', value: 'option1' },
					{ label: 'Option 2', value: 'option2' },
					{ label: 'Option 3', value: 'option3' },
				];

				return { text, textarea, selected, chips, checked, options };
			},
			template: `
			<div class="space-y-6 p-6">
				<h2 class="text-2xl font-bold">Readonly State</h2>

				<div class="space-y-4">
					<div>
						<label class="mb-2 block font-semibold">Text Input</label>
						<BccInput v-model="text" placeholder="Enter text" readonly />
					</div>

					<div>
						<label class="mb-2 block font-semibold">Textarea</label>
						<BccTextarea v-model="textarea" placeholder="Enter text" readonly rows="4" />
					</div>

					<div>
						<label class="mb-2 block font-semibold">Select</label>
						<BccSelect v-model="selected" :options="options" optionLabel="label" optionValue="value" readonly />
					</div>

					<div>
						<label class="mb-2 block font-semibold">Input Chips</label>
						<BccInputChips v-model="chips" readonly />
					</div>

					<div class="flex items-center gap-3">
						<BccCheckbox v-model="checked" readonly />
						<label class="font-semibold">Checkbox (checked)</label>
					</div>
				</div>
			</div>
		`,
		}) as unknown as Story,
};

export const DisabledState: Story = {
	render: () =>
		({
			components: { BccInput, BccTextarea, BccSelect, BccInputChips, BccCheckbox },
			setup() {
				const text = ref('Sample text');
				const textarea = ref('Sample textarea content');
				const selected = ref('option2');
				const chips = ref(['tag1', 'tag2']);
				const checked = ref(true);

				const options = [
					{ label: 'Option 1', value: 'option1' },
					{ label: 'Option 2', value: 'option2' },
					{ label: 'Option 3', value: 'option3' },
				];

				return { text, textarea, selected, chips, checked, options };
			},
			template: `
			<div class="space-y-6 p-6">
				<h2 class="text-2xl font-bold">Disabled State</h2>

				<div class="space-y-4">
					<div>
						<label class="mb-2 block font-semibold">Text Input</label>
						<BccInput v-model="text" placeholder="Enter text" disabled />
					</div>

					<div>
						<label class="mb-2 block font-semibold">Textarea</label>
						<BccTextarea v-model="textarea" placeholder="Enter text" disabled rows="4" />
					</div>

					<div>
						<label class="mb-2 block font-semibold">Select</label>
						<BccSelect v-model="selected" :options="options" optionLabel="label" optionValue="value" disabled />
					</div>

					<div>
						<label class="mb-2 block font-semibold">Input Chips</label>
						<BccInputChips v-model="chips" disabled />
					</div>

					<div class="flex items-center gap-3">
						<BccCheckbox v-model="checked" disabled />
						<label class="font-semibold">Checkbox (checked)</label>
					</div>
				</div>
			</div>
		`,
		}) as unknown as Story,
};

export const AllStatesComparison: Story = {
	render: () =>
		({
			components: { BccInput, BccTextarea, BccSelect, BccInputChips, BccCheckbox },
			setup() {
				const options = [
					{ label: 'Option 1', value: 'option1' },
					{ label: 'Option 2', value: 'option2' },
					{ label: 'Option 3', value: 'option3' },
				];

				return { options };
			},
			template: `
			<div class="space-y-8 p-6">
				<h1 class="text-3xl font-bold">Form States Comparison</h1>

				<!-- Normal State -->
				<div class="space-y-4 rounded-lg border-2 border-gray-300 p-4">
					<h2 class="text-xl font-bold">Normal State</h2>

					<div>
						<label class="mb-2 block font-semibold">Text Input</label>
						<BccInput placeholder="Enter text" />
					</div>

					<div>
						<label class="mb-2 block font-semibold">Textarea</label>
						<BccTextarea placeholder="Enter text" rows="3" />
					</div>

					<div>
						<label class="mb-2 block font-semibold">Select</label>
						<BccSelect :options="options" optionLabel="label" optionValue="value" />
					</div>

					<div>
						<label class="mb-2 block font-semibold">Input Chips</label>
						<BccInputChips />
					</div>

					<div class="flex items-center gap-3">
						<BccCheckbox />
						<label class="font-semibold">Checkbox</label>
					</div>
				</div>

				<!-- Readonly State -->
				<div class="space-y-4 rounded-lg border-2 border-orange-300 p-4">
					<h2 class="text-xl font-bold">Readonly State</h2>

					<div>
						<label class="mb-2 block font-semibold">Text Input</label>
						<BccInput placeholder="Sample text" readonly />
					</div>

					<div>
						<label class="mb-2 block font-semibold">Textarea</label>
						<BccTextarea placeholder="Sample textarea content" rows="3" readonly />
					</div>

					<div>
						<label class="mb-2 block font-semibold">Select</label>
						<BccSelect :options="options" optionLabel="label" optionValue="value" readonly />
					</div>

					<div>
						<label class="mb-2 block font-semibold">Input Chips</label>
						<BccInputChips readonly />
					</div>

					<div class="flex items-center gap-3">
						<BccCheckbox readonly />
						<label class="font-semibold">Checkbox</label>
					</div>
				</div>

				<!-- Disabled State -->
				<div class="space-y-4 rounded-lg border-2 border-red-300 p-4">
					<h2 class="text-xl font-bold">Disabled State</h2>

					<div>
						<label class="mb-2 block font-semibold">Text Input</label>
						<BccInput placeholder="Sample text" disabled />
					</div>

					<div>
						<label class="mb-2 block font-semibold">Textarea</label>
						<BccTextarea placeholder="Sample textarea content" rows="3" disabled />
					</div>

					<div>
						<label class="mb-2 block font-semibold">Select</label>
						<BccSelect :options="options" optionLabel="label" optionValue="value" disabled />
					</div>

					<div>
						<label class="mb-2 block font-semibold">Input Chips</label>
						<BccInputChips disabled />
					</div>

					<div class="flex items-center gap-3">
						<BccCheckbox disabled />
						<label class="font-semibold">Checkbox</label>
					</div>
				</div>
			</div>
		`,
		}) as unknown as Story,
};
