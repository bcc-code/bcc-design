<script setup lang="ts">
import { SwapVertIcon, ArrowUpwardIcon, ArrowDownwardIcon } from "@bcc-code/icons-vue";

type TableColumn = {
  key: string;
  text?: string;
  sortable?: boolean;
};

type Props = {
  columns: TableColumn[];
  items: Record<string, any>[];
};

withDefaults(defineProps<Props>(), {});
</script>

<template>
  <table class="bcc-table">
    <thead>
      <tr class="bcc-table-header-row">
        <th class="bcc-table-header" v-for="column in columns" :key="column.key">
          <div class="bcc-table-header-content">
            {{ column.text }}
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, key) in items" :key="key">
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
