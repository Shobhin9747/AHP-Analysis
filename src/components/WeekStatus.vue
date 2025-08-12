<template>
  <div class="space-y-4">
    <div 
      v-for="weekData in weeks" 
      :key="weekData.week" 
      class="bg-white rounded-lg p-6"
    >
      <!-- Header Section -->
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-6">
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <h3 class="font-bold text-gray-900 text-lg">Week {{ weekData.week }}</h3>
            <span
              class="bg-[#5EBA4F] text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1"
            >
              ELIGIBLE
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 0C9.31361 1.20811e-07 12 2.68641 12 6C12 9.31407 9.31359 12 6 12C2.68641 12 1.2079e-07 9.31407 0 6C0 2.68641 2.68641 0 6 0ZM6 0.480469C2.9562 0.480469 0.480469 2.95641 0.480469 6C0.480469 9.04358 2.95617 11.5195 6 11.5195C9.04383 11.5195 11.5195 9.04358 11.5195 6C11.5195 2.95641 9.04383 0.480469 6 0.480469ZM6.51855 8.85938H6.99902V9.33984H5.0791V8.85938H5.55859V4.7793H5.0791V4.2998H6.51855V8.85938ZM6.03027 2.37988C6.42764 2.38003 6.75 2.70173 6.75 3.09961C6.74988 3.49691 6.42756 3.81919 6.03027 3.81934C5.63283 3.81934 5.30969 3.497 5.30957 3.09961C5.30957 2.70166 5.63276 2.37988 6.03027 2.37988Z"
                  fill="#EBFBE8"
                />
              </svg>
            </span>
          </div>
          <p class="text-sm text-gray-600">{{ weekData.dates }}</p>
        </div>
        <div class="text-left sm:text-right mt-2 sm:mt-0">
          <div class="text-xl sm:text-2xl font-bold text-[#5EBA4F]">£{{ weekData.amount }}</div>
          <div class="text-xs sm:text-sm text-gray-600">AHP for this week</div>
        </div>
      </div>

      <!-- Unified grid for sm+ to ensure perfect header/data alignment -->
      <div class="hidden sm:grid [grid-template-columns:1.2fr_1fr_1fr_1fr] gap-x-4 gap-y-3">
        <!-- Headers -->
        <div class="bg-[#E5EBEF] text-gray-700 text-sm font-medium px-3 py-2 rounded-lg">
          <div class="grid grid-cols-[1fr_auto] items-center gap-2">
            <span>Days</span>
            <div class="w-6 h-4 opacity-0"></div>
          </div>
        </div>
        <div class="bg-[#E5EBEF] text-gray-700 text-sm font-medium px-3 py-2 rounded-lg text-center">Regular</div>
        <div class="bg-[#E5EBEF] text-gray-700 text-sm font-medium px-3 py-2 rounded-lg text-center">Overtime</div>
        <div class="bg-[#023769] text-white text-sm font-medium px-3 py-2 rounded-lg text-center">Total Hrs</div>

        <!-- Rows -->
        <template v-for="(day, index) in weekData.days" :key="index">
          <div class="grid grid-cols-[1fr_auto] items-center gap-2 min-w-0">
            <span class="font-medium text-gray-900 text-sm">{{ day.name }}</span>
            <div
              :class="[
                'w-6 h-4 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0',
                day.eligible ? 'bg-[#5EBA4F]' : 'bg-[#FB2C36]',
              ]"
            >
              {{ day.eligible ? 'E' : 'NE' }}
            </div>
          </div>
          <div class="text-center text-gray-700 font-medium whitespace-nowrap">{{ day.regular }} h</div>
          <div class="text-center text-gray-700 font-medium whitespace-nowrap">{{ day.overtime }} h</div>
          <div class="text-center font-bold whitespace-nowrap" :class="day.eligible ? 'text-blue-600' : 'text-gray-400'">{{ day.total }} h</div>
        </template>
      </div>

      <!-- Mobile-only stacked layout -->
      <div class="sm:hidden space-y-3">
        <div
          v-for="(day, index) in weekData.days"
          :key="index"
          class="rounded-lg p-3"
        >
          <div class="grid grid-cols-[1fr_auto] items-center gap-2">
            <span class="font-medium text-gray-900 text-sm">{{ day.name }}</span>
            <div
              :class="[
                'w-6 h-4 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0',
                day.eligible ? 'bg-[#5EBA4F]' : 'bg-[#FB2C36]',
              ]"
            >
              {{ day.eligible ? 'E' : 'NE' }}
            </div>
          </div>
          <div class="grid grid-cols-3 gap-3 mt-3 text-sm">
            <div>
              <div class="text-[11px] text-gray-500">Regular</div>
              <div class="font-medium">{{ day.regular }} h</div>
            </div>
            <div>
              <div class="text-[11px] text-gray-500">Overtime</div>
              <div class="font-medium">{{ day.overtime }} h</div>
            </div>
            <div>
              <div class="text-[11px] text-gray-500">Total</div>
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

