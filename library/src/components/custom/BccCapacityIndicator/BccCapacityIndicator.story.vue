<script setup lang="ts">
import BccCapacityIndicator from "./BccCapacityIndicator.vue";
</script>

<template>
  <Story
    title="Other/BccCapacityIndicator"
    :layout="{ type: 'single', iframe: true }"
  >
    <Variant title="Example">
      <BccCapacityIndicator
        :total="20"
        :used="14"
        size="base"
        :animation-duration="1000"
      />
    </Variant>
    <Variant title="State">
      <div class="flex items-center space-x-4">
        <BccCapacityIndicator :total="42" />
        <BccCapacityIndicator :total="200" :used="1" />
        <BccCapacityIndicator :total="20" :used="6" />
        <BccCapacityIndicator :total="20" :used="18" />
        <BccCapacityIndicator :total="20" :used="19" />
        <BccCapacityIndicator :total="20" :used="20" />
        <BccCapacityIndicator :total="-1" />
      </div>
    </Variant>
    <Variant title="Size">
      <div class="flex items-center space-x-4">
        <BccCapacityIndicator size="sm" :total="30" :used="7" />
        <BccCapacityIndicator size="base" :total="30" :used="21" />
        <BccCapacityIndicator size="lg" :total="30" :used="30" />
      </div>
    </Variant>
    <Variant title="Squared">
      <div class="flex items-center space-x-4">
        <BccCapacityIndicator squared :total="12" :used="0" />
        <BccCapacityIndicator size="sm" squared :total="12" :used="1" />
        <BccCapacityIndicator size="sm" squared :total="12" :used="3" />
        <BccCapacityIndicator size="base" squared :total="12" :used="6" />
        <BccCapacityIndicator size="base" squared :total="12" :used="9" />
        <BccCapacityIndicator size="lg" squared :total="12" :used="11" />
        <BccCapacityIndicator size="lg" squared :total="12" :used="12" />
        <BccCapacityIndicator size="lg" squared :total="-1" :used="0" />
      </div>
    </Variant>
    <Variant title="Context">
      <div class="flex items-center space-x-4">
        <BccCapacityIndicator context="default" :total="12" :used="0" />
        <BccCapacityIndicator context="colored" :total="12" :used="1" />
        <BccCapacityIndicator context="colored" :total="12" :used="6" />
        <BccCapacityIndicator context="colored" :total="12" :used="12" />
        <BccCapacityIndicator context="colored" :total="-1" :used="12" />
      </div>
    </Variant>
    <Variant title="Alternative context">
      <div
        class="flex items-start gap-x-2 bg-primary p-4 rounded"
        data-context="alternative"
      >
        <BccCapacityIndicator :total="42" />
        <BccCapacityIndicator :total="200" :used="1" />
        <BccCapacityIndicator :total="20" :used="6" />
        <BccCapacityIndicator :total="20" :used="18" />
        <BccCapacityIndicator :total="20" :used="20" />
        <BccCapacityIndicator :total="0" :used="0" />
        <BccCapacityIndicator :total="-1" />
      </div>
    </Variant>
  </Story>
</template>
