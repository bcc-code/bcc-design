<script lang="ts">
export const ratioClasses = {
	ultraWide: '42.85%', // 21:9
	wide: '56.25%', // 16:9
	landscape: '75%', // 4:3
	square: '100%', // 1:1
	portrait: '133.33%', // 3:4
};

export const roundingClasses = {
	none: '',
	sm: 'rounded-sm',
	base: 'rounded',
	md: 'rounded-md',
	xl: 'rounded-xl',
};

export type AspectRatioStyle = keyof typeof ratioClasses | string | undefined;

export function getAspectRatioStyle(ratio: AspectRatioStyle) {
	if (ratio) {
		if (ratio in ratioClasses) {
			return ratioClasses[ratio as keyof typeof ratioClasses];
		}

		const ratioValue = ratio;
		if (ratioValue.includes('/')) {
			const [width, height] = ratioValue.split('/').map(Number);
			if (width && height) {
				return `${((height / width) * 100).toFixed(2)}%`;
			}
		}

		return ratioValue;
	}

	return ratioClasses.wide;
}
</script>

<script setup lang="ts">
import { computed, ref } from 'vue';

export type GraphicProps = {
	bannerSrc?: string;
	logoSrc?: string;
	rounding?: keyof typeof roundingClasses;
	ratio?: AspectRatioStyle;
	grayscale?: boolean;
};

const props = withDefaults(defineProps<GraphicProps>(), {
	rounding: 'xl',
	ratio: 'wide',
});

const loadedBanner = ref(false);
const loadedLogo = ref(false);

const aspectRatioStyle = computed(() => {
	return getAspectRatioStyle(props.ratio);
});
</script>

<template>
	<div class="bcc-graphic" :style="`padding-bottom: ${aspectRatioStyle}`" :class="roundingClasses[rounding]">
		<template v-if="bannerSrc">
			<img
				v-show="loadedBanner"
				:src="bannerSrc"
				defer
				class="bcc-graphic-banner"
				:class="roundingClasses[rounding]"
				@load="loadedBanner = true"
			/>
			<div
				v-show="!loadedBanner"
				class="bcc-graphic-banner bcc-graphic-banner--loading"
				:class="roundingClasses[rounding]"
			></div>
		</template>

		<template v-if="logoSrc">
			<img v-show="loadedLogo" :src="logoSrc" defer class="bcc-graphic-logo" @load="loadedLogo = true" />
			<div v-show="!loadedLogo" class="bcc-graphic-logo bcc-graphic-logo--loading"></div>
		</template>

		<div v-if="$slots.topLeft" class="corner top-left"><slot name="top-left" /></div>
		<div v-if="$slots.topRight" class="corner top-right"><slot name="top-right" /></div>
		<div v-if="$slots.bottomRight" class="corner bottom-right"><slot name="bottom-right" /></div>
		<div v-if="$slots.bottomLeft" class="corner bottom-left"><slot name="bottom-left" /></div>
	</div>
</template>
