
<template>
  <div class="w-full h-full flex flex-col items-center">
    <h2 class="text-base sm:text-lg font-bold mb-2">Salary Type</h2>

    <div class="relative flex items-center justify-center">
      <Doughnut
        :data="chartData"
        :options="chartOptions"
        class="max-w-[200px] max-h-[200px] sm:max-w-[270px] sm:max-h-[270px]"
      />
      <div class="absolute text-center">
        <p class="text-gray-500 text-xs sm:text-sm">Contract Employees</p>
        <p class="font-bold text-lg sm:text-xl">{{ totalEmployees }}</p>
      </div>
    </div>

    <!-- Custom Legend -->
    <div class="mt-4 sm:mt-6 w-full px-2 sm:px-4 space-y-1.5 sm:space-y-2">
      <div
        v-for="(item, index) in legendItems"
        :key="index"
        class="flex items-center justify-between text-xs sm:text-sm"
      >
        <div class="flex items-center space-x-1.5 sm:space-x-2">
          <span
            class="w-2 h-2 sm:w-3 sm:h-3 rounded-full flex-shrink-0"
            :style="{ backgroundColor: item.color }"
          ></span>
          <span class="text-gray-700 text-xs sm:text-sm leading-tight">{{ item.label }}</span>
        </div>
        <div class="flex items-center justify-end gap-2 sm:gap-4 font-medium">
          <span class="text-right w-8 sm:w-12 text-xs">{{ item.value }}</span>
          <span class="text-right w-8 sm:w-12 text-gray-500 text-xs">{{ item.percentage }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { computed } from 'vue'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'
import { Doughnut } from 'vue-chartjs'

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
)

const chartData = computed(() => ({
  labels: ['Full-Time', 'Part-Time', 'Weekly Fixed', 'Irregular', 'Hourly', 'Daily Wages'],
  datasets: [
    {
      data: [1250, 1750, 500, 250, 300, 200],
      backgroundColor: [
        '#14B8A6', 
        '#3B82F6',
        '#8B5CF6', 
        '#EC4899', 
        '#F97316', 
        '#EAB308'
      ],
      borderColor: '#FFFFFF',
      borderWidth: 2,
      cutout: '60%'
    }
  ]
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 1,
  plugins: {
    legend:{
       display: false
    },
    tooltip: {
      callbacks: {
        label: function(context: any) {
          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
          const percentage = ((context.parsed / total) * 100).toFixed(1);
          return `${context.label}: ${context.parsed} (${percentage}%)`;
        }
      }
    }
  },
  elements: {
    arc: {
      borderWidth: 2
    }
  }
}))

const labels = ['Full-Time', 'Part-Time', 'Weekly Fixed', 'Irregular', 'Hourly', 'Daily Wages'];
const values = [1250, 1750, 500, 250, 300, 200];
const colors = ['#14B8A6', '#3B82F6', '#8B5CF6', '#EC4899', '#F97316', '#EAB308'];

const totalEmployees = computed(() => values.reduce((a, b) => a + b, 0));

const legendItems = computed(() =>
  labels.map((label, index) => {
    const value = values[index];
    const percentage = ((value / totalEmployees.value) * 100).toFixed(1);
    return {
      label,
      value,
      percentage,
      color: colors[index]
    };
  })
);

</script>

<style>
.custom-legend {
  max-width: 100%;
}
</style>
