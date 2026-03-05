import { CancelIcon, CheckIcon } from '@bcc-code/icons-vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { BccButton, BccConfirmDialog, useConfirm } from '../../index';

const meta = {
	component: BccConfirmDialog,
	title: 'Wrapped/BccConfirmDialog',
	parameters: {
		docs: {
			description: {
				component:
					'Confirmation dialog triggered via `useConfirm()`. **BccConfirmDialog** is a wrapper that syncs the current confirmation options so you can use `<template #icon="{ confirmation }">` and pass icon **components** in `confirm.require({ icon: CheckIcon })`. The wrapper also supports `#message`, `#container`, `#accepticon`, `#rejecticon` with the same confirmation context. [Read more on PrimeVue →](https://primevue.org/confirmdialog/)',
			},
		},
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { BccButton },
		setup() {
			const confirm = useConfirm();
			const open = () => {
				confirm.require({
					message: 'Are you sure you want to proceed?',
					header: 'Confirmation',
					accept: () => {},
					reject: () => {},
				});
			};
			return { open };
		},
		template: `<div><BccButton label="Confirm action" @click="open" /></div>`,
	}),
	parameters: {
		docs: {
			source: {
				code: `<template>
  <div>
    <BccConfirmDialog />
    <BccButton label="Confirm action" @click="open" />
  </div>
</template>

<script setup>
import { BccButton, BccConfirmDialog, useConfirm } from '@bcc-code/component-library';

const confirm = useConfirm();
const open = () => {
  confirm.require({
    message: 'Are you sure you want to proceed?',
    header: 'Confirmation',
    accept: () => {},
    reject: () => {},
  });
};
</script>`,
			},
		},
	},
};

export const WithCustomButtons: Story = {
	render: () => ({
		components: { BccButton },
		setup() {
			const confirm = useConfirm();
			const open = () => {
				confirm.require({
					message: 'Do you want to save the changes?',
					header: 'Save changes',
					rejectProps: {
						label: 'Discard',
						severity: 'secondary',
						outlined: true,
					},
					acceptProps: {
						label: 'Save',
					},
					accept: () => {},
					reject: () => {},
				});
			};
			return { open };
		},
		template: `<div><BccButton label="Save" @click="open" /></div>`,
	}),
	parameters: {
		docs: {
			source: {
				code: `<template>
  <div>
    <BccConfirmDialog />
    <BccButton label="Save" @click="open" />
  </div>
</template>

<script setup>
import { BccButton, BccConfirmDialog, useConfirm } from '@bcc-code/component-library';

const confirm = useConfirm();
const open = () => {
  confirm.require({
    message: 'Do you want to save the changes?',
    header: 'Save changes',
    rejectProps: { label: 'Discard', severity: 'secondary', outlined: true },
    acceptProps: { label: 'Save' },
    accept: () => {},
    reject: () => {},
  });
};
</script>`,
			},
		},
	},
};

export const Destructive: Story = {
	render: () => ({
		components: { BccButton },
		setup() {
			const confirm = useConfirm();
			const open = () => {
				confirm.require({
					message: 'This action cannot be undone. Are you sure?',
					header: 'Delete item',
					rejectProps: {
						label: 'Cancel',
						severity: 'secondary',
						outlined: true,
					},
					acceptProps: {
						label: 'Delete',
						severity: 'danger',
					},
					accept: () => {},
					reject: () => {},
				});
			};
			return { open };
		},
		template: `<div><BccButton label="Delete" severity="danger" outlined @click="open" /></div>`,
	}),
	parameters: {
		docs: {
			source: {
				code: `<template>
  <div>
    <BccConfirmDialog />
    <BccButton label="Delete" severity="danger" outlined @click="open" />
  </div>
</template>

<script setup>
import { BccButton, BccConfirmDialog, useConfirm } from '@bcc-code/component-library';

const confirm = useConfirm();
const open = () => {
  confirm.require({
    message: 'This action cannot be undone. Are you sure?',
    header: 'Delete item',
    rejectProps: { label: 'Cancel', severity: 'secondary', outlined: true },
    acceptProps: { label: 'Delete', severity: 'danger' },
    accept: () => {},
    reject: () => {},
  });
};
</script>`,
			},
		},
	},
};

