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
  maxButtonsDisplayed: 6,
});
const { tableItems, maxButtonsDisplayed } = toRefs(props);

const emit = defineEmits(["update:paginatedRows"]);

const currentPage = ref(1);
const perPage = ref("2");
const perPageNumber = computed(() => parseInt(perPage.value));
const totalPages = computed(() => Math.max(tableItems.value.length / perPageNumber.value));
const maxButtons = computed(() => maxButtonsDisplayed.value - 1);

const isFirstPage = computed(() => currentPage.value === 1);
const isLastPage = computed(() => currentPage.value === totalPages.value);

const paginatedRows = computed(() => {
  const start = (currentPage.value - 1) * perPageNumber.value;
  const end = start + perPageNumber.value;
  return tableItems.value.slice(start, end);
});

const currentDisplayedPages = computed<PageNumberOrEllipsis[]>(() => {
  let arr: PageNumberOrEllipsis[] = [];
  let centerPage = Math.floor(maxButtons.value / 2) + 1;
  let startPage = currentPage.value - centerPage + 1;
  let endPage = currentPage.value + centerPage - 1;

  if (startPage < 1) {
    startPage = 1;
    endPage = maxButtons.value;
  } else if (endPage > totalPages.value) {
    endPage = totalPages.value;
    startPage = totalPages.value - maxButtons.value + 1;
  }

  for (let i = startPage; i <= endPage; i++) {
    if (i === startPage && i > 1 && props.displayLeftEllipsis) {
      arr.push(1);
      arr.push("...");
    }
    arr.push(i);
    if (i === endPage && i < totalPages.value && props.displayRightEllipsis) {
      arr.push("...");
      arr.push(totalPages.value);
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
