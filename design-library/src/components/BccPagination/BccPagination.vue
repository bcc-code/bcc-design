<script setup lang="ts">
import { ArrowBackIosIcon } from "@bcc-code/icons-vue";
import { ArrowForwardIosIcon } from "@bcc-code/icons-vue";
import { toRefs, ref, computed, watchEffect } from "vue";
import type { Item } from "../BccTable/BccTable.vue";

type Props = {
  rows: Item[];
  totalRecords: number;
  perPage: number;
};

const props = withDefaults(defineProps<Props>(), {});
const { rows, totalRecords, perPage } = toRefs(props);

const emit = defineEmits(["update:modelValue"]);

const currentPage = ref(1);
const totalPages = computed(() => Math.ceil(totalRecords.value / perPage.value));

const goToPage = (numPage: number) => {
  currentPage.value = numPage;
};

const isFirstPage = computed(() => currentPage.value === 1);
const isLastPage = computed(() => currentPage.value === totalPages.value);

const safeRows = computed(() => (Array.isArray(rows.value) ? rows.value : []));

const paginatedRows = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  const end = start + perPage.value;
  return safeRows.value.slice(start, end);
});

watchEffect(() => {
  emit("update:modelValue", paginatedRows.value);
});
</script>

<template>
  <div class="bcc-pagination">
    <button :disabled="isFirstPage" class="bcc-pagination-button-left">
      <ArrowBackIosIcon class="bcc-pagination-button-icon" />
    </button>

    <button
      v-for="page in totalPages"
      v-bind:key="page"
      @click="() => goToPage(page)"
      class="bcc-pagination-button-page"
    >
      <p>{{ page }}</p>
    </button>

    <button :disabled="isLastPage" class="bcc-pagination-button-right">
      <ArrowForwardIosIcon class="bcc-pagination-button-icon" />
    </button>
  </div>
</template>
