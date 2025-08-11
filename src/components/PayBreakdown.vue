<template>
  <h3 class="text-xl font-semibold mb-4">52 Week Holiday Breakdown</h3>
  <div class="bg-blue-100 shadow rounded-lg p-4 sm:p-6">
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
          <tr class="text-sm text-gray-600">
            <th class="py-2 text-left">Component</th>
            <th class="py-2 text-right">Total Amount</th>
            <th class="py-2 text-right">Weekly Average</th>
          </tr>
        </thead>
        <tbody class="text-sm">
          <tr>
            <td class="py-2">Basic Pay</td>
            <td class="text-right">£23,768.28</td>
            <td class="text-right">£457.08</td>
          </tr>
          <tr>
            <td class="py-2 text-left">Variable Pay</td>
            <td class="text-right">£8,862.36</td>
            <td class="text-right">£170.43</td>
          </tr>
          <tr class="bg-white font-semibold rounded ">
            <td class="py-2 p-2 text-left">Combined Total</td>
            <td class="text-right">£32,630.64</td>
            <td class="p-2 text-green-600 text-right">£627.51</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
