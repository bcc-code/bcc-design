<script setup lang="ts">
import { ref } from "vue";
import BccButton from "./BccButton.vue";

const label = ref("Example label");
const variant = ref("primary");
</script>

<docs lang="md">
## Useful links

[Button guidelines](https://bccit.notion.site/2-1-Buttons-Component-030f871e026344a9a6770561b609d36c)
</docs>

<template>
  <Story>
    <Variant title="Example">
      <BccButton :variant="variant">{{ label }}</BccButton>

      <template #controls>
        <HstText v-model="label" title="Label" />
        <HstRadio
          v-model="variant"
          title="Variant"
          :options="[
            {
              label: 'Primary',
              value: 'primary',
            },
            {
              label: 'Secondary',
              value: 'secondary',
            },
            {
              label: 'Tertiary',
              value: 'tertiary',
            },
          ]"
        />
      </template>
    </Variant>

    <Variant title="Primary">
      <div class="flex items-start space-x-2">
        <BccButton size="xs">Primary (xs)</BccButton>
        <BccButton size="sm">Primary (sm)</BccButton>
        <BccButton size="base">Primary (base)</BccButton>
        <BccButton size="lg">Primary (lg)</BccButton>
        <BccButton size="xl">Primary (xl)</BccButton>
      </div>
    </Variant>

    <Variant title="Secondary">
      <div class="flex items-start space-x-2">
        <BccButton variant="secondary" size="xs">Secondary (xs)</BccButton>
        <BccButton variant="secondary" size="sm">Secondary (sm)</BccButton>
        <BccButton variant="secondary" size="base">Secondary (base)</BccButton>
        <BccButton variant="secondary" size="lg">Secondary (lg)</BccButton>
        <BccButton variant="secondary" size="xl">Secondary (xl)</BccButton>
      </div>
    </Variant>
  </Story>
</template>
