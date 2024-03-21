<script setup lang="ts">
import { ArrowBackIosIcon } from "@bcc-code/icons-vue";
import { ArrowForwardIosIcon } from "@bcc-code/icons-vue";
import { toRefs, ref, computed, watchEffect } from "vue";
import type { Item } from "../BccTable/BccTable.vue";
import BccSelect from "../BccSelect/BccSelect.vue";

type Props = {
  tableItems: Item[];
  perPage?: number;
  maxButtonsDisplayed: number;
};

const props = withDefaults(defineProps<Props>(), {
  perPage: 2,
  maxButtonsDisplayed: 2,
});
const { tableItems, perPage, maxButtonsDisplayed } = toRefs(props);

const emit = defineEmits(["update:paginatedRows"]);

const currentPage = ref(1);
const totalPages = computed(() => Math.ceil(tableItems.value.length / perPage.value));

const isFirstPage = computed(() => currentPage.value === 1);
const isLastPage = computed(() => currentPage.value === totalPages.value);

const paginatedRows = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  const end = start + perPage.value;
  return tableItems.value.slice(start, end);
});

const startPage = computed(() => {
  if (currentPage.value <= maxButtonsDisplayed.value) {
    return 1;
  } else if (currentPage.value + maxButtonsDisplayed.value > totalPages.value) {
    return totalPages.value - maxButtonsDisplayed.value;
  } else {
    return currentPage.value - Math.floor(maxButtonsDisplayed.value / 2);
  }
});

const endPage = computed(() => {
  return startPage.value + maxButtonsDisplayed.value;
});

const currentDisplayedPages = computed(() => {
  let arr: number[] = [];
  for (let i: number = startPage.value; i <= endPage.value; i++) {
    arr.push(i);
  }
  return arr;
});

const goToPage = (numPage: number) => {
  currentPage.value = numPage;
};

const nextPage = () => {
  currentPage.value += 1;
};

const previous = () => {
  currentPage.value -= 1;
};

watchEffect(() => {
  emit("update:paginatedRows", paginatedRows.value);
});
</script>

<template>
  <div class="bcc-pagination">
    <BccSelect :v-model="perPage">
      <option disabled value="">Select an option...</option>
      <option :value="1">1</option>
      <option :value="2">2</option>
    </BccSelect>

    <div class="bcc-pagination-button-container">
      <button @click="previous" :disabled="isFirstPage" class="bcc-pagination-button-left">
        <ArrowBackIosIcon class="bcc-pagination-button-icon" />
      </button>

      <button
        v-for="page in currentDisplayedPages"
        v-bind:key="page"
        @click="goToPage(page)"
        :class="{
          'bcc-pagination-button-selected': page === currentPage,
          'bcc-pagination-button-unselected': page !== currentPage,
        }"
      >
        {{ page }}
      </button>

      <button @click="nextPage" :disabled="isLastPage" class="bcc-pagination-button-right">
        <ArrowForwardIosIcon class="bcc-pagination-button-icon" />
      </button>
    </div>
  </div>
</template>
