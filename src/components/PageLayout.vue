<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
    <!-- Left Section -->
    <div class="lg:col-span-8 space-y-3 sm:space-y-4">
      <slot name="content" />
    </div>

    <!-- Right Section -->
    <div class="lg:col-span-4 space-y-2 sm:space-y-3">
      <div class="bg-white shadow rounded-lg">
       
        <div class="overflow-y-auto weekstatus-scrollbar h-[calc(100vh-120px)] sm:h-[calc(100vh-100px)] lg:h-[calc(100vh-80px)]">
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
