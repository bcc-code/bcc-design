<script setup lang="ts">
import { ArrowBackIosIcon } from "@bcc-code/icons-vue";
import { ArrowForwardIosIcon } from "@bcc-code/icons-vue";
import { toRefs, ref, computed, watchEffect } from "vue";
import type { Item } from "../BccTable/BccTable.vue";
import BccSelect from "../BccSelect/BccSelect.vue";
import BccFormLabel from "../BccFormLabel/BccFormLabel.vue";

type Props = {
  tableItems: Item[];
  paginationPageSize: number[];
  maxButtonsDisplayed?: number;
  displayLeftEllipsis?: boolean;
  displayRightEllipsis?: boolean;
};

type PageNumberOrEllipsis = number | "...";

const props = withDefaults(defineProps<Props>(), {
  displayLeftEllipsis: true,
  displayRightEllipsis: true,
  maxButtonsDisplayed: 3,
});
const { tableItems, maxButtonsDisplayed } = toRefs(props);

const emit = defineEmits(["update:paginatedRows"]);

const currentPage = ref(1);
const perPage = ref("2");
const perPageNumber = computed(() => parseInt(perPage.value));
const totalPages = computed(() => Math.ceil(tableItems.value.length / perPageNumber.value));
const maxButtons = computed(() => maxButtonsDisplayed.value - 1);

const isFirstPage = computed(() => currentPage.value === 1);
const isLastPage = computed(() => currentPage.value === totalPages.value);

const paginatedRows = computed(() => {
  const start = (currentPage.value - 1) * perPageNumber.value;
  const end = start + perPageNumber.value;
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

  if (!arr.includes(totalPages.value) && props.displayRightEllipsis === true) {
    arr.push("...");
    arr.push(totalPages.value);
  }

  if (!arr.includes(1) && props.displayLeftEllipsis === true) {
    arr.splice(0, 0, 1);
    arr.splice(1, 0, "...");
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
</script>

<template>
  <div class="bcc-pagination">
    <div class="bcc-pagination-rowsPerPage-container">
      <BccFormLabel>Rows per page</BccFormLabel>
      <BccSelect class="bcc-pagination-rowsPerPage" @change="goToPage(1)" v-model="perPage">
        <option v-for="(rowSize, index) in paginationPageSize" :value="rowSize" v-bind:key="index">
          {{ rowSize }}
        </option>
      </BccSelect>
      <BccFormLabel>of {{ totalPages }} entries</BccFormLabel>
    </div>

    <div class="bcc-pagination-button-container">
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
