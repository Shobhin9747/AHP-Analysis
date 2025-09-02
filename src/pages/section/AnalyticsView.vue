<template>
  <PageLayout>
    <template #content>
      <div class="space-y-6">
        <!-- Holiday Pay Chart Section -->
        <div class="bg-white shadow rounded-lg p-6">
          <div class="flex items-center justify-between mb-6">
            <div>
              <div class="flex items-center space-x-3">
                <h2 class="text-xl font-bold text-[#022652]">Holiday Pay</h2>
                <div class="h-6 border-l-2 border-[#022652] mx-2"></div>
                <p class="text-sm text-[#022652]">52 Week</p>
              </div>
              <p class="text-xs text-[#022652] mt-1">Weekly Fixed</p>
            </div>
            <div class="flex items-center space-x-8">
              <div class="flex items-center space-x-4 text-sm">
                <div class="flex items-center space-x-2">
                  <div class="w-4 h-0.5 bg-blue-300"></div>
                  <span class="text-gray-600">Contract Rate</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-4 h-0.5 bg-blue-600"></div>
                  <span class="text-gray-600">Holiday Pay</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-4 h-0.5 bg-[#5EBA4F]"></div>
                  <span class="text-gray-600">Trend</span>
                </div>
              </div>
              <div class="text-right">
                <div class="text-2xl font-bold text-[#5EBA4F]">£627.51</div>
                <div class="text-sm text-gray-600">Average Holiday Pay</div>
              </div>
            </div>
          </div>



          <div class="h-80">
            <Bar :data="holidayPayChartData" :options="holidayPayChartOptions" />
          </div>
        </div>

        <!-- Worked Hours Chart Section -->
        <div class="bg-white shadow rounded-lg p-6">
          <div class="flex items-center justify-between mb-6">
            <div>
            <div  class="flex items-center space-x-3">
              <h2 class="text-xl font-bold text-[#022652]">Worked Hours</h2>
              <div class="h-6 border-l-2 border-[#022652] mx-2"></div>
              <p class="text-sm text-[#022652]">52 Week</p>
              </div>
              <p class="text-xs text-[#022652]">Mon-Fri, 9:00 - 17:00</p>
            </div>
            <div class="flex items-center space-x-8">
              <div class="flex items-center space-x-6 text-sm">
                <div class="flex items-center space-x-2">
                  <div class="w-4 h-0.5 bg-blue-600"></div>
                  <span class="text-gray-600">Regular</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-4 h-0.5 bg-blue-400"></div>
                  <span class="text-gray-600">Worked</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-4 h-0.5 bg-[#F6A709]"></div>
                  <span class="text-gray-600">Overtime</span>
                </div>
              </div>
              <div class="text-right">
                <div class="text-2xl font-bold text-[#068EC6]">468.5H</div>
                <div class="text-sm text-gray-600">Total Hours Worked</div>
              </div>
            </div>
          </div>



          <div class="h-80">
            <Bar :data="workedHoursChartData" :options="workedHoursChartOptions" />
          </div>
        </div>
      </div>
    </template>
  </PageLayout>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
   LineElement,     // <-- Add this
  PointElement, 
} from 'chart.js';
import PageLayout from "../../components/PageLayout.vue";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
   LineElement,     // <-- Add this
  PointElement, 
);

// Generate mock data for 52 weeks
const generateHolidayPayData = () => {
  const data = [];
  const contractRate = 600;
  const trend = 620;

  for (let i = 1; i <= 52; i++) {
    // Generate realistic holiday pay data with some variation
    const baseAmount = contractRate + (Math.random() - 0.5) * 200;
    const weeklyVariation = Math.sin(i * 0.1) * 50 + (Math.random() - 0.5) * 30;
    data.push(Math.max(400, Math.min(800, baseAmount + weeklyVariation)));
  }

  return data;
};

const generateWorkedHoursData = () => {
  const regularHours = [];
  const overtimeHours = [];
  const workedHours = [];

  for (let i = 1; i <= 52; i++) {
    // Regular hours: mostly 8 hours with some variation
    const regular = 8 + (Math.random() - 0.5) * 2;
    const regularClamped = Math.max(6, Math.min(10, regular));
    regularHours.push(regularClamped);

    // Overtime: occasional overtime hours
    const overtime = Math.random() > 0.7 ? Math.random() * 4 : 0;
    overtimeHours.push(overtime);

    // Total worked hours for the week
    workedHours.push(regularClamped + overtime);
  }

  return { regularHours, overtimeHours, workedHours };
};


// Chart data and options
const holidayPayChartData = computed(() => {
  const data = generateHolidayPayData();
  const average = 627.51;
  const trendLine = new Array(52).fill(average);
  const contractRateLine = new Array(52).fill(600);

  
  return {
    labels: Array.from({ length: 52 }, (_, i) => `Week ${i + 1}`),
    datasets: [
       {
        label: 'Contract Rate',  
        data: contractRateLine,
        type: 'bar',
        backgroundColor: '#93c5fd',
        borderColor: '#93c5fd',
        borderWidth: 0.5,
        borderRadius: 2,
      },
      {
        label: 'Holiday Pay',
        data: data,
        backgroundColor: '#2563eb',
        borderColor: '#2563eb',
        borderWidth: 2,
        borderRadius: 2,
      },
      {
        label: 'Trend',
        data: trendLine,
        type: 'line',
        borderColor: '#5EBA4F',
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
        tension: 0.09
      }
    ]
  };
});



const workedHoursChartData = computed(() => {
  const { regularHours, workedHours, overtimeHours } = generateWorkedHoursData();
  return {
    labels: Array.from({ length: 52 }, (_, i) => `Week ${i + 1}`),
    datasets: [
      {
        label: 'Regular Hours',
        data: regularHours,
        backgroundColor: '#2563eb',
        borderColor: '#2563eb',
        borderWidth: 1,
        borderRadius: 2,
      },
      {
        label: 'Worked Hours',
        data: workedHours,
        backgroundColor: '#3b82f6',
        borderColor: '#3b82f6',
        borderWidth: 1,
        borderRadius: 2,
      },
      {
        label: 'Overtime Hours',
        data: overtimeHours,
        backgroundColor: '#F6A709',
        borderColor: '#F6A709',
        borderWidth: 1,
        borderRadius: 2,
      }
    ]
  };
});

const holidayPayChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      max: 800,
      ticks: {
        stepSize: 200,
        callback: function (value) {
          return value;
        }
      },
      grid: {
        color: '#e5e7eb'
      }
    },
    x: {
      display: false
    }
  },
  plugins: {
    legend: {
      display: false  // Enable legend to show "Trend"
    },
  tooltip: {
  callbacks: {
    label: function (context) {
      const label = context.dataset.label;
      const value = context.parsed.y.toFixed(2);
      return `${label}: £${value}`;
    }
  }
}
  },
  interaction: {
    intersect: false,
    mode: 'index'
  }
};


const workedHoursChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      max: 24,
      ticks: {
        stepSize: 6,
        callback: function (value) {
          return value;
        }
      },
      grid: {
        color: '#e5e7eb'
      }
    },
    x: {
      display: false
    }
  },
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return context.dataset.label + ': ' + context.parsed.y.toFixed(1) + 'h';
        }
      }
    }
  },
  interaction: {
    intersect: false,
    mode: 'index'
  }
};
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
