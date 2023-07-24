<script setup lang="ts">
import { SwapVertIcon, ArrowUpwardIcon, ArrowDownwardIcon } from "@bcc-code/icons-vue";
import { onMounted, ref, toRefs } from "vue";

type TableColumn = {
  key: string;
  text?: string;
  sortable?: boolean;
};
type SortDirection = "ascending" | "descending";

type Props = {
  columns: TableColumn[];
  items: Record<string, any & { sortMethod?: Function }>[];
  sortBy?: string;
  sortDirection?: SortDirection;
};

const props = withDefaults(defineProps<Props>(), {
  sortDirection: "descending",
});
const { columns, items, sortBy, sortDirection } = toRefs(props);

const emit = defineEmits(["update:sortBy", "update:sortDirection"]);

let sortedItems = ref([...items.value]);

function resetSortedItems() {
  sortedItems.value = [...items.value];
}

function sortItems(columnKey: string, direction: SortDirection) {
  sortedItems.value.sort((a, b) => {
    const firstItem = a[columnKey];
    const secondItem = b[columnKey];
    if (firstItem < secondItem) return direction == "descending" ? 1 : -1;
    if (firstItem > secondItem) return direction == "descending" ? -1 : 1;
    return 0;
  });
}

function sort(column: TableColumn) {
  if (column.sortable === false) {
    return;
  }

  // Stop sorting this column if we have cycled through both sorting directions
  if (sortBy?.value == column.key && sortDirection.value === "descending") {
    resetSortedItems();
    emit("update:sortDirection", "descending");
    emit("update:sortBy", undefined);
    return;
  }

  // If the column was already sorted, flip the sort direction
  if (sortBy?.value == column.key) {
    emit("update:sortDirection", "descending");
    sortItems(column.key, "descending");
    return;
  }

  // Reset the sort direction when another column is clicked
  emit("update:sortDirection", "ascending");
  emit("update:sortBy", column.key);
  sortItems(column.key, "ascending");
}

onMounted(() => {
  if (sortBy?.value) {
    sortItems(sortBy.value, sortDirection.value);
  }
});
</script>

<template>
  <table class="bcc-table">
    <thead>
      <tr class="bcc-table-header-row">
        <th
          class="bcc-table-header"
          :class="{ 'bcc-table-header-sortable': column.sortable !== false }"
          v-for="column in columns"
          :key="column.key"
          @click="sort(column)"
        >
          <div class="bcc-table-header-content">
            {{ column.text }}

            <div v-if="column.sortable !== false">
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
            </div>
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, key) in sortedItems" :key="key">
        <td class="bcc-table-cell" v-for="column in columns" :key="column.key">
          <slot v-if="$slots[`item.${column.key}`]" :name="`item.${column.key}`" :item="item" />
          <span v-else>
            {{ item[column.key] }}
          </span>
        </td>
        <td></td>
      </tr>
    </tbody>
  </table>
</template>
