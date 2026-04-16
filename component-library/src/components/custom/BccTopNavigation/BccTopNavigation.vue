<script setup lang="ts">
import { ArrowBackIosNewIcon } from '@bcc-code/icons-vue';
import { computed, type Component } from 'vue';

export type TopNavigationProps = {
	title?: string | (() => string);
	subtitle?: string | (() => string);
	left?: ((...args: unknown[]) => Component | null) | Component | string | 'event-logo';
	right?: ((...args: unknown[]) => Component | null) | Component | string;
	hideBack?: boolean;
	backTitle?: string;
};

const props = withDefaults(
	defineProps<
		TopNavigationProps & {
			relative?: boolean;
			fixed?: boolean;
			padded?: boolean;
			transparent?: boolean;
			white?: boolean;
			backTitle?: string;
			force?: boolean;
			titleLeft?: boolean;
		}
	>(),
	{
		hideBack: false,
	}
);

const emit = defineEmits<{
	(e: 'back'): void;
}>();

const heading = computed((): { title: string; subtitle: string } => {
	const title = props.title;
	const subtitle = props.subtitle;

	return {
		title: (typeof title === 'function' ? title() : title) ?? '',
		subtitle: (typeof subtitle === 'function' ? subtitle() : subtitle) ?? '',
	};
});
</script>

<template>
	<div
		class="bcc-topbar pt-inset-top-1 top-0 z-30 w-full shrink-0 pb-1"
		:class="[
			{ relative, fixed, sticky: !relative && !fixed },
			transparent ? '' : white ? 'bg-elevation-surface-default text-default' : 'bg-brand-800 text-white drop-shadow',
		]"
	>
		<div class="center between min-h-12 w-full" :class="{ 'px-4 sm:px-6': padded }">
			<slot :title="heading">
				<div class="center h-full w-full px-4 sm:px-6">
					<template v-if="!hideBack">
						<button
							type="button"
							class="btn-nav-back center shrink-0 gap-1 p-2"
							:aria-label="backTitle ? undefined : 'Back'"
							@click="emit('back')"
						>
							<ArrowBackIosNewIcon class="w-6" />
							<h3 v-if="backTitle" class="heading-md">
								{{ backTitle }}
							</h3>
						</button>
					</template>

					<slot name="left">
						<svg v-if="left === 'event-logo'" class="h-6 w-20" xmlns="http://www.w3.org/2000/svg">
							<use xlink:href="#svg-splash-icon"></use>
						</svg>

						<div v-else-if="left || (hideBack && !titleLeft && (right || $slots.right))" class="flex w-10 items-center">
							<component :is="left" />
						</div>
					</slot>

					<div
						:key="String(heading.title)"
						class="col pointer-events-none flex-1 gap-(--space-negative-25) truncate px-2"
						:class="titleLeft ? 'items-start text-left' : 'text-center'"
					>
						<h1 class="w-full truncate" :class="heading.title.length > 24 ? 'heading-sm' : 'heading-md'">
							<slot name="title" :title="heading.title">
								{{ heading.title }}
							</slot>
						</h1>
						<h2 v-if="heading.subtitle" class="text-body-sm w-full truncate leading-none opacity-75">
							<slot name="subtitle" :subtitle="heading.subtitle">
								{{ heading.subtitle }}
							</slot>
						</h2>
					</div>

					<slot name="right">
						<div v-if="right || left" class="flex w-10 items-center justify-end">
							<component :is="right" />
						</div>
						<div v-else-if="!hideBack || $slots.left" class="w-10"></div>
					</slot>
				</div>
			</slot>
		</div>

		<slot name="bottom" />
	</div>
</template>
