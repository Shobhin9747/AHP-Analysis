<template>
  <div class="bg-white shadow rounded-lg p-4">
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-2">
      <div>
        <h4 class="font-semibold text-gray-700">Week {{ week }}</h4>
        <p class="text-sm text-gray-500 break-words">{{ dates }}</p>
      </div>
      <span class="font-bold text-green-600 text-lg">£{{ amount }}</span>
    </div>
    
    <!-- Mobile view - stacked layout -->
    <div class="block sm:hidden space-y-2">
      <div v-for="(day, index) in days" :key="index" class="border-b border-gray-100 pb-2">
        <div class="flex justify-between items-center mb-1">
          <span class="font-medium text-sm">{{ day.name }}</span>
          <span :class="day.eligible ? 'text-green-600' : 'text-gray-400'" class="text-sm font-medium">
            {{ day.total }} h
          </span>
        </div>
        <div class="flex justify-between text-xs text-gray-500">
          <span>Regular: {{ day.regular }}h</span>
          <span>Overtime: {{ day.overtime }}h</span>
        </div>
      </div>
    </div>

    <!-- Desktop view - grid layout -->
    <div class="hidden sm:block">
      <div class="text-xs grid grid-cols-4 gap-2 font-semibold text-gray-600">
        <div>Day</div>
        <div>Regular</div>
        <div>Overtime</div>
        <div>Eligible</div>
      </div>
      <div v-for="(day, index) in days" :key="index" class="grid grid-cols-4 gap-2 text-sm py-1">
        <div class="font-medium">{{ day.name }}</div>
        <div>{{ day.regular }} h</div>
        <div>{{ day.overtime }} h</div>
        <div :class="day.eligible ? 'text-green-600' : 'text-gray-400'">{{ day.total }} h</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  week: Number,
  amount: Number,
  dates: String
})

const days = [
  { name: 'MON', regular: 8, overtime: 2.5, total: 10.5, eligible: true },
  { name: 'TUE', regular: 8, overtime: 2.5, total: 10.5, eligible: true },
  { name: 'WED', regular: 8, overtime: 2.5, total: 10.5, eligible: true },
  { name: 'THU', regular: 8, overtime: 2.5, total: 10.5, eligible: true },
  { name: 'FRI', regular: 8, overtime: 2.5, total: 10.5, eligible: true },
  { name: 'SAT', regular: 8, overtime: 2.5, total: 10.5, eligible: true },
  { name: 'SUN', regular: 0, overtime: 0, total: 0, eligible: false },
]
</script>
