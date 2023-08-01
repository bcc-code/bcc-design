<script setup lang="ts">
import ColorGridItem from "./ColorGridItem.vue";

type Props = {
  tokens: Record<string, Object | string>;
  type: string;
};

defineProps<Props>();
</script>

<template>
  <div v-for="(contents, categoryKey) in tokens" :key="categoryKey">
    <div v-if="categoryKey !== 'button'">
      <ColorGridItem :type="type" :categoryKey="categoryKey" :contents="contents" />
    </div>
    <div v-else>
      <div class="mb-3 font-bold text-gray-500">Button</div>
      <div v-for="(contents, categoryKey) in tokens['button']" :key="categoryKey">
        <div v-if="categoryKey !== 'danger'">
          <ColorGridItem
            :type="type"
            :heading="categoryKey"
            :categoryKey="'button-' + categoryKey"
            :contents="contents"
          />
        </div>
        <div v-else>
          <div class="mb-3 text-sm font-bold text-gray-500">Danger</div>
          <div v-for="(contents, categoryKey) in tokens['button']['danger']" :key="categoryKey">
            <div>
              <ColorGridItem
                :type="type"
                :heading="categoryKey"
                :categoryKey="'button-danger-' + categoryKey"
                :contents="contents"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
