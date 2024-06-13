<script setup lang="ts">
import { computed, ref } from "vue";

type Props = {
  score: number; // Between -100 and 100
  size: "lg" | "md" | "sm" | "tiny";
  underline: string;
  hideDisplay: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  hideDisplay: false,
});

const TOT_DEGREES = 250;
const MIN_DEGREES = 170;
const MAX_DEGREES = 80;

function scoreToDegrees(score: number) {
  const perc = (score + 100) / 200;
  const degr = perc * TOT_DEGREES - MIN_DEGREES;
  if (degr > MAX_DEGREES) return MAX_DEGREES;
  if (degr < -MIN_DEGREES) return -MIN_DEGREES;
  return degr;
}

const started = ref(false);
setTimeout(() => {
  started.value = true;
}, 150);

const degrees = computed(() => {
  const startingPoint = -170;

  if (started.value && props.score !== undefined) {
    return scoreToDegrees(props.score);
  }
  return startingPoint;
});
</script>

<template>
  <div class="bcc-nps-result" :class="size">
    <svg class="result-gauge" viewBox="0 0 177 178" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M174.619 71L129.269 80.8641C129.604 82.9717 129.78 85.1312 129.78 87.3333C129.78 96.5843 126.701 105.125 121.5 112L158.155 141C166.173 130.681 171.626 119.536 174.376 107.845C177.126 96.1542 177.206 83.7678 174.616 71H174.619Z"
        fill="#DFF9E5"
      />
      <path
        d="M128.329 77L173.5 67.0861C170.46 54.3393 165.164 43.0565 157.742 33.5201C150.321 23.9869 140.682 16.0803 129.069 10L108.5 51.0306C118.246 56.54 125.535 65.8768 128.329 77Z"
        fill="#FFF0DB"
      />
      <path
        d="M46.9258 87.2829C46.9258 64.4003 65.3608 45.8512 88.1025 45.8512C94.157 45.8512 99.9034 47.1647 105.079 49.5248L125.5 8.52267C113.693 2.86646 101.117 0 88.0872 0C72.1198 0 56.4422 4.40098 42.7533 12.7303C28.6891 21.2867 17.3427 33.6641 9.9431 48.5243C2.3727 63.7282 -0.738426 80.4636 0.945241 96.9197C2.57096 112.783 8.6102 127.981 18.4407 141L54.969 111.887C49.9149 105.007 46.9258 96.4992 46.9258 87.286V87.2829Z"
        fill="#FFE3E3"
      />
      <path
        d="M174.633 71L155.354 75.2305C156.065 79.156 156.441 83.2004 156.441 87.3333C156.441 102.776 151.24 117.005 142.5 128.373L158.318 141C166.265 130.681 171.669 119.536 174.395 107.845C177.12 96.1542 177.199 83.7678 174.633 71Z"
        fill="#34C759"
      />
      <path
        d="M154.191 71L173.5 66.7724C170.469 54.0956 165.188 42.8748 157.789 33.3909C150.389 23.91 140.779 16.0469 129.201 10L120.5 27.3104C137.203 36.312 149.676 52.1145 154.191 70.997V71Z"
        fill="#FF921B"
      />
      <path
        d="M20.6948 87.2829C20.6948 49.8255 50.8757 19.4576 88.1025 19.4576C98.3814 19.4576 108.12 21.7778 116.838 25.9179L125.5 8.52267C113.693 2.86646 101.117 0 88.0872 0C72.1198 0 56.4422 4.40098 42.7533 12.7303C28.6891 21.2867 17.3427 33.6641 9.9431 48.5243C2.3727 63.7282 -0.738426 80.4636 0.945241 96.9197C2.57096 112.783 8.6102 127.981 18.4407 141L34.399 128.279C25.8007 116.893 20.6917 102.689 20.6917 87.2829H20.6948Z"
        fill="#F93A4F"
      />
      <path
        d="M143.247 32.3886L91.5927 77.9944C90.3998 77.5143 89.0778 77.2935 87.7092 77.4053C82.9969 77.79 79.487 81.9285 79.8722 86.646C80.2573 91.3634 84.392 94.8778 89.1042 94.4931C93.8165 94.1084 97.3264 89.9699 96.9413 85.2524C96.9029 84.7825 96.8257 84.325 96.7159 83.8824L145.82 35.152C147.469 33.4324 145.08 30.8628 143.247 32.3886Z"
        fill="black"
        class="result-gauge-dial"
        :style="`transform: rotate(${degrees}deg)`"
      />
    </svg>
    <div class="bcc-nps-result-labels" v-if="size !== 'tiny'">
      <h3 v-if="hideDisplay === false" class="text-heading-lg font-bold">{{ score }}</h3>
      <label class="text-label text-tertiary">{{ underline }}</label>
    </div>
  </div>
</template>