export const WithIconComponent: Story = {
	render: () => ({
		components: { BccButton },
		setup() {
			const confirm = useConfirm();
			const open = () => {
				confirm.require({
					message: 'Are you sure you want to proceed?',
					header: 'Confirmation',
					icon: CheckIcon,
					accept: () => {},
					reject: () => {},
				});
			};
			return { open };
		},
		template: `<div><BccButton label="Confirm (icon component)" @click="open" /></div>`,
	}),
	parameters: {
		docs: {
			description: {
				story:
					'Pass an icon **component** in `confirm.require({ icon: CheckIcon })`. The BccConfirmDialog wrapper renders it via its default `#icon` slot.',
			},
			source: {
				code: `<template>
  <div>
    <BccConfirmDialog />
    <BccButton label="Confirm" @click="open" />
  </div>
</template>

<script setup>
import { CheckIcon } from '@bcc-code/icons-vue';
import { BccButton, BccConfirmDialog, useConfirm } from '@bcc-code/component-library';

const confirm = useConfirm();
const open = () => {
  confirm.require({
    message: 'Are you sure you want to proceed?',
    header: 'Confirmation',
    icon: CheckIcon,
    accept: () => {},
    reject: () => {},
  });
};
</script>`,
			},
		},
	},
};

export const WithButtonIcons: Story = {
	render: () => ({
		components: { BccButton },
		setup() {
			const confirm = useConfirm();
			const open = () => {
				confirm.require({
					message: 'Are you sure you want to proceed?',
					header: 'Confirmation',
					acceptIcon: CheckIcon,
					rejectIcon: CancelIcon,
					accept: () => {},
					reject: () => {},
				});
			};
			return { open, CheckIcon };
		},
		template: `<div><BccButton label="Confirm" :icon="CheckIcon" @click="open" /></div>`,
	}),
	parameters: {
		docs: {
			source: {
				code: `<template>
  <div>
    <BccConfirmDialog />
    <BccButton label="Confirm" @click="open" />
  </div>
</template>

<script setup>
import { CheckIcon, CancelIcon } from '@bcc-code/icons-vue';
import { BccButton, BccConfirmDialog, useConfirm } from '@bcc-code/component-library';

const confirm = useConfirm();
const open = () => {
  confirm.require({
    message: 'Are you sure you want to proceed?',
    header: 'Confirmation',
    acceptIcon: CheckIcon,
    rejectIcon: CancelIcon,
    accept: () => {},
    reject: () => {},
  });
};
</script>`,
			},
		},
	},
};

export const WithButtonIconsUsingProps: Story = {
	render: () => ({
		components: { BccButton },
		setup() {
			const confirm = useConfirm();
			const open = () => {
				confirm.require({
					message: 'Are you sure you want to proceed?',
					header: 'Confirmation',
					acceptProps: {
						icon: CheckIcon,
					},
					rejectProps: {
						icon: CancelIcon,
					},
					accept: () => {},
					reject: () => {},
				});
			};
			return { open };
		},
		template: `<div><BccButton label="Confirm" @click="open" /></div>`,
	}),
	parameters: {
		docs: {
			source: {
				code: `<template>
  <div>
    <BccConfirmDialog />
    <BccButton label="Confirm" @click="open" />
  </div>
</template>

<script setup>
import { CheckIcon, CancelIcon } from '@bcc-code/icons-vue';
import { BccButton, BccConfirmDialog, useConfirm } from '@bcc-code/component-library';

const confirm = useConfirm();
const open = () => {
  confirm.require({
    message: 'Are you sure you want to proceed?',
    header: 'Confirmation',
    acceptProps: { icon: CheckIcon },
    rejectProps: { icon: CancelIcon },
    accept: () => {},
    reject: () => {},
  });
};
</script>`,
			},
		},
	},
};
