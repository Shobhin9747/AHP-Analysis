<template>
  <PageLayout>
    <template #content>
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-xl font-bold text-[#068EC6] mb-4">Analytics</h2>
        <p class="text-gray-500">Analytics content will go here...</p>
      </div>
    </template>
  </PageLayout>
</template>

<script setup>
import PageLayout from "../../components/PageLayout.vue";
</script>

<style scoped>
.weekstatus-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.weekstatus-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
