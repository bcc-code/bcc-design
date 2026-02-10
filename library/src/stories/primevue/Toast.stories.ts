import type { Meta, StoryObj } from '@storybook/vue3';
import { PVButton, PVToast, useToast } from '../../index';

const meta = {
	component: PVToast,
	title: 'PrimeVue/Toast',
	tags: ['autodocs'],
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { PVToast, PVButton },
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
				<PVToast />
				<PVButton label="Show toast" @click="show" />
			</div>
		`,
	}),
};

export const AllSeverities: Story = {
	render: () => ({
		components: { PVToast, PVButton },
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
				<PVToast />
				<div class="flex flex-wrap gap-2">
					<PVButton label="Success" severity="success" @click="show('success')" />
					<PVButton label="Info" severity="info" @click="show('info')" />
					<PVButton label="Warn" severity="warn" @click="show('warn')" />
					<PVButton label="Error" severity="danger" @click="show('error')" />
				</div>
			</div>
		`,
	}),
};
