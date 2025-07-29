<template>
  <div class="bg-white shadow rounded-xl p-4 space-y-2">
    <div class="text-sm text-gray-500">{{ title }}</div>
    <div class="text-xl font-bold">{{ value }}</div>
    <div class="text-xs text-gray-400">{{ subtitle }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  value: string
  subtitle?: string
  color?: string
  growth?: string
}>()
</script>
