<script setup lang="ts">
import { CheckIcon, CloseIcon } from '@bcc-code/icons-vue';
import { ToggleSwitch, type ToggleSwitchProps } from 'primevue';
import type { Component } from 'vue';
import BccCircleLoader from '../BccCircleLoader/BccCircleLoader.vue';

export type ToggleProps = ToggleSwitchProps & {
	label?: string;
	icon?: Component;
	withIcon?: boolean;
	loading?: boolean;
	wasToggled?: boolean;
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
