<script setup lang="ts">
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
	<ToggleSwitch :disabled="loading || disabled" :class="{ toggled: wasToggled }"> </ToggleSwitch>
</template>

<style scoped>
.toggled:not(:checked) {
	--p-toggleswitch-background: var(--color-background-accent-red-subtler-default);
}
</style>
