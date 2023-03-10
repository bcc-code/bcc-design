<script setup lang="ts">
defineProps<{
  checked: boolean;
  required?: boolean;
  disabled?: boolean;
  square?: boolean;
}>();

defineEmits(["update:checked"]);
</script>

<template>
  <button
    class="shrink-0 ring-tree-green-300 focus:outline-none focus:ring-2"
    @click.prevent="!disabled && $emit('update:checked', !checked)"
    :class="[square ? 'rounded' : 'rounded-full']"
  >
    <svg
      v-if="checked"
      class="checkmark"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
      :class="[square ? 'rounded' : 'rounded-full', disabled ? 'opacity-50' : '']"
    >
      <rect
        v-if="square"
        class="checkmark__outline"
        x="0.5"
        y="0.5"
        width="51"
        height="51"
        rx="10"
      />
      <circle v-else class="checkmark__outline" cx="26" cy="26" r="25" fill="none" />
      <path
        class="checkmark__check"
        stroke-width="6"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
        d="M14.1 27.2l7.1 7.2 16.7-16.8"
      />
    </svg>
    <div
      v-else
      class="h-full w-full border border-neutral-300"
      :class="[
        square ? 'rounded' : 'rounded-full',
        disabled ? 'bg-neutral-200' : 'bg-neutral-0 dark:bg-neutral-900',
      ]"
    ></div>
    <input
      type="checkbox"
      class="absolute hidden h-0 w-0 opacity-0"
      :required="required"
      :checked="checked"
      :disabled="disabled"
    />
  </button>
</template>

<style>
.checkmark__outline {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 4;
  stroke-miterlimit: 10;
  stroke: currentColor;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark {
  width: 100%;
  height: 100%;
  stroke-width: 2;
  stroke: #fff;
  stroke-miterlimit: 10;
  animation: fill 0.4s ease-in-out 0.4s forwards, scale 0.3s ease-in-out 0.7s both;
  padding: 0;
  margin: 0;
}

.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes scale {
  0%,
  100% {
    transform: none;
  }

  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
}

@keyframes fill {
  100% {
    box-shadow: inset 0px 0px 0px 30px currentColor;
  }
}
</style>
