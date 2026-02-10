import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { PVAccordion, PVAccordionContent, PVAccordionHeader, PVAccordionPanel } from '../../index';

const meta = {
	component: PVAccordion,
	title: 'PrimeVue/Accordion',
	tags: ['autodocs'],
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { PVAccordion, PVAccordionPanel, PVAccordionHeader, PVAccordionContent },
		template: `
			<PVAccordion value="0">
				<PVAccordionPanel value="0">
					<PVAccordionHeader>Header I</PVAccordionHeader>
					<PVAccordionContent>
						<p class="m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
					</PVAccordionContent>
				</PVAccordionPanel>
				<PVAccordionPanel value="1">
					<PVAccordionHeader>Header II</PVAccordionHeader>
					<PVAccordionContent>
						<p class="m-0">Sed ut perspiciatis unde omnis iste natus error sit voluptatem.</p>
					</PVAccordionContent>
				</PVAccordionPanel>
				<PVAccordionPanel value="2">
					<PVAccordionHeader>Header III</PVAccordionHeader>
					<PVAccordionContent>
						<p class="m-0">At vero eos et accusamus et iusto odio dignissimos ducimus.</p>
					</PVAccordionContent>
				</PVAccordionPanel>
			</PVAccordion>
		`,
	}),
};

export const Multiple: Story = {
	render: () => ({
		components: { PVAccordion, PVAccordionPanel, PVAccordionHeader, PVAccordionContent },
		setup() {
			const value = ref(['0']);
			return { value };
		},
		template: `
			<PVAccordion v-model:value="value" multiple>
				<PVAccordionPanel value="0">
					<PVAccordionHeader>Header I</PVAccordionHeader>
					<PVAccordionContent>
						<p class="m-0">Multiple panels can be open at once.</p>
					</PVAccordionContent>
				</PVAccordionPanel>
				<PVAccordionPanel value="1">
					<PVAccordionHeader>Header II</PVAccordionHeader>
					<PVAccordionContent>
						<p class="m-0">Content for panel II.</p>
					</PVAccordionContent>
				</PVAccordionPanel>
				<PVAccordionPanel value="2">
					<PVAccordionHeader>Header III</PVAccordionHeader>
					<PVAccordionContent>
						<p class="m-0">Content for panel III.</p>
					</PVAccordionContent>
				</PVAccordionPanel>
			</PVAccordion>
		`,
	}),
};
