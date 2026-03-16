<script setup lang="ts">
import { computed, type Component } from 'vue';
import { BccBadge } from '../../../index';

export type BccAppNavigationItem = {
	key: string;
	link: string;
	title: string;
	icon: Component;
	pin?: number;
};

export type BccAppNavigationProps = {
	items: BccAppNavigationItem[];
	modelValue: BccAppNavigationItem['key'] | null;
};

const props = defineProps<BccAppNavigationProps>();

const emit = defineEmits<{
	(e: 'update:modelValue', value: BccAppNavigationItem['key']): void;
}>();

const itemWidth = computed(() => {
	const count = props.items.length;
	const widthClasses = ['w-full', 'w-1/2', 'w-1/3', 'w-1/4', 'w-1/5', 'w-1/6'];

	if (count >= 1 && count <= widthClasses.length) {
		return widthClasses[count - 1];
	}

	return 'flex-1';
});
</script>

<template>
	<div class="bcc-app-navigation">
		<div class="nav">
			<RouterLink
				v-for="item in items"
				:key="item.key"
				class="navbar-btn"
				:to="item.link"
				active-class="navbar-btn--active"
				:class="{ 'navbar-btn--active': modelValue === item.key, [itemWidth]: true }"
				@click="emit('update:modelValue', item.key)"
			>
				<div class="navbar-btn-icon relative px-3">
					<component :is="item.icon" class="size-6" />
					<Transition name="bounce-in">
						<BccBadge
							v-if="item.pin && item.pin > 0"
							class="absolute top-0 right-1"
							size="sm"
							context="brand-bolder"
							bordered
							:value="String(item.pin)"
						/>
					</Transition>
				</div>
				<div class="text-heading-xs text-center">{{ item.title }}</div>
			</RouterLink>
		</div>
	</div>
</template>
