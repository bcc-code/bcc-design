import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import { BccEditor } from '../../index';

const meta = {
	component: BccEditor,
	title: 'PrimeVue/BccEditor',
	parameters: {
		docs: {
			description: {
				component: 'Rich text editor based on Quill. [Read more on PrimeVue →](https://primevue.org/editor/)',
			},
		},
	},
	argTypes: {
		readonly: { control: 'boolean' },
		placeholder: { control: 'text' },
		editorStyle: { control: 'text' },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		editorStyle: 'height: 220px',
		placeholder: 'Write your content here...',
	},
	render: args => ({
		components: { BccEditor },
		setup() {
			const value = ref('<p><strong>Welcome!</strong> Start editing this text.</p>');
			return { args, value };
		},
		template: `
			<div class="w-full">
				<BccEditor v-model="value" v-bind="args" class="w-full" />
			</div>
		`,
	}),
};

export const ReadOnly: Story = {
	args: {
		readonly: true,
		editorStyle: 'height: 220px',
	},
	render: args => ({
		components: { BccEditor },
		setup() {
			const value = ref(
				'<h2>Release Notes</h2><p>This content is displayed in read-only mode for preview purposes.</p>'
			);
			return { args, value };
		},
		template: `
			<div class="w-full">
				<BccEditor v-model="value" v-bind="args" class="w-full" />
			</div>
		`,
	}),
};
