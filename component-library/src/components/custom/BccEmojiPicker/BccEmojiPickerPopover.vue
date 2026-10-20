<script setup lang="ts">
import Popover from 'primevue/popover';
import { nextTick, ref, shallowRef } from 'vue';

import BccEmojiPicker from './BccEmojiPicker.vue';
import type { EmojiPickerOpenOptions } from './types';

const popover = ref<InstanceType<typeof Popover> | null>(null);
const options = shallowRef<EmojiPickerOpenOptions | null>(null);

async function show(next: EmojiPickerOpenOptions) {
	if (options.value) {
		hide();
		await nextTick();
	}
	options.value = next;
	popover.value?.show(new Event('click'), next.anchor);
}

function hide() {
	popover.value?.hide();
}

function onHide() {
	const closed = options.value;
	options.value = null;
	closed?.onHide?.();
}

defineExpose({ show, hide, isOpenFor: (anchor: HTMLElement) => options.value?.anchor === anchor });
</script>

<template>
	<Popover ref="popover" class="bcc-emoji-picker-popover" @hide="onHide">
		<BccEmojiPicker
			v-if="options"
			:locale="options.locale"
			:search-placeholder="options.searchPlaceholder"
			:no-results-text="options.noResultsText"
			@select="options.onSelect"
		/>
	</Popover>
</template>
