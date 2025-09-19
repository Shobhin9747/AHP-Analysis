<template>
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 flex-wrap">
    <!-- Profile Info -->
    <div class="flex items-center gap-3 sm:gap-4">
      <img :src="Profile" class="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-cover rounded-full" />
      <div>
        <h2 class="text-[28px] sm:text-[28px] text-[#022652] font-bold">Vipin Nair</h2>
        <p class="text-[14px] sm:text-[14px] text-[#666666]">Emp ID - #12345</p>
        <h2 class="text-[#022652] text-[18px] sm:text-[18px] font-semibold">Senior Architect</h2>
        <p class="text-[16px] sm:text-[16px] text-gray-[#666666]">Larsen & Toubr</p>
      </div>
    </div>

    <!-- Employee Type -->
    <div class="flex flex-col sm:items-end">
      <p class="text-[14px] sm:text-sm text-[#666666]">Employee Type</p>
      <p class="text-[18px] sm:text-[18px] text-[#000000] font-semibold">Weekly Fixed</p>
    </div>

    <div class="flex flex-col sm:items-end">
      <p class="text-[14px]  sm:text-sm text-[#666666]">Work Pattern</p>
      <p class="text-[18px] sm:text-base text-[#000000] font-semibold">Mon-Fri</p>
    </div>

    <div class="flex flex-col sm:items-end">
      <p class="text-[14px] sm:text-sm text-[#666666]">Timing</p>
      <p class="text-[18px] sm:text-base text-[#000000] font-semibold">9:00-17:00</p>
    </div>

    <!-- Annual Salary -->
    <div class="flex flex-col sm:items-end">
      <p class="text-[14px] sm:text-sm text-gray-500">Annual Salary</p>
      <p class="text-[18px] sm:text-base text-[#000000] font-semibold">£32,630.64</p>
    </div>
  </div>
</template>
<script setup>
import Profile from '../assets/Profile.png'
 </script>
