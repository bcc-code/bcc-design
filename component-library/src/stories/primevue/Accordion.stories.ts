import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { BccAccordion, BccAccordionContent, BccAccordionHeader, BccAccordionPanel } from '../../index';

const meta = {
	component: BccAccordion,
	title: 'PrimeVue/BccAccordion',
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { BccAccordion, BccAccordionPanel, BccAccordionHeader, BccAccordionContent },
		template: `
			<BccAccordion value="0">
				<BccAccordionPanel value="0">
					<BccAccordionHeader>Header I</BccAccordionHeader>
					<BccAccordionContent>
						<p class="m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
					</BccAccordionContent>
				</BccAccordionPanel>
				<BccAccordionPanel value="1">
					<BccAccordionHeader>Header II</BccAccordionHeader>
					<BccAccordionContent>
						<p class="m-0">Sed ut perspiciatis unde omnis iste natus error sit voluptatem.</p>
					</BccAccordionContent>
				</BccAccordionPanel>
				<BccAccordionPanel value="2">
					<BccAccordionHeader>Header III</BccAccordionHeader>
					<BccAccordionContent>
						<p class="m-0">At vero eos et accusamus et iusto odio dignissimos ducimus.</p>
					</BccAccordionContent>
				</BccAccordionPanel>
			</BccAccordion>
		`,
	}),
};

export const Single: Story = {
	render: () => ({
		components: { BccAccordion, BccAccordionPanel, BccAccordionHeader, BccAccordionContent },
		template: `
			<BccAccordionPanel >
				<BccAccordionHeader>Header I</BccAccordionHeader>
				<BccAccordionContent>
					<p class="m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
				</BccAccordionContent>
			</BccAccordionPanel>
		`,
	}),
};

export const Multiple: Story = {
	render: () => ({
		components: { BccAccordion, BccAccordionPanel, BccAccordionHeader, BccAccordionContent },
		setup() {
			const value = ref(['0']);
			return { value };
		},
		template: `
			<BccAccordion v-model:value="value" multiple>
				<BccAccordionPanel value="0">
					<BccAccordionHeader>Header I</BccAccordionHeader>
					<BccAccordionContent>
						<p class="m-0">Multiple panels can be open at once.</p>
					</BccAccordionContent>
				</BccAccordionPanel>
				<BccAccordionPanel value="1">
					<BccAccordionHeader>Header II</BccAccordionHeader>
					<BccAccordionContent>
						<p class="m-0">Content for panel II.</p>
					</BccAccordionContent>
				</BccAccordionPanel>
				<BccAccordionPanel value="2">
					<BccAccordionHeader>Header III</BccAccordionHeader>
					<BccAccordionContent>
						<p class="m-0">Content for panel III.</p>
					</BccAccordionContent>
				</BccAccordionPanel>
			</BccAccordion>
		`,
	}),
};
