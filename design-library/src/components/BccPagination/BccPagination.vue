<script setup lang="ts">
import {
  PaginationEllipsis,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
  PaginationRoot,
} from "radix-vue";
import { ArrowBackIosNewIcon } from "@bcc-code/icons-vue";
import { ArrowForwardIosIcon } from "@bcc-code/icons-vue";
import { toRefs, ref, computed, watchEffect } from "vue";
import BccSelect from "../BccSelect/BccSelect.vue";

type Props = {
  items: number;
  rowsPerPageOptions?: number[];
  rowsPerPage?: number;
  maxButtonsDisplayed?: number;
  starterPage?: number;
  showElipsis?: boolean;
  align?: "left" | "center" | "right";
  displayRowsPerPage?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  displayRowsPerPage: true,
  showElipsis: true,
  maxButtonsDisplayed: 1,
  starterPage: 1,
  align: "right",
  rowsPerPage: 5,
  rowsPerPageOptions: () => [5, 10, 25, 50],
});
const { rowsPerPage, maxButtonsDisplayed, showElipsis } = toRefs(props);

const emit = defineEmits(["update:currentPage", "update:totalPages"]);

const currentPage = ref(1);
const perPage = ref(rowsPerPage.value.toString());
const perPageNumber = computed(() => parseInt(perPage.value));
const totalPages = computed(() => Math.ceil(props.items / perPageNumber.value));

watchEffect(() => {
  emit("update:currentPage", currentPage.value);
  emit("update:totalPages", totalPages.value);
});
</script>

<template>
  <div
    :class="{
      'bcc-pagination-left':
        (align === 'left' && displayRowsPerPage === true) ||
        (align === 'right' && displayRowsPerPage === false),
      'bcc-pagination-center': align === 'center',
      'bcc-pagination': align === 'right',
    }"
  >
    <div v-if="displayRowsPerPage === true" class="bcc-pagination-rowsperpage-container">
      <label class="text-caption-sm">Rows per page</label>
      <BccSelect class="bcc-pagination-rowsperpage" v-model="perPage" size="sm">
        <option v-for="(rowSize, index) in rowsPerPageOptions" :value="rowSize" v-bind:key="index">
          {{ rowSize }}
        </option>
      </BccSelect>
      <label class="text-caption-sm">of {{ totalPages }} entries</label>
    </div>
    <PaginationRoot
      :total="props.items"
      :itemsPerPage="perPageNumber"
      :sibling-count="maxButtonsDisplayed"
      v-model:page="currentPage"
      :default-page="starterPage"
      v-bind:show-edges="showElipsis"
    >
      <PaginationList v-slot="{ items }" class="bcc-pagination-button-container">
        <PaginationPrev class="bcc-pagination-button bcc-pagination-arrow-left">
          <ArrowBackIosNewIcon />
        </PaginationPrev>
        <template v-for="(page, index) in items">
          <PaginationListItem
            class="bcc-pagination-button data-[selected]:bg-secondary data-[selected]:font-semibold data-[selected]:text-interactive"
            v-if="page.type === 'page'"
            :key="index"
            :value="page.value"
          >
            {{ page.value }}
          </PaginationListItem>
          <PaginationEllipsis
            class="bcc-pagination-elipsis"
            v-else
            :key="page.type"
            :index="index"
          ></PaginationEllipsis>
        </template>
        <PaginationNext class="bcc-pagination-button bcc-pagination-arrow-right">
          <ArrowForwardIosIcon />
        </PaginationNext>
      </PaginationList>
    </PaginationRoot>
  </div>
</template>
