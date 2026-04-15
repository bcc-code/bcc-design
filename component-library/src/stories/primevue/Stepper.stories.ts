import { ArrowLeftAltIcon, ArrowRightAltIcon } from '@bcc-code/icons-vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import { BccButton, BccStep, BccStepItem, BccStepList, BccStepPanel, BccStepPanels, BccStepper } from '../../index';

const meta = {
	component: BccStepper,
	title: 'PrimeVue/BccStepper',
	parameters: {
		docs: {
			description: {
				component:
					'Wizard-like workflow guiding users through a multi-step progression. [Read more on PrimeVue →](https://primevue.org/stepper/)',
			},
		},
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: {
			ArrowLeftAltIcon,
			ArrowRightAltIcon,
			BccStepper,
			BccStepList,
			BccStep,
			BccStepPanels,
			BccStepPanel,
			BccButton,
		},
		setup() {
			const step = ref('1');
			return { step, ArrowLeftAltIcon, ArrowRightAltIcon };
		},
		template: `
			<BccStepper v-model:value="step">
				<BccStepList>
					<BccStep value="1">Header I</BccStep>
					<BccStep value="2">Header II</BccStep>
					<BccStep value="3">Header III</BccStep>
				</BccStepList>
				<BccStepPanels>
					<BccStepPanel v-slot="{ activateCallback }" value="1">
						<div class="flex flex-col gap-4">
							<div class="border-2 border-dashed border-default rounded p-6 flex justify-center items-center font-medium min-h-32">
								Content I
							</div>
							<div class="flex justify-end">
								<BccButton label="Next" :icon="ArrowRightAltIcon" icon-right @click="activateCallback('2')" />
							</div>
						</div>
					</BccStepPanel>
					<BccStepPanel v-slot="{ activateCallback }" value="2">
						<div class="flex flex-col gap-4">
							<div class="border-2 border-dashed border-default rounded p-6 flex justify-center items-center font-medium min-h-32">
								Content II
							</div>
							<div class="flex justify-between">
								<BccButton label="Back" severity="secondary" :icon="ArrowLeftAltIcon" @click="activateCallback('1')" />
								<BccButton label="Next" :icon="ArrowRightAltIcon" icon-right @click="activateCallback('3')" />
							</div>
						</div>
					</BccStepPanel>
					<BccStepPanel v-slot="{ activateCallback }" value="3">
						<div class="flex flex-col gap-4">
							<div class="border-2 border-dashed border-default rounded p-6 flex justify-center items-center font-medium min-h-32">
								Content III
							</div>
							<div>
								<BccButton label="Back" severity="secondary" :icon="ArrowLeftAltIcon" @click="activateCallback('2')" />
							</div>
						</div>
					</BccStepPanel>
				</BccStepPanels>
			</BccStepper>
		`,
	}),
};

export const Vertical: Story = {
	render: () => ({
		components: { ArrowLeftAltIcon, ArrowRightAltIcon, BccStepper, BccStepItem, BccStep, BccStepPanel, BccButton },
		setup() {
			const step = ref('1');
			return { step, ArrowLeftAltIcon, ArrowRightAltIcon };
		},
		template: `
			<BccStepper v-model:value="step">
				<BccStepItem value="1">
					<BccStep>Header I</BccStep>
					<BccStepPanel v-slot="{ activateCallback }">
						<div class="flex flex-col gap-4">
							<div class="border-2 border-dashed border-default rounded p-6 flex justify-center items-center font-medium min-h-32">
								Content I
							</div>
							<div>
								<BccButton label="Next" @click="activateCallback('2')" />
							</div>
						</div>
					</BccStepPanel>
				</BccStepItem>
				<BccStepItem value="2">
					<BccStep>Header II</BccStep>
					<BccStepPanel v-slot="{ activateCallback }">
						<div class="flex flex-col gap-4">
							<div class="border-2 border-dashed border-default rounded p-6 flex justify-center items-center font-medium min-h-32">
								Content II
							</div>
							<div class="flex gap-2">
								<BccButton label="Back" severity="secondary" @click="activateCallback('1')" />
								<BccButton label="Next" @click="activateCallback('3')" />
							</div>
						</div>
					</BccStepPanel>
				</BccStepItem>
				<BccStepItem value="3">
					<BccStep>Header III</BccStep>
					<BccStepPanel v-slot="{ activateCallback }">
						<div class="flex flex-col gap-4">
							<div class="border-2 border-dashed border-default rounded p-6 flex justify-center items-center font-medium min-h-32">
								Content III
							</div>
							<div>
								<BccButton label="Back" severity="secondary" @click="activateCallback('2')" />
							</div>
						</div>
					</BccStepPanel>
				</BccStepItem>
			</BccStepper>
		`,
	}),
};

export const Linear: Story = {
	render: () => ({
		components: {
			ArrowLeftAltIcon,
			ArrowRightAltIcon,
			BccStepper,
			BccStepList,
			BccStep,
			BccStepPanels,
			BccStepPanel,
			BccButton,
		},
		setup() {
			const step = ref('1');
			return { step, ArrowLeftAltIcon, ArrowRightAltIcon };
		},
		template: `
			<BccStepper v-model:value="step" linear>
				<BccStepList>
					<BccStep value="1">Header I</BccStep>
					<BccStep value="2">Header II</BccStep>
					<BccStep value="3">Header III</BccStep>
				</BccStepList>
				<BccStepPanels>
					<BccStepPanel v-slot="{ activateCallback }" value="1">
						<div class="flex flex-col gap-4">
							<div class="border-2 border-dashed border-default rounded p-6 flex justify-center items-center font-medium min-h-32">
								Content I
							</div>
							<div class="flex justify-end">
								<BccButton label="Next" :icon="ArrowRightAltIcon" @click="activateCallback('2')" />
							</div>
						</div>
					</BccStepPanel>
					<BccStepPanel v-slot="{ activateCallback }" value="2">
						<div class="flex flex-col gap-4">
							<div class="border-2 border-dashed border-default rounded p-6 flex justify-center items-center font-medium min-h-32">
								Content II
							</div>
							<div class="flex justify-between">
								<BccButton label="Back" severity="secondary" :icon="ArrowLeftAltIcon" @click="activateCallback('1')" />
								<BccButton label="Next" :icon="ArrowRightAltIcon" icon-right @click="activateCallback('3')" />
							</div>
						</div>
					</BccStepPanel>
					<BccStepPanel v-slot="{ activateCallback }" value="3">
						<div class="flex flex-col gap-4">
							<div class="border-2 border-dashed border-default rounded p-6 flex justify-center items-center font-medium min-h-32">
								Content III
							</div>
							<div>
								<BccButton label="Back" severity="secondary" :icon="ArrowLeftAltIcon" @click="activateCallback('2')" />
							</div>
						</div>
					</BccStepPanel>
				</BccStepPanels>
			</BccStepper>
		`,
	}),
};

export const StepsOnly: Story = {
	render: () => ({
		components: { BccStepper, BccStepList, BccStep },
		setup() {
			const step = ref('1');
			return { step };
		},
		template: `
			<BccStepper v-model:value="step" class="basis-[50rem]">
				<BccStepList>
					<BccStep value="1">Design</BccStep>
					<BccStep value="2">Development</BccStep>
					<BccStep value="3">QA</BccStep>
				</BccStepList>
			</BccStepper>
		`,
	}),
};
