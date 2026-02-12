<script setup lang="ts">
import { computed } from 'vue';

export type NpsScoreProps = {
	reverse?: boolean;
	leftLabel?: string;
	rightLabel?: string;
	labelPosition?: 'top' | 'bottom';
	min?: number;
	max?: number;
	disabled?: boolean;
};

const modelValue = defineModel<number | null>({
	default: null,
});

const props = withDefaults(defineProps<NpsScoreProps>(), {
	reverse: false,
	disabled: false,
	leftLabel: 'Not likely',
	rightLabel: 'Very likely',
	labelPosition: 'top',
	min: 0,
	max: 10,
});

let anim: any = null;
function selected(i: number) {
	if (props.disabled) return;

	if (modelValue.value === null) {
		modelValue.value = 0;
	}
	anim && clearInterval(anim);
	anim = setInterval(() => {
		if (modelValue.value === i) {
			return anim && clearInterval(anim);
		}
		if (modelValue.value! < i) {
			++modelValue.value!;
		} else {
			--modelValue.value!;
		}
	}, 20);
}

const range = computed(() => {
	let result = [];
	for (let i = props.min; i <= props.max; i++) {
		result.push(i);
	}
	return result;
});
</script>

<template>
	<div class="bcc-nps-score">
		<div
			class="bcc-nps-score--heading"
			:class="labelPosition === 'top' ? 'order-1' : labelPosition === 'bottom' ? 'order-last' : ''"
		>
			<p class="bcc-nps-score--label">{{ leftLabel }}</p>
			<p class="bcc-nps-score--label text-right">{{ rightLabel }}</p>
		</div>
		<div class="bcc-nps-score--bar order-2" :class="{ disabled, reverse }">
			<button
				v-for="num in range"
				:key="num"
				:disabled="disabled"
				class="bcc-nps-score--number"
				:class="{
					inactive: modelValue === null || isNaN(modelValue) || modelValue < num,
					active: modelValue === num,
				}"
				@click="selected(num)"
			>
				{{ num }}
			</button>
		</div>
	</div>
</template>
