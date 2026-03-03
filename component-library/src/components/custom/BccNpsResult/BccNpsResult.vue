<script setup lang="ts">
import { computed, ref } from 'vue';

export type NpsResultProps = {
	/** NPS score between -100 and 100; drives the gauge needle angle and position. */
	score: number;
	/** Controls the size of the gauge and optional text (lg, md, sm, xs). */
	size?: 'lg' | 'md' | 'sm' | 'xs';
	/** Text shown as the main heading; defaults to the numeric score when unset. */
	display?: string;
	/** Secondary label shown under the main heading. */
	underline?: string;
	/** When true, hides the heading and underline so only the gauge is shown. */
	hideText?: boolean;
	/** When true, the gauge needle animates to the score on mount/update. */
	animated?: boolean;
};

const props = withDefaults(defineProps<NpsResultProps>(), {
	size: 'md',
	hideText: false,
	animated: true,
});

const TOT_DEGREES = 240; // 75 + 165
const MIN_DEGREES = -165;
const MAX_DEGREES = 75;

function scoreToDegrees(score: number) {
	const perc = (score + 100) / 200;
	const degr = perc * TOT_DEGREES + MIN_DEGREES;
	if (degr > MAX_DEGREES) return MAX_DEGREES;
	if (degr < MIN_DEGREES) return MIN_DEGREES;
	return degr;
}

const started = ref(false);
setTimeout(() => {
	started.value = true;
}, 150);

const degrees = computed(() => {
	const startingPoint = MIN_DEGREES;

	if (started.value && props.score !== undefined) {
		return scoreToDegrees(props.score);
	}
	return startingPoint;
});
</script>

<template>
	<div class="bcc-nps-result" :class="{ animated }">
		<svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M12.0577 135C2.5704 118.567 -1.48062 99.5568 0.48344 80.6841C2.4475 61.8114 10.3261 44.0423 22.9937 29.9154L49.7962 53.9492C42.1957 62.4254 37.4685 73.0868 36.2901 84.4105C35.1116 95.7341 37.5422 107.14 43.2346 117L12.0577 135Z"
				fill="var(--color-background-accent-red-subtler-default)"
			/>
			<path
				d="M89.3717 0.00219296C77.0316 0.0883391 64.8411 2.71131 53.5576 7.70812C42.2741 12.7049 32.1388 19.9688 23.7814 29.0484L50.2688 53.429C55.2833 47.9813 61.3645 43.623 68.1346 40.6249C74.9047 37.6268 82.219 36.053 89.623 36.0013L89.3717 0.00219296Z"
				fill="var(--color-background-accent-orange-subtler-default)"
			/>
			<path
				d="M90.6283 0.00219328C102.953 0.0882391 115.129 2.70484 126.401 7.68981C137.673 12.6748 147.801 19.9219 156.157 28.9818L129.694 53.3891C124.681 47.9531 118.604 43.6049 111.841 40.6139C105.077 37.6229 97.7719 36.0529 90.377 36.0013L90.6283 0.00219328Z"
				fill="var(--color-background-accent-yellow-subtler-default)"
			/>
			<path
				d="M167.942 135C177.437 118.555 181.487 99.5278 179.512 80.6415C177.538 61.7551 169.64 43.9772 156.949 29.8515L130.169 53.9109C137.784 62.3863 142.523 73.0531 143.707 84.3849C144.892 95.7167 142.462 107.133 136.765 117L167.942 135Z"
				fill="var(--color-background-accent-green-subtler-default)"
			/>
			<path
				d="M12.0577 135C2.57553 118.576 -1.47637 99.5772 0.480336 80.714C2.43704 61.8508 10.3023 44.0878 22.9536 29.9601L36.3629 41.9681C26.2419 53.2703 19.9496 67.4807 18.3843 82.5712C16.8189 97.6617 20.0604 112.861 27.6462 126L12.0577 135Z"
				fill="var(--color-background-accent-red-subtle-default)"
			/>
			<path
				d="M89.3717 0.00219296C77.0341 0.0883218 64.846 2.71026 53.5643 7.70516C42.2827 12.7 32.1485 19.9612 23.7913 29.0376L37.0331 41.2301C43.7188 33.969 51.8262 28.16 60.8515 24.1641C69.8768 20.1682 79.6273 18.0707 89.4974 18.0018L89.3717 0.00219296Z"
				fill="var(--color-background-accent-orange-subtle-default)"
			/>
			<path
				d="M90.6283 0.00219328C102.954 0.0882432 115.13 2.70509 126.403 7.69052C137.675 12.6759 147.803 19.9237 156.16 28.9844L142.928 41.1875C136.243 33.9389 128.14 28.1408 119.122 24.1524C110.104 20.1641 100.363 18.0706 90.5027 18.0018L90.6283 0.00219328Z"
				fill="var(--color-background-accent-yellow-subtle-default)"
			/>
			<path
				d="M167.948 134.99C177.439 118.546 181.487 99.522 179.512 80.6389C177.537 61.7558 169.641 43.9809 156.954 29.8566L143.563 41.8853C153.713 53.1847 160.03 67.4046 161.609 82.5111C163.189 97.6176 159.951 112.837 152.359 125.992L167.948 134.99Z"
				fill="var(--color-background-accent-green-subtle-default)"
			/>

			<path
				d="M146.5 32L92.4146 83.7224C91.5428 83.4105 90.5855 83.2889 89.604 83.4079C86.2246 83.8174 83.816 86.8938 84.226 90.2769C84.636 93.66 87.7097 96.072 91.089 95.6625C94.4684 95.253 96.877 92.1766 96.4671 88.7934C96.4262 88.4565 96.3578 88.1295 96.2663 87.8141L147.5 33C148.638 31.7164 147.776 30.8506 146.5 32Z"
				fill="currentColor"
				class="result-gauge-dial"
				:style="`transform: rotate(${degrees}deg)`"
			/>
		</svg>

		<div v-if="!hideText && size !== 'xs'" class="bcc-nps-result-labels" :class="size">
			<h3 class="bcc-nps-result-labels--heading">{{ display ?? score }}</h3>
			<label class="bcc-nps-result-labels--label">{{ underline }}</label>
		</div>
	</div>
</template>
