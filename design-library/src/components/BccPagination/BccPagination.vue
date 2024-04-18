<script setup lang="ts">
import { ArrowBackIosNewIcon } from "@bcc-code/icons-vue";
import { ArrowForwardIosIcon } from "@bcc-code/icons-vue";
import { toRefs, ref, computed, watchEffect } from "vue";
import BccSelect from "../BccSelect/BccSelect.vue";

type Props = {
  total: number;
  rowsPerPageOptions?: number[];
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
  rowsPerPage: 5,
  rowsPerPageOptions: () => [5, 10, 25, 50],
});
const { total, maxButtonsDisplayed, rowsPerPage, displayRightEllipsis, displayLeftEllipsis } =
  toRefs(props);

const emit = defineEmits(["update:currentPage", "update:totalPages", "update:rowsPerPage"]);

const currentPage = ref(1);
const perPage = ref(rowsPerPage.value.toString());
const perPageNumber = computed(() => parseInt(perPage.value));
const totalPages = computed(() => Math.ceil(total.value / perPageNumber.value));
const maxButtons = computed(() => maxButtonsDisplayed.value);

const isFirstPage = computed(() => currentPage.value === 1);
const isLastPage = computed(() => currentPage.value === totalPages.value);

const currentDisplayedPages = computed<PageNumberOrEllipsis[]>(() => {
  let arr: PageNumberOrEllipsis[] = [];

  let startPage = Math.max(1, currentPage.value - Math.floor(maxButtons.value / 2));
  let endPage = Math.min(totalPages.value, currentPage.value + Math.floor(maxButtons.value / 2));

  if (endPage - startPage < maxButtons.value) {
    if (startPage === 1) {
      endPage = Math.min(totalPages.value, startPage + maxButtons.value - 1);
    } else if (endPage === totalPages.value) {
      startPage = Math.max(1, endPage - maxButtons.value + 1);
    }
  }

  if (startPage > 1 && displayLeftEllipsis.value === true) {
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
};

watchEffect(() => {
  emit("update:totalPages", totalPages.value);
  emit("update:rowsPerPage", perPageNumber.value);
  emit("update:currentPage", currentPage.value);
});
</script>

<template>
  <div
    class="bcc-pagination"
    :class="{
      'bcc-pagination-left':
        (align === 'left' && displayRowsPerPage === true) ||
        (align === 'right' && displayRowsPerPage === false),
      'bcc-pagination-center': align === 'center',
    }"
  >
    <div v-if="displayRowsPerPage === true" class="bcc-pagination-rowsperpage-container">
      <label class="text-caption-sm">Rows per page</label>
      <BccSelect
        class="bcc-pagination-rowsperpage"
        @change="goToPage(1)"
        v-model="perPage"
        size="sm"
      >
        <option v-for="(rowSize, index) in rowsPerPageOptions" :value="rowSize" v-bind:key="index">
          {{ rowSize }}
        </option>
      </BccSelect>
      <label class="text-caption-sm">of {{ totalPages }} entries</label>
    </div>

    <div class="bcc-pagination-button-container">
      <button
        @click="changePage(-1)"
        :disabled="isFirstPage"
        class="bcc-pagination-button bcc-pagination-arrow-left"
      >
        <ArrowBackIosNewIcon class="bcc-pagination-button-icon" />
      </button>

      <div v-for="(page, index) in currentDisplayedPages" v-bind:key="index">
        <button
          v-if="page !== '...'"
          @click="goToPage(page)"
          class="bcc-pagination-button"
          :class="{
            'bcc-pagination-button-selected': page === currentPage,
          }"
        >
          {{ page }}
        </button>
        <span v-if="page === '...'" class="bcc-pagination-elipsis">{{ page }}</span>
      </div>

      <button
        @click="changePage(1)"
        :disabled="isLastPage"
        class="bcc-pagination-button bcc-pagination-arrow-right"
      >
        <ArrowForwardIosIcon class="bcc-pagination-button-icon" />
      </button>
    </div>
  </div>
</template>
