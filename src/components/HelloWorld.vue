<script setup lang="ts">
defineProps<{
  msg: string;
}>();
</script>

<template>
  <span class="m-2 text-green-700">Hello {{ msg }}!</span>
</template>
