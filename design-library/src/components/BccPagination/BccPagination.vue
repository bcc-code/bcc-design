<script setup lang="ts">
import { ArrowBackIosIcon } from "@bcc-code/icons-vue";
import { ArrowForwardIosIcon } from "@bcc-code/icons-vue";
import { toRefs, ref, computed, watchEffect } from "vue";
import type { Item } from "../BccTable/BccTable.vue";
import BccSelect from "../BccSelect/BccSelect.vue";
import BccFormLabel from "../BccFormLabel/BccFormLabel.vue";

type Props = {
  tableItems: Item[];
  rowsPerPageArray?: number[];
  rowsPerPage?: number;
  maxButtonsDisplayed?: number;
  displayLeftEllipsis?: boolean;
  displayRightEllipsis?: boolean;
  align?: "left" | "center" | "right";
  displayRowsPerPage?: boolean;
};

type PageNumberOrEllipsis = number | "...";

const props = withDefaults(defineProps<Props>(), {
  displayLeftEllipsis: true,
  displayRightEllipsis: true,
  displayRowsPerPage: true,
  maxButtonsDisplayed: 3,
  align: "right",
  rowsPerPage: 4,
});
const { tableItems, maxButtonsDisplayed, rowsPerPage, displayRightEllipsis, displayLeftEllipsis } =
  toRefs(props);

const emit = defineEmits(["update:paginatedRows", "update:pageChanged"]);

const currentPage = ref(1);
const perPage = ref(rowsPerPage.value.toString());
const perPageNumber = computed(() => parseInt(perPage.value));
const totalPages = computed(() => Math.ceil(tableItems.value.length / perPageNumber.value));
const maxButtons = computed(() => maxButtonsDisplayed.value);

const isFirstPage = computed(() => currentPage.value === 1);
const isLastPage = computed(() => currentPage.value === totalPages.value);

const paginatedRows = computed(() => {
  const start = (currentPage.value - 1) * perPageNumber.value;
  const end = start + perPageNumber.value;
  return tableItems.value.slice(start, end);
});

const currentDisplayedPages = computed<PageNumberOrEllipsis[]>(() => {
  let arr: PageNumberOrEllipsis[] = [];

  let startPage = Math.max(1, currentPage.value - Math.floor(maxButtons.value / 2));
  let endPage = Math.min(totalPages.value, currentPage.value + Math.floor(maxButtons.value / 2));

  if (endPage - startPage < maxButtons.value) {
    if (startPage === 1) {
      endPage = Math.min(totalPages.value, startPage + maxButtons.value - 1);
      if (displayLeftEllipsis.value === false) {
        endPage = Math.min(totalPages.value, startPage + maxButtons.value);
      }
    } else if (endPage === totalPages.value) {
      startPage = Math.max(1, endPage - maxButtons.value + 1);
      if (displayRightEllipsis.value === false) {
        startPage = Math.max(1, endPage - maxButtons.value);
      }
    }
  }

  if (startPage > 2 && displayLeftEllipsis.value === true) {
    arr.push(1);
    if (startPage > 2) {
      arr.push("...");
    }
  }

  for (let i: number = startPage; i <= endPage; i++) {
    arr.push(i);
  }

  if (endPage < totalPages.value && displayRightEllipsis.value === true) {
    if (endPage < totalPages.value - 1) {
      arr.push("...");
    }
    arr.push(totalPages.value);
  }

  return arr;
});

const goToPage = (numPage: PageNumberOrEllipsis) => {
  if (numPage === "...") {
    return;
  }

  currentPage.value = numPage;
};

const changePage = (value: number) => {
  currentPage.value += value;
  emit("update:pageChanged", currentPage.value);
};

watchEffect(() => {
  emit("update:paginatedRows", paginatedRows.value);
});
</script>

<template>
  <div
    :class="{
      'bcc-pagination-left': align === 'left',
      'bcc-pagination-right': align === 'right',
      'bcc-pagination-center': align === 'center',
    }"
  >
    <div v-if="displayRowsPerPage === true" class="bcc-pagination-rowsPerPage-container">
      <BccFormLabel>Rows per page</BccFormLabel>
      <BccSelect class="bcc-pagination-rowsPerPage" @change="goToPage(1)" v-model="perPage">
        <option v-for="(rowSize, index) in rowsPerPageArray" :value="rowSize" v-bind:key="index">
          {{ rowSize }}
        </option>
      </BccSelect>
      <BccFormLabel>of {{ totalPages }} entries</BccFormLabel>
    </div>

    <div class="bcc-pagination-button-container">
      <button @click="changePage(-1)" :disabled="isFirstPage" class="bcc-pagination-button-left">
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

      <button @click="changePage(1)" :disabled="isLastPage" class="bcc-pagination-button-right">
        <ArrowForwardIosIcon class="bcc-pagination-button-icon" />
      </button>
    </div>
  </div>
</template>
