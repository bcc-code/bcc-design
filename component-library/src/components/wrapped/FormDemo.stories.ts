import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import {
	BccInput,
	BccTextarea,
	BccDatePicker,
	BccInputChips,
	BccCheckbox,
	BccButton,
} from '../../index';

const meta: Meta = {
	title: 'Form Demo / Complete Form',
	parameters: {
		docs: {
			description: {
				component: 'Complete form demonstrating all input types with normal, readonly, and disabled states',
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

const FormContent = () => ({
	components: { BccInput, BccTextarea, BccDatePicker, BccInputChips, BccCheckbox, BccButton },
	setup() {
		const form = ref({
			title: 'Project Planning Meeting',
			description: 'Discuss Q4 roadmap and prioritize feature requests',
			startDate: new Date('2024-09-25'),
			endDate: new Date('2024-09-26'),
			tags: ['important', 'meeting', 'planning'],
			active: true,
		});

		return { form };
	},
	template: `
		<div class="w-full space-y-6 p-8">
			<div class="mx-auto max-w-2xl rounded-lg border border-gray-200 p-8">
				<h1 class="mb-6 text-3xl font-bold">Event Details</h1>

				<!-- Title -->
				<div class="mb-6">
					<label for="title" class="mb-2 block font-semibold">Title</label>
					<BccInput
						id="title"
						v-model="form.title"
						placeholder="Enter title"
					/>
				</div>

				<!-- Description -->
				<div class="mb-6">
					<label for="description" class="mb-2 block font-semibold">Description</label>
					<BccTextarea
						id="description"
						v-model="form.description"
						placeholder="Enter description"
						rows="4"
					/>
				</div>

				<!-- Start Date -->
				<div class="mb-6">
					<label for="startDate" class="mb-2 block font-semibold">Start Date</label>
					<BccDatePicker
						id="startDate"
						v-model="form.startDate"
						showIcon
					/>
				</div>

				<!-- End Date -->
				<div class="mb-6">
					<label for="endDate" class="mb-2 block font-semibold">End Date</label>
					<BccDatePicker
						id="endDate"
						v-model="form.endDate"
						showIcon
					/>
				</div>

				<!-- Tags -->
				<div class="mb-6">
					<label for="tags" class="mb-2 block font-semibold">Tags</label>
					<BccInputChips
						id="tags"
						v-model="form.tags"
						placeholder="Add tags..."
					/>
				</div>

				<!-- Active Checkbox -->
				<div class="mb-8 flex items-center gap-3">
					<BccCheckbox
						v-model="form.active"
					/>
					<label class="font-semibold">Active</label>
				</div>

				<!-- Action Buttons -->
				<div class="flex gap-3 border-t border-gray-200 pt-6">
					<BccButton severity="secondary">
						Back
					</BccButton>
					<BccButton class="ml-auto">
						Save
					</BccButton>
					<BccButton severity="danger">
						Delete
					</BccButton>
				</div>
			</div>

			<div class="mx-auto max-w-2xl rounded text-sm text-gray-600">
				Current form data: {{ JSON.stringify(form, null, 2) }}
			</div>
		</div>
	`,
});

export const NormalState: Story = {
	render: FormContent,
};

export const ReadonlyState: Story = {
	render: () => ({
		components: { BccInput, BccTextarea, BccDatePicker, BccInputChips, BccCheckbox, BccButton },
		setup() {
			const form = ref({
				title: 'Project Planning Meeting',
				description: 'Discuss Q4 roadmap and prioritize feature requests',
				startDate: new Date('2024-09-25'),
				endDate: new Date('2024-09-26'),
				tags: ['important', 'meeting', 'planning'],
				active: true,
			});

			return { form };
		},
		template: `
			<div class="w-full space-y-6 p-8">
				<div class="mx-auto max-w-2xl rounded-lg border border-gray-200 p-8">
					<h1 class="mb-6 text-3xl font-bold">Event Details (Read-Only)</h1>

					<div class="mb-4 rounded bg-orange-50 p-4 text-sm text-orange-800">
						This form is in read-only mode. All fields cannot be edited but remain visible.
					</div>

					<!-- Title -->
					<div class="mb-6">
						<label for="title" class="mb-2 block font-semibold">Title</label>
						<BccInput
							id="title"
							v-model="form.title"
							placeholder="Enter title"
							readonly
						/>
					</div>

					<!-- Description -->
					<div class="mb-6">
						<label for="description" class="mb-2 block font-semibold">Description</label>
						<BccTextarea
							id="description"
							v-model="form.description"
							placeholder="Enter description"
							readonly
							rows="4"
						/>
					</div>

					<!-- Start Date -->
					<div class="mb-6">
						<label for="startDate" class="mb-2 block font-semibold">Start Date</label>
						<BccDatePicker
							id="startDate"
							v-model="form.startDate"
							showIcon
							readonly
						/>
					</div>

					<!-- End Date -->
					<div class="mb-6">
						<label for="endDate" class="mb-2 block font-semibold">End Date</label>
						<BccDatePicker
							id="endDate"
							v-model="form.endDate"
							showIcon
							readonly
						/>
					</div>

					<!-- Tags -->
					<div class="mb-6">
						<label for="tags" class="mb-2 block font-semibold">Tags</label>
						<BccInputChips
							id="tags"
							v-model="form.tags"
							placeholder="Add tags..."
							readonly
						/>
					</div>

					<!-- Active Checkbox -->
					<div class="mb-8 flex items-center gap-3">
						<BccCheckbox
							v-model="form.active"
							readonly
						/>
						<label class="font-semibold">Active</label>
					</div>

					<!-- Action Buttons -->
					<div class="flex gap-3 border-t border-gray-200 pt-6">
						<BccButton severity="secondary" disabled>
							Back
						</BccButton>
						<BccButton disabled class="ml-auto">
							Save
						</BccButton>
						<BccButton severity="danger" disabled>
							Delete
						</BccButton>
					</div>
				</div>

				<div class="mx-auto max-w-2xl rounded text-sm text-gray-600">
					Current form data: {{ JSON.stringify(form, null, 2) }}
				</div>
			</div>
		`,
	}),
};

export const DisabledState: Story = {
	render: () => ({
		components: { BccInput, BccTextarea, BccDatePicker, BccInputChips, BccCheckbox, BccButton },
		setup() {
			const form = ref({
				title: 'Project Planning Meeting',
				description: 'Discuss Q4 roadmap and prioritize feature requests',
				startDate: new Date('2024-09-25'),
				endDate: new Date('2024-09-26'),
				tags: ['important', 'meeting', 'planning'],
				active: true,
			});

			return { form };
		},
		template: `
			<div class="w-full space-y-6 p-8">
				<div class="mx-auto max-w-2xl rounded-lg border border-gray-200 p-8">
					<h1 class="mb-6 text-3xl font-bold">Event Details (Disabled)</h1>

					<div class="mb-4 rounded bg-red-50 p-4 text-sm text-red-800">
						This form is in disabled mode. All fields are unavailable and appear faded.
					</div>

					<!-- Title -->
					<div class="mb-6">
						<label for="title" class="mb-2 block font-semibold">Title</label>
						<BccInput
							id="title"
							v-model="form.title"
							placeholder="Enter title"
							disabled
						/>
					</div>

					<!-- Description -->
					<div class="mb-6">
						<label for="description" class="mb-2 block font-semibold">Description</label>
						<BccTextarea
							id="description"
							v-model="form.description"
							placeholder="Enter description"
							disabled
							rows="4"
						/>
					</div>

					<!-- Start Date -->
					<div class="mb-6">
						<label for="startDate" class="mb-2 block font-semibold">Start Date</label>
						<BccDatePicker
							id="startDate"
							v-model="form.startDate"
							showIcon
							disabled
						/>
					</div>

					<!-- End Date -->
					<div class="mb-6">
						<label for="endDate" class="mb-2 block font-semibold">End Date</label>
						<BccDatePicker
							id="endDate"
							v-model="form.endDate"
							showIcon
							disabled
						/>
					</div>

					<!-- Tags -->
					<div class="mb-6">
						<label for="tags" class="mb-2 block font-semibold">Tags</label>
						<BccInputChips
							id="tags"
							v-model="form.tags"
							placeholder="Add tags..."
							disabled
						/>
					</div>

					<!-- Active Checkbox -->
					<div class="mb-8 flex items-center gap-3">
						<BccCheckbox
							v-model="form.active"
							disabled
						/>
						<label class="font-semibold">Active</label>
					</div>

					<!-- Action Buttons -->
					<div class="flex gap-3 border-t border-gray-200 pt-6">
						<BccButton severity="secondary" disabled>
							Back
						</BccButton>
						<BccButton disabled class="ml-auto">
							Save
						</BccButton>
						<BccButton severity="danger" disabled>
							Delete
						</BccButton>
					</div>
				</div>

				<div class="mx-auto max-w-2xl rounded text-sm text-gray-600">
					Current form data: {{ JSON.stringify(form, null, 2) }}
				</div>
			</div>
		`,
	}),
};
