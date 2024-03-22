<script setup lang="ts">
import { ArrowBackIosIcon } from "@bcc-code/icons-vue";
import { ArrowForwardIosIcon } from "@bcc-code/icons-vue";
import { toRefs, ref, computed, watchEffect } from "vue";
import type { Item } from "../BccTable/BccTable.vue";
import BccSelect from "../BccSelect/BccSelect.vue";

type Props = {
  tableItems: Item[];
  maxButtonsDisplayed: number;
};

type PageNumberOrEllipsis = number | "...";

const props = withDefaults(defineProps<Props>(), {
  maxButtonsDisplayed: 3,
});
const { tableItems, maxButtonsDisplayed } = toRefs(props);

const emit = defineEmits(["update:paginatedRows"]);

const currentPage = ref(1);
const perPage = ref(2);
const totalPages = computed(() => Math.ceil(tableItems.value.length / perPage.value));
const maxButtons = computed(() => maxButtonsDisplayed.value - 1);

const isFirstPage = computed(() => currentPage.value === 1);
const isLastPage = computed(() => currentPage.value === totalPages.value);

const paginatedRows = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  const end = start + perPage.value;
  return tableItems.value.slice(start, end);
});

const startPage = computed(() => {
  if (currentPage.value <= maxButtons.value) {
    return 1;
  } else if (currentPage.value + maxButtons.value >= totalPages.value) {
    return totalPages.value - maxButtons.value;
  } else {
    return currentPage.value - Math.floor(maxButtons.value / 2);
  }
});

const endPage = computed(() => {
  if (totalPages.value <= maxButtons.value) {
    return totalPages.value;
  } else {
    return startPage.value + maxButtons.value;
  }
});

const currentDisplayedPages = computed<PageNumberOrEllipsis[]>(() => {
  let arr: PageNumberOrEllipsis[] = [];
  for (let i: number = startPage.value; i <= endPage.value; i++) {
    arr.push(i);
  }

  if (totalPages.value >= maxButtons.value) {
    if (arr.includes(totalPages.value)) {
      arr.pop();
    }

    arr.push(totalPages.value);

    if (currentPage.value !== totalPages.value) {
      // Insert an ellipsis before the last button
      arr.splice(arr.length - 1, 0, "...");
    }
  }

  return arr;
});

const goToPage = (numPage: PageNumberOrEllipsis) => {
  if (numPage === "...") {
    return;
  }

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

const changePerPageValue = () => {
  console.log(perPage.value);
};
</script>

<template>
  <div class="bcc-pagination">
    <div class="bcc-pagination-button-container">
      <BccSelect @change="changePerPageValue()">
        <option disabled :value="0">Select an option...</option>
        <option :value="1">Option 1</option>
        <option :value="2">Option 2</option>
      </BccSelect>

      <button @click="previous" :disabled="isFirstPage" class="bcc-pagination-button-left">
        <ArrowBackIosIcon class="bcc-pagination-button-icon" />
      </button>

      <button
        v-for="(page, index) in currentDisplayedPages"
        v-bind:key="index"
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
