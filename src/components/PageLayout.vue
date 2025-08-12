<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
    <!-- Left Section -->
    <div class="lg:col-span-8 space-y-4 sm:space-y-6">
      <slot name="content" />
    </div>

    <!-- Right Section -->
    <div class="lg:col-span-4 space-y-3 sm:space-y-4">
      <div class="bg-white shadow rounded-lg p-4">
       
        <div class="overflow-y-auto weekstatus-scrollbar" style="max-height: calc(100vh - 50px);">
          <WeekStatus :weeks="weekData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import WeekStatus from "./WeekStatus.vue";
import { weekData } from "../helpers/weekData.js";
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
