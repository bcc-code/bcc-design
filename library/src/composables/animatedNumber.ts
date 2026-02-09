import { ref, watch, type Ref } from 'vue';

export default function useAnimatedNumber(to: Ref<number>, from = 0, duration = 1000) {
	if (duration <= 0.1) return { value: to };
	const current = ref(from);

	function animateNumber(startValue: number, endValue: number) {
		const startTime = Date.now();
		const durationInMs = duration;
		const changeInValue = endValue - startValue;

		const animate = () => {
			const elapsed = Date.now() - startTime;
			const progress = easeOutQuad(elapsed, startValue, changeInValue, durationInMs);

			if (elapsed < durationInMs) {
				current.value = Math.floor(progress);
				window.requestAnimationFrame(animate);
			} else {
				current.value = endValue;
			}
		};

		animate();
	}

	watch(
		to,
		newTo => {
			animateNumber(current.value ?? from, newTo);
		},
		{ immediate: true }
	);

	return { value: current };
}

function easeOutQuad(t: number, b: number, c: number, d: number) {
	t /= d;
	return -c * t * (t - 2) + b;
}
