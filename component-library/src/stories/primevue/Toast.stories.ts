import type { Meta, StoryObj } from '@storybook/vue3';
import { BccButton, BccToast, useToast } from '../../index';

const meta = {
	component: BccToast,
	title: 'PrimeVue/BccToast',
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { BccToast, BccButton },
		setup() {
			const toast = useToast();
			const show = () => {
				toast.add({
					severity: 'info',
					summary: 'Info',
					detail: 'Message content',
					life: 3000,
				});
			};
			return { show };
		},
		template: `
			<div>
				<BccToast />
				<BccButton label="Show toast" @click="show" />
			</div>
		`,
	}),
};

export const AllSeverities: Story = {
	render: () => ({
		components: { BccToast, BccButton },
		setup() {
			const toast = useToast();
			const show = (severity: 'success' | 'info' | 'warn' | 'error') => {
				toast.add({
					severity,
					summary: severity.charAt(0).toUpperCase() + severity.slice(1),
					detail: `${severity} message`,
					life: 3000,
				});
			};
			return { show };
		},
		template: `
			<div>
				<BccToast />
				<div class="flex flex-wrap gap-2">
					<BccButton label="Success" severity="success" @click="show('success')" />
					<BccButton label="Info" severity="info" @click="show('info')" />
					<BccButton label="Warn" severity="warn" @click="show('warn')" />
					<BccButton label="Error" severity="danger" @click="show('error')" />
				</div>
			</div>
		`,
	}),
};
