<script setup lang="ts">
import type { VueComponent } from '@/types';
import { CheckIcon, CloseIcon } from '@bcc-code/icons-vue';
import { ToggleSwitch, type ToggleSwitchProps } from 'primevue';
import BccCircleLoader from '../BccCircleLoader/BccCircleLoader.vue';

export type ToggleProps = ToggleSwitchProps & {
	/** Text shown next to the switch; also used for the label’s `for` attribute. */
	label?: string;
	/** Custom icon component rendered inside the toggle handle (replaces check/cross when set). */
	icon?: VueComponent;
	/** When true, shows check/cross icons in the handle based on checked state. */
	withIcon?: boolean;
	/** When true, shows a loading spinner in the handle and typically disables interaction. */
	loading?: boolean;
	/** Applies “toggled” visual state (e.g. for post-click feedback) independent of current value. */
	wasToggled?: boolean;
	/** When true, applies context-aware styling (e.g. from design tokens/theme). */
	useCtx?: boolean;
};

const props = defineProps<ToggleProps>();
</script>

<template>
	<div class="flex items-center gap-2">
		<ToggleSwitch v-bind="{ ...props, ...$attrs }" :class="{ toggled: wasToggled, loading, useCtx }" class="clickable">
			<template #handle="{ checked }">
				<BccCircleLoader v-if="loading" class="size-3" />
				<component :is="icon" v-else-if="icon" class="size-3" />
				<template v-else-if="withIcon">
					<CheckIcon v-if="checked" class="size-3" />
					<CloseIcon v-else class="size-3" />
				</template>
			</template>
		</ToggleSwitch>

		<label v-if="label" :for="inputId" class="text-body-md" :class="{ 'text-disabled': disabled }">
			{{ label }}
		</label>
	</div>
</template>
