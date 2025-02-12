<script setup lang="ts" generic="TItem extends BccTableItem">
import { SwapVertIcon, ArrowUpwardIcon, ArrowDownwardIcon } from "@bcc-code/icons-vue";
import { computed, toRefs } from "vue";
import { BccTableColumn, BccTableItem, BccTableSortDirection } from "./types";

type Props = {
  columns: BccTableColumn[];
  items: TItem[];
  sortBy?: string;
  sortDirection?: BccTableSortDirection;
};

const props = withDefaults(defineProps<Props>(), {
  sortDirection: "descending",
});
const { columns, items, sortBy, sortDirection } = toRefs(props);

const emit = defineEmits(["update:sortBy", "update:sortDirection"]);

function getField(item: TItem, columnKey: string) {
  const segments = columnKey.split(".");
  return segments.reduce((obj, key) => obj[key], item);
}

const sortedItems = computed(() => {
  if (sortBy?.value == undefined) {
    return items.value;
  }

  const column = columns.value.find((c) => c.key == sortBy.value);

  if (!column) {
    throw "Sorting by unknown column";
  }

  const sortableItems = [...items.value];

  if (column.sortMethod) {
    return sortableItems.sort(column.sortMethod);
  }

  return sortableItems.sort((a, b) => {
    const firstItem = getField(a, column.key);
    const secondItem = getField(b, column.key);
    if (firstItem < secondItem) return sortDirection.value == "descending" ? 1 : -1;
    if (firstItem > secondItem) return sortDirection.value == "descending" ? -1 : 1;
    return 0;
  });
});

function sort(column: BccTableColumn) {
  if (column.sortable === false) {
    return;
  }

  // Stop sorting this column if we have cycled through both sorting directions
  if (sortBy?.value == column.key && sortDirection.value === "descending") {
    emit("update:sortDirection", "descending");
    emit("update:sortBy", undefined);
    return;
  }

  // If the column was already sorted, flip the sort direction
  if (sortBy?.value == column.key) {
    emit("update:sortDirection", "descending");
    return;
  }

  // Reset the sort direction when another column is clicked
  emit("update:sortDirection", "ascending");
  emit("update:sortBy", column.key);
}
</script>

<template>
  <div class="bcc-table-wrapper">
    <table class="bcc-table">
      <thead>
        <tr class="bcc-table-header-row">
          <th
            scope="col"
            class="bcc-table-header"
            :class="{ 'bcc-table-header-sortable': column.sortable !== false }"
            v-for="column in columns"
            :key="column.key"
            @click="sort(column)"
          >
            <div class="bcc-table-header-content">
              {{ column.text }}

              <button
                v-if="column.sortable !== false"
                aria-label="Sort column"
                class="bcc-table-header-sort"
              >
                <SwapVertIcon
                  class="bcc-table-header-sort-icon bcc-table-header-sort-icon-undetermined"
                  v-if="sortBy !== column.key"
                />
                <ArrowUpwardIcon
                  class="bcc-table-header-sort-icon"
                  v-if="sortBy == column.key && sortDirection == 'ascending'"
                />
                <ArrowDownwardIcon
                  class="bcc-table-header-sort-icon"
                  v-if="sortBy == column.key && sortDirection == 'descending'"
                />
              </button>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in sortedItems" :key="key">
          <td class="bcc-table-cell" v-for="column in columns" :key="column.key">
            <slot v-if="$slots[`item.${column.key}`]" :name="`item.${column.key}`" :item="item" />
            <span v-else>
              {{ getField(item, column.key) }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
