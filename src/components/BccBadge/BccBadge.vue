<script setup lang="ts">
import { sizeVariants, variants } from '../../composables/variants';

withDefaults(defineProps<{
  icon?: any
  iconRight?: boolean
  size?: keyof typeof sizeVariants
  variant?: keyof typeof variants
}>(), {
  icon: null,
  iconRight: false,
  size: 'xs',
  variant: 'neutral',
})
</script>

<template>
  <div class="inline-flex items-center justify-center py-[.2em] px-[1em] leading-none tracking-wide font-medium rounded-md border" :class="[
    variants[variant],
    sizeVariants[size] ?? size
  ]">
    <component v-if="icon" :is="icon" class="h-[1.2em] w-[1.2em] shrink-0" :class="[
      iconRight ? 'ml-[.4em] order-3' : 'mr-[.4em] order-1'
    ]"/>
    <span class="order-2"><slot></slot></span>
  </div>
</template>
