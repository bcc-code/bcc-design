<script setup lang="ts">
import PVIconField from 'primevue/iconfield';
import PVInputIcon from 'primevue/inputicon';
import PVInputText from 'primevue/inputtext';
import { type Component } from 'vue';

defineProps<{
	icon?: Component;
	iconRight?: boolean;
	placeholder?: string;
}>();

const model = defineModel<string>('');
</script>

<template>
	<PVIconField>
		<PVInputIcon v-if="icon && !iconRight">
			<component :is="icon" class="size-4" />
		</PVInputIcon>
		<PVInputText v-model="model" class="w-full" :placeholder="placeholder" />
		<PVInputIcon v-if="icon && iconRight">
			<component :is="icon" class="size-4" />
		</PVInputIcon>
	</PVIconField>
</template>
