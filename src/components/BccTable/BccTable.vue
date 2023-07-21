<template>
  <table class="bcc-table">
    <thead>
      <tr class="bcc-table-header-row">
        <slot name="headers" />
      </tr>
    </thead>
    <tbody>
      <slot />
    </tbody>
  </table>
</template>
