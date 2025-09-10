<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <!-- Top Row - Key Metrics -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Total Employees Card -->
      <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <div class="p-3 bg-blue-50 rounded-lg">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
        </div>
        <div class="text-3xl font-bold text-blue-600 mb-1">4,895</div>
        <div class="text-sm text-gray-500">Total Employees as on Aug 2025</div>
      </div>

      <!-- Total Companies Card -->
      <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <div class="p-3 bg-blue-50 rounded-lg">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
          </div>
        </div>
        <div class="text-3xl font-bold text-blue-600 mb-1">125</div>
        <div class="text-sm text-gray-500">Total Companies as on Aug 2025</div>
      </div>

      <!-- Total Liability Card -->
      <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <div class="p-3 bg-green-50 rounded-lg">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
          </div>
        </div>
        <div class="text-3xl font-bold text-green-600 mb-1">£125,813</div>
        <div class="text-sm text-gray-500">Total Liability combined</div>
      </div>

      <!-- AHP per Employee Card -->
      <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <div class="p-3 bg-green-50 rounded-lg">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
          </div>
        </div>
        <div class="text-3xl font-bold text-green-600 mb-1">£113.6</div>
        <div class="text-sm text-gray-500">AHP per employee</div>
      </div>
    </div>

    <!-- Middle Row - Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Monthly AHP Trend Chart -->
      <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Monthly AHP Trend</h3>
        <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <div class="text-center">
            <div class="text-gray-500 mb-2">📊 Chart Placeholder</div>
            <div class="text-sm text-gray-400">Monthly AHP Trend Chart</div>
          </div>
        </div>
      </div>

      <!-- Salary Type Donut Chart -->
      <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Salary Type</h3>
        <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <div class="text-center">
            <div class="text-gray-500 mb-2">🍩 Chart Placeholder</div>
            <div class="text-sm text-gray-400">Salary Type Donut Chart</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Row - Liability by Jurisdiction -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- England & Wales -->
      <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h4 class="text-sm font-medium text-gray-800">Liability</h4>
            <p class="text-xs text-blue-600">England & Wales</p>
          </div>
          <div class="text-right">
            <div class="text-xs text-gray-500">54</div>
            <div class="text-xs text-gray-400">📅</div>
          </div>
        </div>
        <div class="mb-4">
          <div class="h-8 bg-orange-100 rounded flex items-center justify-center">
            <div class="text-xs text-orange-600">📈 Sparkline Chart</div>
          </div>
        </div>
        <div class="text-2xl font-bold text-gray-800 mb-1">£125,345</div>
        <div class="text-sm text-green-600">Variance +12%</div>
      </div>

      <!-- Scotland -->
      <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h4 class="text-sm font-medium text-gray-800">Liability</h4>
            <p class="text-xs text-blue-600">Scotland</p>
          </div>
          <div class="text-right">
            <div class="text-xs text-gray-500">54</div>
            <div class="text-xs text-gray-400">📅</div>
          </div>
        </div>
        <div class="mb-4">
          <div class="h-8 bg-orange-100 rounded flex items-center justify-center">
            <div class="text-xs text-orange-600">📈 Sparkline Chart</div>
          </div>
        </div>
        <div class="text-2xl font-bold text-gray-800 mb-1">£125,345</div>
        <div class="text-sm text-green-600">Variance +12%</div>
      </div>

      <!-- Northern Ireland -->
      <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h4 class="text-sm font-medium text-gray-800">Liability</h4>
            <p class="text-xs text-blue-600">Northern Ireland</p>
          </div>
          <div class="text-right">
            <div class="text-xs text-gray-500">54</div>
            <div class="text-xs text-gray-400">📅</div>
          </div>
        </div>
        <div class="mb-4">
          <div class="h-8 bg-orange-100 rounded flex items-center justify-center">
            <div class="text-xs text-orange-600">📈 Sparkline Chart</div>
          </div>
        </div>
        <div class="text-2xl font-bold text-gray-800 mb-1">£125,345</div>
        <div class="text-sm text-green-600">Variance +12%</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Admin Overview Dashboard
</script> 