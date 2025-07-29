<template>
  <div class="p-6 space-y-6">
    <!-- Salary Overview Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card title="ANNUAL SALARY" value="£385,000" subtitle="Base Contract" color="text-green-600" growth="+89.24%" />
      <Card title="WEEKLY BASE PAY" value="£31,250.00" subtitle="52 weeks" color="text-green-600" growth="+8.09%" />
      <Card title="FINAL AHP" value="£31,438.29" subtitle="Calculated" color="text-green-600" growth="+9.01%" />
      <Card title="ELIGIBLE WEEKS" value="53/57" subtitle="93% Eligibility rate" color="text-blue-600" growth="+7.55%" />
    </div>

    <!-- Contract & Lookback Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Contract Details -->
      <div class="lg:col-span-2 bg-white shadow rounded-xl p-6">
        <div class="space-y-2">
          <div class="flex justify-between">
            <span>Annual Salary</span>
            <span class="font-semibold">£385,000.00</span>
          </div>
          <div class="flex justify-between text-sm text-gray-500">
            <span>Weekly Salary Calculation</span>
            <span>£385,000.00 ÷ 52 = £31,250.00</span>
          </div>
          <div class="flex justify-between">
            <span>Overtime Rate</span>
            <span>£3.50/hour</span>
          </div>
          <div class="flex justify-between">
            <span>Minimum Daily Hours</span>
            <span>11 hours</span>
          </div>
        </div>

        <div class="space-y-6 mt-6">
          <div>
            <div class="flex justify-between">
              <span>Total Weeks in Data</span>
              <span>57 weeks</span>
            </div>
            <div class="flex justify-between">
              <span>Eligible Weeks</span>
              <span>53 weeks</span>
            </div>
            <div class="flex justify-between">
              <span>Ineligible Weeks</span>
              <span>4 weeks</span>
            </div>
            <div class="text-green-600 font-medium">All eligible due to pay present</div>
          </div>

         <div>
            <div class="bg-yellow-100 text-yellow-800 p-3 rounded text-sm">
              261 components found across 52 eligible weeks
            </div>
            <table class="w-full mt-4 text-sm">
              <thead>
                <tr class="text-left">
                  <th class="py-2">Week</th>
                  <th>Date</th>
                  <th>Hours</th>
                  <th>Amount</th>
                  <th>Calculation</th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-gray-50">
                  <td class="py-2">Week 5</td>
                  <td>2022-02-35</td>
                  <td>2.00</td>
                  <td>£7.00</td>
                  <td>2.0 x £3.50</td>
                </tr>
                <tr class="bg-white">
                  <td class="py-2">Week 15</td>
                  <td>2022-04-14</td>
                  <td>3.00</td>
                  <td>£105.00</td>
                  <td>3.0 x £35.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Lookback Window -->
      <div class="bg-white shadow rounded-xl p-6">
        <div class="bg-yellow-100 text-yellow-800 p-3 rounded text-sm mb-4">
          <strong>Lookback Logic</strong>
          <ul class="list-disc pl-5 mt-2 space-y-1">
            <li>Start from most recent week, move backward</li>
            <li>Stop when 52 eligible weeks found or after 104 weeks</li>
            <li>Use all available if fewer than 52 in 104 weeks</li>
          </ul>
        </div>
        <div class="space-y-2">
          <div class="flex justify-between">
            <span>Calendar Weeks Used</span>
            <span>56 weeks</span>
          </div>
          <div class="flex justify-between">
            <span>Extended Lookback</span>
            <span class="text-orange-600 font-semibold">YES (SPAN=56)</span>
          </div>
          <div class="flex justify-between">
            <span>Oldest Eligible Week</span>
            <span>Week 2</span>
          </div>
          <div class="flex justify-between">
            <span>Newest Eligible Week</span>
            <span>Week 57</span>
          </div>
        </div>

        <div class="space-y-2 text-sm mt-6">
          <div class="flex justify-between">
            <span>Base Weekly Salary</span>
            <span>£31,250.00</span>
          </div>
          <div class="flex justify-between">
            <span>Variable Pay (12 weeks)</span>
            <span>£30</span>
          </div>
          <div class="flex justify-between">
            <span>Average Variable Top-up</span>
            <span>£32,166.26</span>
          </div>
          <div class="flex justify-between">
            <span>Adjustment</span>
            <span>£32,589.89 - £30</span>
          </div>
          <div class="flex justify-between font-bold text-green-700">
            <span>Final AHP</span>
            <span>£31,438.29</span>
          </div>
        </div>
        <p class="text-xs text-gray-500 mt-2">
          Calculation based on 52-week lookback period with extended lookback requirement
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from '../components/Card.vue';
</script>

<style scoped>
/* Add any component-specific styles if needed */
</style>
