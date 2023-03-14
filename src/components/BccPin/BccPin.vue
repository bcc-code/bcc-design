<script setup lang="ts">
import { sizeVariants, variants } from '../../composables/variants';

withDefaults(defineProps<{
  icon?: any
  size?: keyof typeof sizeVariants
  variant?: keyof typeof variants
}>(), {
  icon: null,
  size: 'xs',
  variant: 'neutral',
})
</script>

<template>
  <div class="p-[.3em] rounded-full inline-block shadow-md" :class="[
    variants[variant],
    sizeVariants[size] ?? size
  ]">
    <component :is="icon" class="h-[1.2em] w-[1.2em]"/>
  </div>
</template>