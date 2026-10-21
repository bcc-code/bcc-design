<script setup lang="ts">
import PrimeTextarea, { type TextareaProps as PrimeTextareaProps } from 'primevue/textarea';
import { useTemplateRef } from 'vue';
import { insertAtCaret as insertAtCaretOf } from './insertAtCaret';

// Props aren't declared at runtime, so they fall through to Textarea untouched. Declaring them would
// cast absent booleans like `fluid` to false and override PrimeVue's defaults.
export type TextareaProps = {} & /* @vue-ignore */ PrimeTextareaProps;

export type TextareaMethods = {
	/** Inserts text at the caret, replacing any selection, and updates v-model. */
	insertAtCaret: (text: string) => void;
};

defineProps<TextareaProps>();
const emit = defineEmits<{
	'update:modelValue': [value: string];
	'value-change': [value: string];
}>();

const textarea = useTemplateRef<{ $el: HTMLTextAreaElement }>('textarea');

const exposed: TextareaMethods = {
	insertAtCaret: text => {
		if (textarea.value) insertAtCaretOf(textarea.value.$el, text);
	},
};
defineExpose(exposed);
</script>

<template>
	<PrimeTextarea
		ref="textarea"
		@update:model-value="emit('update:modelValue', $event)"
		@value-change="emit('value-change', $event)"
	/>
</template>
