<template>
  <div class="w-full h-full flex flex-col">
    <div class="flex-1 flex items-center justify-center">
      <Doughnut
        :data="chartData"
        :options="chartOptions"
        class="max-w-sm max-h-sm"
      />
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
        '#14B8A6', // Teal/Greenish-blue
        '#3B82F6', // Blue
        '#8B5CF6', // Purple
        '#EC4899', // Pink
        '#F97316', // Orange
        '#EAB308'  // Yellow
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
    legend: {
      position: 'bottom' as const,
      align: 'center' as const,
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        padding: 8,
        font: {
          size: 10
        },
        boxWidth: 8,
        boxHeight: 8,
        generateLabels: function(chart: any) {
          const data = chart.data;
          if (data.labels.length && data.datasets.length) {
            const dataset = data.datasets[0];
            const total = dataset.data.reduce((a: number, b: number) => a + b, 0);
            
            return data.labels.map((label: string, index: number) => {
              const value = dataset.data[index];
              const percentage = ((value / total) * 100).toFixed(1);
              
              return {
                text: `${label}: ${value} (${percentage}%)`,
                fillStyle: dataset.backgroundColor[index],
                strokeStyle: dataset.borderColor,
                lineWidth: dataset.borderWidth,
                pointStyle: 'circle',
                hidden: false,
                index: index
              };
            });
          }
          return [];
        }
      }
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
</script>
