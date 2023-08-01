<script setup lang="ts">
type Props = {
  type: string;
  categoryKey: string;
  contents: Object | string;
  heading?: string;
};

const props = defineProps<Props>();

function getTailwindName(categoryKey, itemKey = null) {
  if (props.type == "") {
    return itemKey;
  }

  const base = `${props.type}-${categoryKey}`;

  if (itemKey == "DEFAULT" || itemKey == null) {
    return base;
  }

  return `${base}-${itemKey}`;
}
</script>

<template>
  <div class="mb-4 grid grid-cols-12">
    <div class="col-span-2 text-sm font-bold text-gray-600">{{ heading ?? categoryKey }}</div>
    <div class="col-span-10">
      <div class="flex rounded border border-gray-300 shadow">
        <div v-if="typeof contents == 'string'" class="flex-1">
          <div class="h-12 rounded" :style="{ backgroundColor: contents }"></div>
        </div>
        <div v-else v-for="(color, itemKey, index) in contents" :key="itemKey" class="flex-1">
          <div
            class="h-12"
            :style="{ backgroundColor: color }"
            :class="{
              'rounded-l': index == 0,
              'rounded-r': index == Object.keys(contents).length - 1,
            }"
          ></div>
        </div>
      </div>
      <div class="flex text-center text-sm text-gray-700">
        <div v-if="typeof contents == 'string'" class="flex-1 py-2">
          {{ getTailwindName(categoryKey) }}
        </div>
        <div v-else v-for="(color, itemKey) in contents" :key="itemKey" class="flex-1 py-2">
          {{ getTailwindName(categoryKey, itemKey) }}
        </div>
      </div>
    </div>
  </div>
</template>
