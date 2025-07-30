<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
   

    <!-- Salary Overview Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="flex items-center justify-between mb-3">
          <div class="p-2 bg-white/20 rounded-lg">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
          </div>
          <span class="text-green-200 text-xs font-medium">+89.24%</span>
        </div>
        <h3 class="text-sm font-semibold mb-1">Annual Salary</h3>
        <p class="text-2xl font-bold mb-1">£385,000</p>
        <p class="text-green-200 text-xs">Base Contract</p>
      </div>

      <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="flex items-center justify-between mb-3">
          <div class="p-2 bg-white/20 rounded-lg">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <span class="text-blue-200 text-xs font-medium">+8.09%</span>
        </div>
        <h3 class="text-sm font-semibold mb-1">Weekly Base Pay</h3>
        <p class="text-2xl font-bold mb-1">£31,250</p>
        <p class="text-blue-200 text-xs">52 weeks</p>
      </div>

      <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="flex items-center justify-between mb-3">
          <div class="p-2 bg-white/20 rounded-lg">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
          <span class="text-purple-200 text-xs font-medium">+9.01%</span>
        </div>
        <h3 class="text-sm font-semibold mb-1">Final AHP</h3>
        <p class="text-2xl font-bold mb-1">£31,438</p>
        <p class="text-purple-200 text-xs">Calculated</p>
      </div>

      <div class="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="flex items-center justify-between mb-3">
          <div class="p-2 bg-white/20 rounded-lg">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <span class="text-indigo-200 text-xs font-medium">+7.55%</span>
        </div>
        <h3 class="text-sm font-semibold mb-1">Eligible Weeks</h3>
        <p class="text-2xl font-bold mb-1">53/57</p>
        <p class="text-indigo-200 text-xs">93% Eligibility</p>
      </div>
    </div>

    <!-- Contract & Lookback Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Contract Details -->
      <div class="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div class="flex items-center mb-4">
          <div class="p-2 bg-blue-100 rounded-lg mr-3">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <h2 class="text-xl font-bold text-gray-800">Contract Details</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div class="space-y-3">
            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span class="text-gray-600 font-medium text-sm">Annual Salary</span>
              <span class="text-lg font-bold text-gray-800">£385,000.00</span>
            </div>
            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span class="text-gray-600 font-medium text-sm">Weekly Calculation</span>
              <span class="text-xs text-gray-500">£385,000 ÷ 52</span>
            </div>
            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span class="text-gray-600 font-medium text-sm">Overtime Rate</span>
              <span class="text-lg font-bold text-green-600">£3.50/hour</span>
            </div>
            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span class="text-gray-600 font-medium text-sm">Daily Hours</span>
              <span class="text-lg font-bold text-blue-600">11 hours</span>
            </div>
          </div>

          <div class="space-y-3">
            <div class="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
              <span class="text-gray-600 font-medium text-sm">Total Weeks</span>
              <span class="text-lg font-bold text-green-600">57 weeks</span>
            </div>
            <div class="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
              <span class="text-gray-600 font-medium text-sm">Eligible Weeks</span>
              <span class="text-lg font-bold text-blue-600">53 weeks</span>
            </div>
            <div class="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
              <span class="text-gray-600 font-medium text-sm">Ineligible Weeks</span>
              <span class="text-lg font-bold text-red-600">4 weeks</span>
            </div>
            <div class="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
              <span class="text-gray-600 font-medium text-sm">Status</span>
              <span class="text-xs font-bold text-green-600">✓ All Eligible</span>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <div class="flex items-center mb-3">
            <svg class="w-4 h-4 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 class="text-base font-semibold text-yellow-800">Components Analysis</h3>
          </div>
          <p class="text-yellow-700 text-sm mb-3">261 components found across 52 eligible weeks</p>
          
          <div class="overflow-x-auto">
            <table class="w-full text-xs">
              <thead>
                <tr class="border-b border-yellow-200">
                  <th class="text-left py-2 px-3 font-semibold text-yellow-800">Week</th>
                  <th class="text-left py-2 px-3 font-semibold text-yellow-800">Date</th>
                  <th class="text-left py-2 px-3 font-semibold text-yellow-800">Hours</th>
                  <th class="text-left py-2 px-3 font-semibold text-yellow-800">Amount</th>
                  <th class="text-left py-2 px-3 font-semibold text-yellow-800">Calculation</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-yellow-100 hover:bg-yellow-50 transition-colors">
                  <td class="py-2 px-3 font-medium">Week 5</td>
                  <td class="py-2 px-3 text-gray-600">2022-02-35</td>
                  <td class="py-2 px-3 font-bold text-green-600">2.00</td>
                  <td class="py-2 px-3 font-bold">£7.00</td>
                  <td class="py-2 px-3 text-gray-500">2.0 × £3.50</td>
                </tr>
                <tr class="border-b border-yellow-100 hover:bg-yellow-50 transition-colors">
                  <td class="py-2 px-3 font-medium">Week 15</td>
                  <td class="py-2 px-3 text-gray-600">2022-04-14</td>
                  <td class="py-2 px-3 font-bold text-green-600">3.00</td>
                  <td class="py-2 px-3 font-bold">£105.00</td>
                  <td class="py-2 px-3 text-gray-500">3.0 × £35.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Lookback Window -->
      <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div class="flex items-center mb-4">
          <div class="p-2 bg-purple-100 rounded-lg mr-3">
            <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h2 class="text-xl font-bold text-gray-800">Lookback Logic</h2>
        </div>

        <div class="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-4 mb-4">
          <h3 class="text-base font-semibold text-purple-800 mb-2">Calculation Rules</h3>
          <ul class="space-y-1 text-purple-700 text-sm">
            <li class="flex items-start">
              <span class="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
              Start from most recent week, move backward
            </li>
            <li class="flex items-start">
              <span class="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
              Stop when 52 eligible weeks found or after 104 weeks
            </li>
            <li class="flex items-start">
              <span class="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
              Use all available if fewer than 52 in 104 weeks
            </li>
          </ul>
        </div>

        <div class="space-y-3 mb-4">
          <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span class="text-gray-600 font-medium text-sm">Calendar Weeks</span>
            <span class="text-lg font-bold text-gray-800">56 weeks</span>
          </div>
          <div class="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
            <span class="text-gray-600 font-medium text-sm">Extended Lookback</span>
            <span class="text-lg font-bold text-orange-600">YES (SPAN=56)</span>
          </div>
          <div class="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
            <span class="text-gray-600 font-medium text-sm">Oldest Week</span>
            <span class="text-lg font-bold text-blue-600">Week 2</span>
          </div>
          <div class="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
            <span class="text-gray-600 font-medium text-sm">Newest Week</span>
            <span class="text-lg font-bold text-green-600">Week 57</span>
          </div>
        </div>

        <div class="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
          <h3 class="text-base font-semibold text-green-800 mb-3">Final Calculation</h3>
          <div class="space-y-2 text-xs">
            <div class="flex justify-between">
              <span class="text-gray-600">Base Weekly Salary</span>
              <span class="font-semibold">£31,250.00</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Variable Pay (12 weeks)</span>
              <span class="font-semibold">£30</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Average Variable Top-up</span>
              <span class="font-semibold">£32,166.26</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Adjustment</span>
              <span class="font-semibold">£32,589.89 - £30</span>
            </div>
            <div class="border-t border-green-200 pt-2 mt-2">
              <div class="flex justify-between">
                <span class="text-base font-bold text-green-800">Final AHP</span>
                <span class="text-xl font-bold text-green-600">£31,438.29</span>
              </div>
            </div>
          </div>
          <p class="text-xs text-gray-500 mt-3 text-center">
            Calculation based on 52-week lookback period with extended lookback requirement
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from '../components/Card.vue';
</script>

<style scoped>
/* Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.grid > div {
  animation: fadeInUp 0.6s ease-out;
}

.grid > div:nth-child(1) { animation-delay: 0.1s; }
.grid > div:nth-child(2) { animation-delay: 0.2s; }
.grid > div:nth-child(3) { animation-delay: 0.3s; }
.grid > div:nth-child(4) { animation-delay: 0.4s; }
</style>
