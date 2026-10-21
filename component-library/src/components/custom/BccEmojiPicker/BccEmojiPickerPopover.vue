<script setup lang="ts">
import Popover from 'primevue/popover';
import { nextTick, ref, shallowRef } from 'vue';

import BccEmojiPicker from './BccEmojiPicker.vue';
import type { EmojiPickerOpenOptions } from './types';

const popover = ref<InstanceType<typeof Popover> | null>(null);
// `options` outlives the close so the picker stays rendered while the popover fades out.
const options = shallowRef<EmojiPickerOpenOptions | null>(null);
const isOpen = ref(false);
// Remounts the picker on each open, so it starts with an empty search and retries failed loads.
const openCount = ref(0);

async function show(next: EmojiPickerOpenOptions) {
	if (isOpen.value) {
		hide();
		await nextTick();
	}
	// Once the popover module is loaded this runs inside the click that opened it. Popover binds its
	// outside-click listener on document while that click is still bubbling, so it would close at
	// once. Wait for the event to finish first.
	await new Promise(resolve => setTimeout(resolve));
	options.value = next;
	isOpen.value = true;
	openCount.value++;
	// Popover treats clicks on `currentTarget` as its own, so clicking the anchor isn't an outside click.
	popover.value?.show({ currentTarget: next.anchor } as unknown as Event, next.anchor);
}

function hide() {
	popover.value?.hide();
}

function onHide() {
	isOpen.value = false;
	options.value?.onHide?.();
}

defineExpose({ show, hide, isOpenFor: (anchor: HTMLElement) => isOpen.value && options.value?.anchor === anchor });
</script>

<template>
	<Popover ref="popover" class="bcc-emoji-picker-popover" @hide="onHide">
		<BccEmojiPicker
			v-if="options"
			:key="openCount"
			:locale="options.locale"
			:search-placeholder="options.searchPlaceholder"
			:no-results-text="options.noResultsText"
			:error-text="options.errorText"
			@select="options.onSelect"
		/>
	</Popover>
</template>
