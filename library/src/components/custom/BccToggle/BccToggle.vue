<script setup lang="ts">
import { BccCircleLoader } from '@/components/custom/BccCircleLoader';
import { CheckIcon, CloseIcon } from '@bcc-code/icons-vue';
import { ToggleSwitch, type ToggleSwitchProps } from 'primevue';
import type { Component } from 'vue';

defineProps<
	ToggleSwitchProps & {
		icon?: Component;
		withIcon?: boolean;
		loading?: boolean;
		wasToggled?: boolean;
	}
>();
</script>

<template>
	<ToggleSwitch :disabled="disabled" :class="{ toggled: wasToggled, loading }" class="clickable">
		<template #handle="{ checked }">
			<BccCircleLoader v-if="loading" class="size-3" />
			<component :is="icon" v-else-if="icon" class="size-3" />
			<template v-else-if="withIcon">
				<CheckIcon v-if="checked" class="size-3" />
				<CloseIcon v-else class="size-3" />
			</template>
		</template>
	</ToggleSwitch>
</template>

<style scoped>
@reference '../../../styles/contexts.css';

.p-toggleswitch {
	@apply ctx-gray-subtle;
	--toggleswitch-background: var(--ctx-background);
	--toggleswitch-hover-background: var(--ctx-background-hover);
}
.p-toggleswitch.loading {
	@apply pointer-events-none;
}
.p-toggleswitch.toggled:not(:checked) {
	@apply ctx-danger-bolder;
}
</style>
