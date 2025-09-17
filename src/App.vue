<!-- App.vue -->
<template>
  <router-view />
</template>

<script setup lang="ts">
// No layout logic needed here
</script>

<style>
:root {
  --page-bg: #F5F9FC;
}

html, body {
  font-family: "Inter", sans-serif;
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: var(--page-bg);
}
</style>


