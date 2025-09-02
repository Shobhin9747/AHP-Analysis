<template>
  <div class="flex justify-between items-center">
    <h3 class="text-xl text-[#022652]  font-semibold mb-4">52 Week Holiday Breakdown</h3>
    <div class="flex items-center gap-2">
      <ArrowDownTrayIcon class="w-5 h-5 text-[#068EC6] cursor-pointer" />
      <h2 class="text-sm sm:text-base text-[#022652]">Download</h2>
    </div>
  </div>

  <div class="bg-[#EEF4F8] shadow rounded-lg p-4 sm:p-6">
    <!-- Mobile view -->
    <div class="block sm:hidden space-y-3">
      <div class="bg-white rounded-lg p-3">
        <div class="flex justify-between items-center mb-2">
          <span class="font-medium">Basic Pay</span>
          <span class="text-sm text-gray-600">£457.08/week</span>
        </div>
        <div class="text-right text-lg font-semibold">£23,768.28</div>
      </div>

      <div class="bg-white rounded-lg p-3">
        <div class="flex justify-between items-center mb-2">
          <span class="font-medium">Variable Pay</span>
          <span class="text-sm text-gray-600">£170.43/week</span>
        </div>
        <div class="text-right text-lg font-semibold">£8,862.36</div>
      </div>

      <div class="bg-white rounded-lg p-3 border-2 border-green-200">
        <div class="flex justify-between items-center mb-2">
          <span class="font-semibold">Combined Total</span>
          <span class="text-sm text-green-600 font-semibold">£627.51/week</span>
        </div>
        <div class="text-right text-lg font-bold text-green-600">£32,630.64</div>
      </div>
    </div>

    <!-- Desktop view -->
    <div class="hidden sm:block overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="text-xs text-[#5F7282] uppercase tracking-wide">
            <th class="py-3 text-left">Component</th>
            <th class="py-3 text-right">Total Amount</th>
            <th class="py-3 text-right">Weekly Average</th>
          </tr>
        </thead>
        <tbody class="text-sm">
          <tr class="border-t border-[#E6EEF5] ">
            <td class="py-3 text-left">
              <span class="inline-flex items-center gap-2 text-[#022652]">
                <ChevronDownIcon class="w-3.5 h-3.5 text-[#5F7282]" />
                Basic Pay
              </span>
            </td>
            <td class="text-right text-[#068EC6] font-medium">£23,768.28</td>
            <td class="text-right text-[#27AE60] font-semibold">£457.08</td>
          </tr>
          <tr class="border-t border-[#E6EEF5] ">
            <td class="py-3 text-left">
              <span class="inline-flex items-center gap-2 text-[#022652]">
                <ChevronDownIcon class="w-3.5 h-3.5 text-[#5F7282]" />
                Variable Pay
              </span>
            </td>
            <td class="text-right text-[#068EC6] font-medium">£8,862.36</td>
            <td class="text-right text-[#27AE60] font-semibold">£170.43</td>
          </tr>
          <tr class="border-t border-[#E6EEF5] bg-white font-semibold">
            <td class="py-3 text-left">Combined Total</td>
            <td class="text-right text-[#022652]">£32,630.64</td>
            <td class="py-2 text-right">
              <span class="inline-block bg-[#27AE60] text-white text-xs px-2.5 py-1 rounded">£627.51</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ArrowDownTrayIcon, ChevronDownIcon } from "@heroicons/vue/24/outline";
</script>
