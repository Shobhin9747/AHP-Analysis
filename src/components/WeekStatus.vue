<template>
  <div class="space-y-3">
    <div 
      v-for="weekData in weeks" 
      :key="weekData.week" 
      class="bg-white rounded-lg p-4"
    >
      <!-- Header Section -->
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mb-4">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-2">
            <h3 class="font-bold text-gray-900 text-xs">Week {{ weekData.week }}</h3>
            <span
              class="bg-[#5EBA4F] text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1"
            >
              ELIGIBLE
              <svg
                width="10"
                height="10"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 0C9.31361 1.20811e-07 12 2.68641 12 6C12 9.31407 9.31359 12 6 12C2.68641 12 1.2079e-07 9.31407 0 6C0 2.68641 2.68641 0 6 0ZM6 0.480469C2.9562 0.480469 0.480469 2.95641 0.480469 6C0.480469 9.04358 2.95617 11.5195 6 11.5195C9.04383 11.5195 11.5195 9.04358 11.5195 6C11.5195 2.95641 9.04383 0.480469 6 0.480469ZM6.51855 8.85938H6.99902V9.33984H5.0791V8.85938H5.55859V4.7793H5.0791V4.2998H6.51855V8.85938ZM6.03027 2.37988C6.42764 2.38003 6.75 2.70173 6.75 3.09961C6.74988 3.49691 6.42756 3.81919 6.03027 3.81934C5.63283 3.81934 5.30969 3.497 5.30957 3.09961C5.30957 2.70166 5.63276 2.37988 6.03027 2.37988Z"
                  fill="#EBFBE8"
                />
              </svg>
            </span>
          </div>
          <p class="text-xs text-gray-600">{{ weekData.dates }}</p>
        </div>
        <div class="text-left sm:text-right mt-1 sm:mt-0">
          <div class="text-lg sm:text-xl font-bold text-[#5EBA4F]">£{{ weekData.amount }}</div>
          <div class="text-xs text-gray-600">AHP for this week</div>
        </div>
      </div>

      <!-- Unified grid for sm+ to ensure perfect header/data alignment -->
      <div class="hidden sm:grid [grid-template-columns:1.1fr_0.8fr_0.8fr_0.8fr] gap-x-2 gap-y-2">
        <!-- Headers -->
        <div class="bg-[#E5EBEF] text-gray-700 text-xs font-medium p-1 rounded-lg">
          <div class="grid grid-cols-[1fr_auto] items-center gap-1">
            <span class="whitespace-nowrap">Days</span>
            <div class="w-5 h-3 opacity-0"></div>
          </div>
        </div>
        <div class="bg-[#E5EBEF] text-gray-700 text-xs font-medium p-1 rounded-lg text-center whitespace-nowrap">Regular</div>
        <div class="bg-[#E5EBEF] text-gray-700 text-xs font-medium p-1 rounded-lg text-center whitespace-nowrap">Overtime</div>
        <div class="bg-[#023769] text-white text-xs font-medium p-1 rounded-lg text-center whitespace-nowrap">Total Hrs</div>

        <!-- Rows -->
        <template v-for="(day, index) in weekData.days" :key="index">
          <div class="grid grid-cols-[1fr_auto] items-center gap-1 min-w-0">
            <span class="font-medium text-gray-900 text-xs whitespace-nowrap">{{ day.name }}</span>
            <div
              :class="[
                'w-5 h-3 flex items-center justify-center text-[8px] font-bold text-white flex-shrink-0',
                day.eligible ? 'bg-[#5EBA4F]' : 'bg-[#FB2C36]',
              ]"
            >
              {{ day.eligible ? 'E' : 'NE' }}
            </div>
          </div>
          <div class="text-center text-gray-700 font-medium text-xs whitespace-nowrap">{{ day.regular }} h</div>
          <div class="text-center text-gray-700 font-medium text-xs whitespace-nowrap">{{ day.overtime }} h</div>
          <div class="text-center font-bold text-xs whitespace-nowrap" :class="day.eligible ? 'text-blue-600' : 'text-gray-400'">{{ day.total }} h</div>
        </template>
      </div>

      <!-- Mobile-only stacked layout -->
      <div class="sm:hidden space-y-2">
        <div
          v-for="(day, index) in weekData.days"
          :key="index"
          class="rounded-lg p-2"
        >
          <div class="grid grid-cols-[1fr_auto] items-center gap-1">
            <span class="font-medium text-gray-900 text-xs">{{ day.name }}</span>
            <div
              :class="[
                'w-5 h-3 flex items-center justify-center text-[8px] font-bold text-white flex-shrink-0',
                day.eligible ? 'bg-[#5EBA4F]' : 'bg-[#FB2C36]',
              ]"
            >
              {{ day.eligible ? 'E' : 'NE' }}
            </div>
          </div>
          <div class="grid grid-cols-3 gap-2 mt-2 text-xs">
            <div>
              <div class="text-[10px] text-gray-500">Regular</div>
              <div class="font-medium">{{ day.regular }} h</div>
            </div>
            <div>
              <div class="text-[10px] text-gray-500">Overtime</div>
              <div class="font-medium">{{ day.overtime }} h</div>
            </div>
            <div>
              <div class="text-[10px] text-gray-500">Total</div>
              <div :class="['font-bold text-right', day.eligible ? 'text-blue-600' : 'text-gray-400']">{{ day.total }} h</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  weeks: {
    type: Array,
    required: true,
    default: () => []
  }
});
</script>

