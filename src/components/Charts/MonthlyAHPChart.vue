<template>
  <div class="w-full h-64">
    <Bar
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Bar } from 'vue-chartjs'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const chartData = computed(() => ({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
  datasets: [
    {
      label: '2024',
      data: [670, 460, 580, 580, 630, 440, 550, 650],
      backgroundColor: '#93C5FD',
      borderColor: '#93C5FD',
      borderWidth: 0,
     
      barThickness: 25, 
      categoryPercentage: 0.2,
      barPercentage: 0.2,
    },
    {
      label: '2025',
      data: [730, 520, 620, 560, 640, 530, 620, 580],
      backgroundColor: '#2563EB',
      borderColor: '#2563EB',
      borderWidth: 0,
     
      barThickness: 15, 
      categoryPercentage: 0.8,
      barPercentage: 0.8,
    },
    {
      label: 'Trend',
      data: [750, 550, 620, 580, 650, 550, 620, 590],
      type: 'line',
      borderColor: '#10B981',
      backgroundColor: 'transparent',
      borderWidth: 2,
      pointBackgroundColor: '#10B981',
      pointBorderColor: '#10B981',
      pointRadius: 4,
      pointHoverRadius: 6,
      fill: false,
      tension: 0.1,
    }
  ]
}))


const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  aspectRatio: 2,
  plugins: {
    legend: {
      position: 'top' as const,
      align: 'end' as const,
      labels: {
        usePointStyle: true,
        pointStyle: 'rect',
        padding: 20,
        font: {
          size: 12
        }
      },
      display:false
    },
    tooltip: {
      mode: 'index' as const,
      intersect: false,
      callbacks: {
        label: function(context: any) {
          if (context.datasetIndex === 2) { // Trend line
            return `Trend: £${context.parsed.y.toLocaleString()}`
          }
          return `${context.dataset.label}: £${context.parsed.y.toLocaleString()}`
        }
      }
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        font: {
          size: 11
        },
        color: '#6B7280'
      },
      stacked: false,
    // ADD THESE:
    barPercentage: 1.0,      // full width inside group
    categoryPercentage:1.0, // reduce group spacing
    },
    y: {
      beginAtZero: true,
      max: 800,
      ticks: {
        stepSize: 200,
        font: {
          size: 11
        },
        color: '#6B7280',
        callback: function(value: any) {
          return value.toString()
        }
      },
      grid: {
        color: '#E5E7EB',
        drawBorder: false
      }
    }
  },

 
}))
</script>
