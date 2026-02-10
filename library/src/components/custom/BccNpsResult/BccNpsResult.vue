<script setup lang="ts">
import { computed, ref } from 'vue';

type Props = {
	score: number; // Between -100 and 100
	size?: 'lg' | 'md' | 'sm' | 'xs';
	display?: string;
	underline?: string;
	hideText?: boolean;
	animated?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
	size: 'md',
	hideText: false,
	animated: true,
});

const TOT_DEGREES = 250; // 70% of 360
const MIN_DEGREES = -170;
const MAX_DEGREES = 80;

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
		<svg class="result-gauge" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M40.7001 85.7001C39.7001 97.3001 42.8001 108.9 49.5001 118.4L31.1001 131.3L16.4001 141.6C4.10011 124.3 -1.49989 103.2 0.300108 82.2001C2.10011 61.5001 11.1001 42.0001 25.6001 27.1001L38.3001 39.8001L54.2001 55.7001C46.4001 63.8001 41.6001 74.4001 40.6001 85.7001H40.7001Z"
				fill="var(--color-background-accent-red-subtler-default)"
			/>
			<path
				d="M89.0001 0V40.5C76.6001 40.7 64.7001 45.7 55.7001 54.3L39.8001 38.4L27.1001 25.7C43.6001 9.5 65.8001 0.3 89.0001 0Z"
				fill="var(--color-background-accent-orange-subtler-default)"
			/>
			<path
				d="M152.9 25.7L140.2 38.4L124.3 54.3C115.3 45.7 103.5 40.8 91 40.5V0C114.2 0.2 136.4 9.4 152.9 25.6V25.7Z"
				fill="var(--color-background-accent-yellow-subtler-default)"
			/>
			<path
				d="M180 89.0001H139.5C139.3 76.6001 134.3 64.7001 125.7 55.7001L141.6 39.8001L154.3 27.1001C170.5 43.7001 179.7 65.9001 179.9 89.0001H180Z"
				fill="var(--color-background-accent-blue-subtler-default)"
			/>
			<path
				d="M180 91C179.8 110.1 173.5 128.7 162 144L147.6 133.2L129.6 119.7C135.8 111.4 139.3 101.4 139.5 91H180Z"
				fill="var(--color-background-accent-green-subtler-default)"
			/>
			<path
				d="M31 131.3L16.3 141.6C4.10005 124.3 -1.49995 103.2 0.300047 82.2001C2.10005 61.5001 11.1 42.0001 25.6 27.1001L38.3 39.8001C26.7 51.7001 19.6 67.2001 18.2 83.7001C16.7 100.6 21.2 117.4 31 131.3Z"
				fill="var(--color-background-accent-red-subtle-default)"
			/>
			<path
				d="M89.0001 0V18C70.6001 18.2 53.0001 25.5 39.8001 38.4L27.1001 25.7C43.6001 9.5 65.8001 0.3 89.0001 0Z"
				fill="var(--color-background-accent-orange-subtle-default)"
			/>
			<path
				d="M152.9 25.7L140.2 38.4C127 25.6 109.4 18.3 91 18V0C114.2 0.2 136.4 9.4 152.9 25.6V25.7Z"
				fill="var(--color-background-accent-yellow-subtle-default)"
			/>
			<path
				d="M180 89.0001H162C161.8 70.6001 154.5 53.0001 141.6 39.8001L154.3 27.1001C170.5 43.7001 179.7 65.9001 179.9 89.0001H180Z"
				fill="var(--color-background-accent-blue-subtle-default)"
			/>
			<path
				d="M180 91C179.8 110.1 173.5 128.7 162 144L147.6 133.2C156.8 121 161.8 106.2 162 91H180Z"
				fill="var(--color-background-accent-green-subtle-default)"
			/>

			<path
				d="M128.292 49.4565L92.4146 83.7227C91.5428 83.4108 90.5855 83.2892 89.604 83.4082C86.2246 83.8177 83.816 86.8941 84.226 90.2772C84.636 93.6603 87.7097 96.0722 91.089 95.6627C94.4684 95.2532 96.877 92.1769 96.4671 88.7937C96.4262 88.4568 96.3578 88.1298 96.2663 87.8144L130.221 51.3721C131.359 50.0885 129.568 48.3071 128.292 49.4565Z"
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
