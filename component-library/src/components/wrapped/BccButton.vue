<script setup lang="ts">
import type { VueComponent } from '@/types';
import PrimeButton, { type ButtonProps as PrimeButtonProps } from 'primevue/button';
import { computed, useAttrs } from 'vue';

export type ButtonProps = {
	icon?: VueComponent;
	iconRight?: boolean | VueComponent;
	iconClass?: PrimeButtonProps['iconClass'];
	size?: PrimeButtonProps['size'];
	loadingIcon?: VueComponent;

	useCtx?: boolean;
} & /* @vue-ignore */ Omit<PrimeButtonProps, 'icon' | 'iconPos' | 'loadingIcon'>;

const props = defineProps<ButtonProps>();
const attrs = useAttrs();

const buttonBindings = computed((): PrimeButtonProps => {
	const { icon, iconRight, loadingIcon, useCtx, ...rest } = props;
	void icon;
	void iconRight;
	void loadingIcon;

	const forward = rest as PrimeButtonProps;
	if (iconRight === true) forward.iconPos = 'right';
	if (useCtx) forward.severity = 'primary';
	return { ...forward, ...attrs } as PrimeButtonProps;
});
</script>

<template>
	<PrimeButton v-bind="buttonBindings" :class="{ useCtx }" class="shrink-0">
		<template #icon>
			<component :is="icon" class="shrink-0" :class="[iconClass, { 'order-1': iconRight === true }, 'size-5']" />
			<component
				:is="iconRight"
				v-if="typeof iconRight !== 'boolean'"
				class="order-last shrink-0"
				:class="[iconClass, 'size-5']"
			/>
		</template>
		<template #loadingicon>
			<component :is="loadingIcon" class="shrink-0" :class="[iconClass, { 'order-1': iconRight === true }, 'size-5']" />
		</template>
		<slot />
	</PrimeButton>
</template>

<style>
@reference '../../style.css';

.p-button.useCtx {
	--p-button-primary-color: var(--ctx-text);
	--p-button-primary-background: var(--ctx-background);
	--p-button-primary-border-color: var(--ctx-border);
	--p-button-primary-hover-background: var(--ctx-background-hover);
	--p-button-primary-hover-border-color: var(--ctx-border-hover);
	--p-button-primary-hover-color: var(--ctx-text-hover);
	--p-button-primary-active-background: var(--ctx-background-pressed);
	--p-button-primary-active-border-color: var(--ctx-border-pressed);
	--p-button-primary-active-color: var(--ctx-text-pressed);
}

/*
 * Touch screens keep :hover on the last tapped element, so a tapped button kept its hover color
 * until the user tapped somewhere else. On devices that cannot hover, point the hover tokens
 * at the resting ones. The pressed (:active) color still shows while the button is held down.
 */
@media (hover: none) {
	.p-button,
	.p-button.useCtx {
		--p-button-primary-hover-background: var(--p-button-primary-background);
		--p-button-primary-hover-border-color: var(--p-button-primary-border-color);
		--p-button-primary-hover-color: var(--p-button-primary-color);
		--p-button-secondary-hover-background: var(--p-button-secondary-background);
		--p-button-secondary-hover-border-color: var(--p-button-secondary-border-color);
		--p-button-secondary-hover-color: var(--p-button-secondary-color);
		--p-button-info-hover-background: var(--p-button-info-background);
		--p-button-info-hover-border-color: var(--p-button-info-border-color);
		--p-button-info-hover-color: var(--p-button-info-color);
		--p-button-success-hover-background: var(--p-button-success-background);
		--p-button-success-hover-border-color: var(--p-button-success-border-color);
		--p-button-success-hover-color: var(--p-button-success-color);
		--p-button-warn-hover-background: var(--p-button-warn-background);
		--p-button-warn-hover-border-color: var(--p-button-warn-border-color);
		--p-button-warn-hover-color: var(--p-button-warn-color);
		--p-button-help-hover-background: var(--p-button-help-background);
		--p-button-help-hover-border-color: var(--p-button-help-border-color);
		--p-button-help-hover-color: var(--p-button-help-color);
		--p-button-danger-hover-background: var(--p-button-danger-background);
		--p-button-danger-hover-border-color: var(--p-button-danger-border-color);
		--p-button-danger-hover-color: var(--p-button-danger-color);
		--p-button-contrast-hover-background: var(--p-button-contrast-background);
		--p-button-contrast-hover-border-color: var(--p-button-contrast-border-color);
		--p-button-contrast-hover-color: var(--p-button-contrast-color);
		--p-button-outlined-primary-hover-background: transparent;
		--p-button-outlined-secondary-hover-background: transparent;
		--p-button-outlined-info-hover-background: transparent;
		--p-button-outlined-success-hover-background: transparent;
		--p-button-outlined-warn-hover-background: transparent;
		--p-button-outlined-help-hover-background: transparent;
		--p-button-outlined-danger-hover-background: transparent;
		--p-button-outlined-contrast-hover-background: transparent;
		--p-button-outlined-plain-hover-background: transparent;
		--p-button-text-primary-hover-background: transparent;
		--p-button-text-secondary-hover-background: transparent;
		--p-button-text-info-hover-background: transparent;
		--p-button-text-success-hover-background: transparent;
		--p-button-text-warn-hover-background: transparent;
		--p-button-text-help-hover-background: transparent;
		--p-button-text-danger-hover-background: transparent;
		--p-button-text-contrast-hover-background: transparent;
		--p-button-text-plain-hover-background: transparent;
		--p-button-link-hover-color: var(--p-button-link-color);
	}
}
</style>
