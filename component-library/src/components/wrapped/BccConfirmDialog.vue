<script setup lang="ts">
import ConfirmationEventBus from 'primevue/confirmationeventbus';
import PrimeConfirmDialog from 'primevue/confirmdialog';
import { onMounted, onUnmounted, ref } from 'vue';

/**
 * Current confirmation options from the last confirm.require() call.
 * Synced from ConfirmationEventBus so slots can use it (e.g. #icon with a component).
 */
const currentConfirmation = ref<import('primevue/confirmationoptions').ConfirmationOptions | null>(null);

function isIconComponent(icon: unknown): icon is object {
	return typeof icon === 'function' || (typeof icon === 'object' && icon !== null);
}

const onConfirm = (options: import('primevue/confirmationoptions').ConfirmationOptions | null) => {
	currentConfirmation.value = options ?? null;
};
const onClose = () => {
	currentConfirmation.value = null;
};

onMounted(() => {
	ConfirmationEventBus.on('confirm', onConfirm);
	ConfirmationEventBus.on('close', onClose);
});

onUnmounted(() => {
	ConfirmationEventBus.off('confirm', onConfirm);
	ConfirmationEventBus.off('close', onClose);
});
</script>

<template>
	<PrimeConfirmDialog v-bind="$attrs">
		<template #icon>
			<slot name="icon" :confirmation="currentConfirmation">
				<template v-if="currentConfirmation?.icon">
					<component
						:is="currentConfirmation.icon"
						v-if="isIconComponent(currentConfirmation.icon)"
						class="p-confirmdialog-icon"
					/>
					<span v-else :class="[currentConfirmation.icon, 'p-confirmdialog-icon']" />
				</template>
			</slot>
		</template>
		<template v-if="$slots.message" #message="slotProps">
			<slot name="message" v-bind="slotProps" />
		</template>
		<template v-if="$slots.container" #container="slotProps">
			<slot name="container" v-bind="slotProps" />
		</template>
		<template v-if="$slots.accepticon" #accepticon>
			<slot name="accepticon" />
		</template>
		<template v-if="$slots.rejecticon" #rejecticon>
			<slot name="rejecticon" />
		</template>
	</PrimeConfirmDialog>
</template>
