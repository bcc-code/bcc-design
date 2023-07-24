<script setup lang="ts">
type Header = {
  text: string;
  value: string;
  sortable?: boolean;
};

type Props = {
  headers: Header[];
  items: Record<string, any>[];
};

withDefaults(defineProps<Props>(), {});
</script>

<template>
  <table class="bcc-table">
    <thead>
      <tr class="bcc-table-header-row">
        <th class="bcc-table-header" v-for="header in headers" :key="header.value">
          {{ header.text }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, key) in items" :key="key">
        <td class="bcc-table-cell" v-for="header in headers" :key="header.value">
          <slot v-if="$slots[`item.${header.value}`]" :name="`item.${header.value}`" :item="item" />
          <span v-else>
            {{ item[header.value] }}
          </span>
        </td>
        <td></td>
      </tr>
    </tbody>
  </table>
</template>
